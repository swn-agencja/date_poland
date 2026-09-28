(function () {
  "use strict";

  var cfg = window.CHAT_CONFIG || {};
  var $ = function (id) { return document.getElementById(id); };
  var messagesEl = $("messages");
  var form = $("composer");
  var input = $("input");
  var sendBtn = $("send");
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

  // ---------- nagłówek ----------
  document.title = name + " – czat";
  $("name").textContent = name + (profile.age ? ", " + profile.age : "");
  if (profile.city) $("status-text").textContent = "online · " + profile.city;

  var hash = 0;
  for (var i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % 100003;
  var photo = profile.photo || (cfg.photos && cfg.photos.length ? cfg.photos[hash % cfg.photos.length] : null);

  var avatar = $("avatar");
  if (photo) {
    avatar.style.backgroundImage = "url('" + photo + "')";
    avatar.classList.add("photo");
  } else {
    var hue = hash % 360;
    avatar.style.background = "linear-gradient(135deg, hsl(" + hue + ",75%,62%), hsl(" + ((hue + 40) % 360) + ",80%,52%))";
    $("avatar-initial").textContent = name.charAt(0);
  }

  // ---------- wiadomości ----------
  function timeNow() {
    var d = new Date();
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }

  function scrollDown() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addMessage(text, who) {
    var row = document.createElement("div");
    row.className = "msg " + who;
    var bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    var meta = document.createElement("span");
    meta.className = "time";
    meta.textContent = timeNow();
    if (who === "me") {
      var ticks = document.createElement("span");
      ticks.className = "ticks";
      ticks.textContent = " ✓";
      meta.appendChild(ticks);
    }
    bubble.appendChild(meta);
    row.appendChild(bubble);
    messagesEl.appendChild(row);
    scrollDown();
    return row;
  }

  function showTyping() {
    var row = document.createElement("div");
    row.className = "msg them typing";
    row.innerHTML = '<div class="bubble"><i></i><i></i><i></i></div>';
    messagesEl.appendChild(row);
    $("status-text").textContent = "pisze...";
    scrollDown();
    return function hide() {
      row.remove();
      $("status-text").textContent = profile.city ? "online · " + profile.city : "online";
    };
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  var pool = (profile.firstMessages && profile.firstMessages.length ? profile.firstMessages : cfg.firstMessages) || ["Hej, co tam?"];
  var first = pick(pool).replace(/\{imie\}/g, name);

  setTimeout(function () {
    var hide = showTyping();
    setTimeout(function () {
      hide();
      addMessage(first, "them");
    }, cfg.typingDelayMs || 1800);
  }, 400);

  // ---------- odczytanie ----------
  var seenEl = document.createElement("div");
  seenEl.className = "seen";
  seenEl.textContent = "Odczytane";

  function markRead(row) {
    var ticks = row.querySelector(".ticks");
    ticks.textContent = " ✓✓";
    ticks.classList.add("read");
    // "Odczytane" tylko pod ostatnią odczytaną wiadomością
    var next = row.nextElementSibling;
    if (!next || !next.classList.contains("me")) {
      row.after(seenEl);
      scrollDown();
    }
  }

  // ---------- odpowiedź ----------
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
    input.disabled = true;
    sendBtn.disabled = true;
    var min = cfg.ageMin || 20, max = cfg.ageMax || 25;
    var age = profile.age || min + Math.floor(Math.random() * (max - min + 1));
    var text = (cfg.replyMessage || "O fajnie, ja {wiek}").replace(/\{wiek\}/g, ageText(age));
    var hide = showTyping();
    setTimeout(function () {
      hide();
      addMessage(text, "them");
      if (cfg.redirectUrl) {
        setTimeout(function () { location.href = cfg.redirectUrl; }, cfg.redirectDelayMs || 0);
      }
    }, cfg.replyTypingMs || 1500);
  }

  // ---------- wysyłanie ----------
  input.addEventListener("input", function () {
    sendBtn.disabled = !input.value.trim();
    // użytkownik jeszcze pisze – czekamy dalej
    if (quietTimer && input.value.trim()) scheduleReply();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text || replied) return;
    var row = addMessage(text, "me");
    input.value = "";
    sendBtn.disabled = true;
    input.focus();
    setTimeout(function () { markRead(row); }, cfg.readAfterMs || 3000);
    scheduleReply();
  });
})();
