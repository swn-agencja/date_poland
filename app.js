(function () {
  "use strict";

  var cfg = window.CHAT_CONFIG || {};
  var $ = function (id) { return document.getElementById(id); };
  var messagesEl = $("messages");
  var form = $("composer");
  var input = $("input");
  var sendBtn = $("send");
  var statusEl = $("status");

  var userMessages = [];
  var replied = false;
  var quietTimer = null;

  // ---------- imię z adresu ----------
  function readName() {
    if (window.__CHAT_NAME__) return window.__CHAT_NAME__;
    // Na GitHub Pages ścieżki z imieniem przychodzą przez 404.html (__CHAT_NAME__),
    // więc bezpośrednio serwowany index to strona główna.
    if (/\.github\.io$/.test(location.hostname)) return "";
    var segs = location.pathname.split("/").filter(Boolean);
    var last = segs[segs.length - 1] || "";
    if (/\.html?$/i.test(last)) return "";
    try { return decodeURIComponent(last); } catch (e) { return last; }
  }

  function capitalize(s) {
    s = s.replace(/[-_+]+/g, " ").trim().toLocaleLowerCase("pl");
    return s.replace(/(^|\s)(\S)/g, function (m, sp, ch) { return sp + ch.toLocaleUpperCase("pl"); });
  }

  var rawName = readName().slice(0, 30);
  var key = (rawName || cfg.defaultName || "Ola").toLocaleLowerCase("pl");
  var profile = (cfg.profiles && cfg.profiles[key]) || {};
  var name = profile.displayName || (rawName ? capitalize(rawName) : cfg.defaultName || "Ola");

  var hash = 0;
  for (var i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % 100003;
  var photo = profile.photo || (cfg.photos && cfg.photos.length ? cfg.photos[hash % cfg.photos.length] : null);

  function paintAvatar(el) {
    if (photo) {
      el.style.backgroundImage = "url('" + photo + "')";
    } else {
      var hue = hash % 360;
      el.style.background = "linear-gradient(135deg, hsl(" + hue + ",75%,62%), hsl(" + ((hue + 40) % 360) + ",80%,52%))";
      el.textContent = name.charAt(0);
    }
    return el;
  }

  function miniAvatar(cls) {
    var el = document.createElement("div");
    el.className = "avatar " + (cls || "xs");
    return paintAvatar(el);
  }

  // ---------- nagłówek i wizytówka ----------
  var onlineText = profile.city ? "Aktywna teraz · " + profile.city : "Aktywna teraz";
  document.title = name;
  $("name").textContent = name;
  statusEl.textContent = onlineText;
  $("intro-name").textContent = name + (profile.age ? ", " + profile.age : "");
  paintAvatar($("avatar"));
  paintAvatar($("intro-avatar"));

  function timeNow() {
    var d = new Date();
    return d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  $("time-sep").textContent = "Dzisiaj " + timeNow();

  // ---------- wiadomości ----------
  function scrollDown() {
    messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: "smooth" });
  }

  function append(row) {
    // w grupie wiadomości od niej awatar jest tylko przy ostatniej
    var prev = messagesEl.lastElementChild;
    if (prev && prev.classList.contains("them") && row.classList.contains("them")) prev.classList.remove("last");
    messagesEl.appendChild(row);
    scrollDown();
    return row;
  }

  function addMessage(text, who) {
    var row = document.createElement("div");
    row.className = "msg " + who + (who === "them" ? " last" : "");
    if (who === "them") row.appendChild(miniAvatar());

    var bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    var meta = document.createElement("span");
    meta.className = "meta";
    meta.textContent = timeNow();
    if (who === "me") {
      var ticks = document.createElement("span");
      ticks.className = "ticks";
      ticks.textContent = "✓";
      meta.appendChild(ticks);
    }
    bubble.appendChild(meta);
    row.appendChild(bubble);

    if (who === "them" && document.hidden) document.title = "(1) " + name;
    return append(row);
  }

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) document.title = name;
  });

  function showTyping() {
    var row = document.createElement("div");
    row.className = "msg them last typing";
    row.appendChild(miniAvatar());
    var bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = "<i></i><i></i><i></i>";
    row.appendChild(bubble);
    append(row);
    statusEl.textContent = "pisze...";
    statusEl.classList.add("typing");
    return function hide() {
      row.remove();
      statusEl.textContent = onlineText;
      statusEl.classList.remove("typing");
    };
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function say(text, typingMs, done) {
    var hide = showTyping();
    setTimeout(function () {
      hide();
      addMessage(text, "them");
      if (done) done();
    }, typingMs);
  }

  // ---------- pierwsza wiadomość ----------
  var pool = (profile.firstMessages && profile.firstMessages.length ? profile.firstMessages : cfg.firstMessages) || ["Hej, co tam?"];
  var first = pick(pool).replace(/\{imie\}/g, name);
  setTimeout(function () { say(first, cfg.typingDelayMs || 1800); }, 600);

  // ---------- odczytanie ----------
  var seenEl = document.createElement("div");
  seenEl.className = "seen";
  seenEl.appendChild(miniAvatar());
  seenEl.appendChild(document.createTextNode("Odczytane"));

  function markRead(row) {
    var ticks = row.querySelector(".ticks");
    ticks.textContent = "✓✓";
    ticks.classList.add("read");
    // "Odczytane" tylko pod ostatnią odczytaną wiadomością
    var next = row.nextElementSibling;
    if (!next || !next.classList.contains("me")) {
      row.after(seenEl);
      scrollDown();
    }
  }

  // ---------- odpowiedź i przycisk ----------
  function ageText(n) {
    var d = n % 10, dd = n % 100;
    return n + (d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? " lata" : " lat");
  }

  function scheduleReply() {
    if (replied) return;
    clearTimeout(quietTimer);
    quietTimer = setTimeout(reply, cfg.quietMs || 8000);
  }

  function reply() {
    replied = true;
    var min = cfg.ageMin || 20, max = cfg.ageMax || 25;
    var age = profile.age || min + Math.floor(Math.random() * (max - min + 1));
    var text = (cfg.replyMessage || "O fajnie, ja {wiek}").replace(/\{wiek\}/g, ageText(age));
    say(text, cfg.replyTypingMs || 1500, function () {
      setTimeout(showCta, cfg.ctaDelayMs || 0);
    });
  }

  function targetLink() {
    var userAge = window.detectAge ? window.detectAge(userMessages) : null;
    var older = userAge !== null && userAge >= (cfg.ageThreshold || 45);
    return older ? cfg.linkOlder : cfg.linkYounger;
  }

  function showCta() {
    var btn = $("cta-btn");
    btn.href = targetLink();
    btn.textContent = cfg.ctaText || "Kontynuuj rozmowę";
    $("cta-info").textContent = (cfg.ctaInfo || "").replace(/\{imie\}/g, name);
    input.blur();
    form.hidden = true;
    $("cta").hidden = false;
    scrollDown();
  }

  // ---------- wysyłanie ----------
  input.addEventListener("input", function () {
    sendBtn.disabled = !input.value.trim();
    // użytkownik jeszcze pisze – czekamy dalej
    if (quietTimer && !replied && input.value.trim()) scheduleReply();
  });

  $("emoji").addEventListener("click", function () {
    input.value += "🙂";
    input.dispatchEvent(new Event("input"));
    input.focus();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    userMessages.push(text);
    var row = addMessage(text, "me");
    input.value = "";
    sendBtn.disabled = true;
    input.focus();
    setTimeout(function () { markRead(row); }, cfg.readAfterMs || 3000);
    scheduleReply();
  });
})();
