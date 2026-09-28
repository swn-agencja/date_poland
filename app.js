(function () {
  "use strict";

  var cfg = window.CHAT_CONFIG || {};
  var $ = function (id) { return document.getElementById(id); };
  var messagesEl = $("messages");
  var form = $("composer");
  var input = $("input");
  var sendBtn = $("send");
  var sent = false;

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
  var key = rawName.toLocaleLowerCase("pl");
  var profile = (cfg.profiles && cfg.profiles[key]) || {};
  var name = profile.displayName || (rawName ? capitalize(rawName) : cfg.defaultName || "Ola");

  // ---------- nagłówek ----------
  document.title = name + " – czat";
  $("name").textContent = name + (profile.age ? ", " + profile.age : "");
  if (profile.city) $("status-text").textContent = "online · " + profile.city;

  var avatar = $("avatar");
  if (profile.photo) {
    avatar.style.backgroundImage = "url('" + profile.photo + "')";
    avatar.classList.add("photo");
  } else {
    var hue = 0;
    for (var i = 0; i < name.length; i++) hue = (hue * 31 + name.charCodeAt(i)) % 360;
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
    meta.textContent = timeNow() + (who === "me" ? " ✓✓" : "");
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

  // ---------- wysyłanie ----------
  input.addEventListener("input", function () {
    sendBtn.disabled = !input.value.trim();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    addMessage(text, "me");
    input.value = "";
    sendBtn.disabled = true;

    if (!sent && cfg.redirectUrl) {
      sent = true;
      input.disabled = true;
      setTimeout(function () { location.href = cfg.redirectUrl; }, cfg.redirectDelayMs || 0);
    }
    sent = true;
  });
})();
