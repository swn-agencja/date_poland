(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var PROFILES = cfg.profiles || [];
  var view = document.getElementById("view");
  var modal = document.getElementById("modal");

  // ---------- adresy ----------
  // Na *.github.io strona projektu siedzi pod /<repo>/, na własnej domenie pod /.
  var segs = location.pathname.split("/").filter(Boolean);
  var onGithubIo = /\.github\.io$/.test(location.hostname);
  var BASE = onGithubIo && segs.length ? "/" + segs[0] + "/" : "/";

  function slugFromPath() {
    if (window.__SLUG__) {
      var s = window.__SLUG__;
      window.__SLUG__ = null;
      return s;
    }
    var rest = location.pathname.slice(BASE.length).split("/").filter(Boolean);
    var last = rest[rest.length - 1] || "";
    if (/\.html?$/i.test(last)) return "";
    try { return decodeURIComponent(last); } catch (e) { return last; }
  }

  function url(path) {
    return BASE + path;
  }

  // ---------- pomocnicze ----------
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function distance(slug) {
    return "około " + (2 + (hash(slug) % 17)) + " km od Ciebie";
  }

  function capitalize(s) {
    s = s.replace(/[-_+]+/g, " ").trim().toLocaleLowerCase("pl");
    return s.replace(/(^|\s)(\S)/g, function (m, sp, ch) { return sp + ch.toLocaleUpperCase("pl"); });
  }

  function findProfile(raw) {
    var slug = String(raw).toLocaleLowerCase("pl").slice(0, 30);
    for (var i = 0; i < PROFILES.length; i++) if (PROFILES[i].slug === slug) return PROFILES[i];

    // imię spoza listy – składamy profil, zawsze ten sam dla danego imienia
    var fb = cfg.fallback || {};
    var h = hash(slug);
    var pick = function (list, salt) { return list && list.length ? list[(h + salt) % list.length] : ""; };
    var min = fb.ageMin || 23, max = fb.ageMax || 34;
    return {
      slug: slug,
      name: capitalize(slug),
      age: min + (h % (max - min + 1)),
      photo: PROFILES.length ? PROFILES[h % PROFILES.length].photo : "",
      bio: pick(fb.bios, 0),
      about: pick(fb.abouts, 1),
      interests: pick(fb.interests, 2) || [],
      isNew: true,
    };
  }

  // ---------- elementy ----------
  function onlinePill() {
    return '<span class="pill-online"><span class="live-dot"></span>Online</span>';
  }

  function card(p) {
    return (
      '<a class="card" href="' + url(p.slug) + '" data-route="' + esc(p.slug) + '">' +
        '<div class="card-photo">' +
          '<img src="' + url(p.photo) + '" alt="' + esc(p.name) + ", " + p.age + '" loading="lazy" />' +
          '<div class="shade"></div>' +
          onlinePill() +
          (p.isNew ? '<span class="pill-new">Nowa</span>' : "") +
          '<div class="card-info"><h3>' + esc(p.name) + ", " + p.age + '</h3><div class="distance">' + distance(p.slug) + "</div></div>" +
        "</div>" +
        '<div class="card-body"><p class="card-bio">' + esc(p.bio) + '</p><span class="card-btn">Zobacz profil</span></div>' +
      "</a>"
    );
  }

  function sectionHead(eyebrow, title, desc) {
    return (
      '<div class="section-head"><div class="eyebrow">' + eyebrow + '</div><h2 class="section-title">' + title + "</h2>" +
      (desc ? '<p class="section-desc">' + desc + "</p>" : "") + "</div>"
    );
  }

  // ---------- strona główna ----------
  function home() {
    document.title = "Randki w Twojej okolicy | " + cfg.brand.join("");

    var near = PROFILES.slice().sort(function (a, b) { return (hash(a.slug) % 17) - (hash(b.slug) % 17); }).slice(0, 4);
    var fresh = PROFILES.filter(function (p) { return p.isNew; });
    var stack = PROFILES.slice(0, 3);

    view.innerHTML =
      '<section class="hero">' +
        '<div class="hero-bg" aria-hidden="true"></div>' +
        '<div class="wrap hero-inner">' +
          '<div class="hero-content">' +
            '<div class="badge"><span class="live-dot"></span>Aktywne profile w Twojej okolicy</div>' +
            "<h1>Poznaj kogoś,<br />z kim <em>chcesz się spotkać.</em></h1>" +
            '<p class="hero-text">Przeglądaj profile kobiet z Twojej okolicy, sprawdź, kto jest teraz online, i zacznij rozmowę, gdy ktoś wpadnie Ci w oko.</p>' +
            '<div class="hero-actions">' +
              '<button class="btn btn-primary" type="button" data-join>Zobacz profile</button>' +
              '<a class="btn btn-ghost" href="#poznaj" data-section="poznaj">Przeglądaj osoby</a>' +
            "</div>" +
            '<div class="hero-note">18+ · szybka rejestracja · pełna dyskrecja</div>' +
          "</div>" +
          '<div class="hero-stack" aria-hidden="true">' +
            stack.map(function (p, i) {
              return '<div class="stack-card s' + i + '"><img src="' + url(p.photo) + '" alt="" />' + onlinePill() +
                '<div class="stack-name">' + esc(p.name) + ", " + p.age + "</div></div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>" +

      '<main class="wrap">' +
        '<section id="poznaj">' + sectionHead("Poznaj osoby", "Może właśnie ona?", "Profile aktywne w Twojej okolicy.") +
          '<div class="grid">' + PROFILES.slice(0, 8).map(card).join("") + "</div></section>" +

        '<section id="online">' + sectionHead("Teraz online", "Kto jest aktywny?") +
          '<div class="rail">' + PROFILES.map(function (p) {
            return '<a class="rail-card" href="' + url(p.slug) + '" data-route="' + esc(p.slug) + '">' +
              '<div class="rail-photo"><img src="' + url(p.photo) + '" alt="" loading="lazy" /><div class="shade"></div>' + onlinePill() + "</div>" +
              "<p>" + esc(p.name) + ", " + p.age + "</p><small>" + distance(p.slug) + "</small></a>";
          }).join("") + "</div></section>" +

        '<div class="band">' +
          '<div class="eyebrow">Nowe znajomości</div>' +
          "<h2>Nie wiesz, od czego zacząć?</h2>" +
          "<p>Załóż darmowe konto w minutę i zobacz, kto z Twojej okolicy jest teraz aktywny.</p>" +
          '<button class="btn btn-white" type="button" data-join>Przejdź do rejestracji</button>' +
        "</div>" +

        '<section id="okolica">' + sectionHead("W Twojej okolicy", "Blisko Ciebie", "Odległość jest orientacyjna – pomaga szybciej znaleźć kogoś z okolicy.") +
          '<div class="grid">' + near.map(card).join("") + "</div></section>" +

        "<section>" + sectionHead("Jak to działa?", "Trzy kroki do randki") +
          '<div class="steps">' +
            '<article class="step"><div class="step-no">01 / ZNAJDŹ</div><h3>Przeglądaj profile</h3><p>Zdjęcia i krótkie opisy kobiet aktywnych w Twojej okolicy.</p></article>' +
            '<article class="step"><div class="step-no">02 / POZNAJ</div><h3>Sprawdź, kim jest</h3><p>Zainteresowania, opis i informacja, czy jest teraz online.</p></article>' +
            '<article class="step"><div class="step-no">03 / NAPISZ</div><h3>Zacznij rozmowę</h3><p>Jeśli zaiskrzy – napisz pierwszy i umówcie się na żywo.</p></article>' +
          "</div></section>" +

        '<section id="nowe">' + sectionHead("Dopiero dołączyły", "Nowe profile") +
          '<div class="grid">' + fresh.map(card).join("") + "</div></section>" +

        "<section>" + sectionHead("Aktywność", "Kto jest teraz online?") +
          '<div class="activity">' + PROFILES.slice(0, 6).map(function (p) {
            return '<a class="activity-row" href="' + url(p.slug) + '" data-route="' + esc(p.slug) + '">' +
              '<img src="' + url(p.photo) + '" alt="" loading="lazy" />' +
              '<div class="activity-info"><div class="activity-name">' + esc(p.name) + ", " + p.age + ' <span class="live-dot"></span></div>' +
              '<div class="activity-bio">' + esc(p.bio) + "</div></div>" +
              '<span class="activity-btn">Profil</span></a>';
          }).join("") + "</div></section>" +

        footer() +
      "</main>";
  }

  function footer() {
    return '<footer class="footer"><strong>' + esc(cfg.brand.join("")) + "</strong><br />" +
      "Serwis przeznaczony wyłącznie dla osób pełnoletnich. Odległości mają charakter orientacyjny.</footer>";
  }

  // ---------- strona profilu ----------
  function profilePage(p) {
    document.title = p.name + ", " + p.age + " | " + cfg.brand.join("");
    var others = PROFILES.filter(function (x) { return x.slug !== p.slug; });
    var start = hash(p.slug) % Math.max(1, others.length);
    others = others.slice(start).concat(others.slice(0, start)).slice(0, 4);

    // miniatury "kolejnych zdjęć": najpierw dodatkowe zdjęcia z config.js,
    // brakujące uzupełnia rozmyte zdjęcie główne
    var extra = (p.photos || []).slice(0, 3);
    var thumbs = extra.concat([p.photo, p.photo, p.photo]).slice(0, 3);
    var total = 1 + Math.max(extra.length, 4 + (hash(p.slug) % 7));

    view.innerHTML =
      '<main class="wrap profile-page">' +
        '<a class="back" href="./" data-home>← Wszystkie profile</a>' +
        '<div class="profile-main">' +
          '<div class="gallery">' +
            '<div class="main-photo">' +
              '<img src="' + url(p.photo) + '" alt="' + esc(p.name) + ", " + p.age + '" />' +
              onlinePill() +
              '<span class="photo-count">1 / ' + total + "</span>" +
            "</div>" +
            '<div class="thumbs">' + thumbs.map(function (src, i) {
              return '<button class="thumb" type="button" data-join="Zobacz wszystkie zdjęcia" aria-label="Zobacz więcej zdjęć">' +
                '<img src="' + url(src) + '" alt="" loading="lazy" />' +
                (i === thumbs.length - 1 ? '<span class="thumb-more">+' + (total - thumbs.length) + "</span>" : '<span class="thumb-lock">🔒</span>') +
                "</button>";
            }).join("") + "</div>" +
            '<button class="btn btn-primary btn-block" type="button" data-join="Zobacz wszystkie zdjęcia">Zobacz więcej zdjęć</button>' +
          "</div>" +
          '<div class="profile-details">' +
            '<div class="status"><span class="live-dot"></span>Online · aktywna teraz</div>' +
            "<h1>" + esc(p.name) + ", " + p.age + "</h1>" +
            '<div class="distance">' + distance(p.slug) + "</div>" +
            '<p class="lead">' + esc(p.bio) + "</p>" +
            '<p class="about">' + esc(p.about) + "</p>" +
            '<div class="tags">' + (p.interests || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
            '<div class="action-row">' +
              '<button class="btn btn-primary" type="button" data-join>Wyślij wiadomość</button>' +
              '<button class="btn btn-ghost" type="button" data-join>Poznaj mnie</button>' +
            "</div>" +
            '<div class="band band-sm">' +
              "<h2>" + esc(p.name) + " jest teraz online</h2>" +
              "<p>Napisz, zanim zrobi to ktoś inny. Rejestracja zajmuje chwilę.</p>" +
              '<button class="btn btn-white" type="button" data-join>Przejdź dalej</button>' +
            "</div>" +
          "</div>" +
        "</div>" +
        "<section>" + sectionHead("Mogą Cię zainteresować", "Inne aktywne profile") +
          '<div class="grid">' + others.map(card).join("") + "</div></section>" +
        footer() +
      "</main>";
  }

  // ---------- router ----------
  var currentSlug = null;

  function render(slug) {
    currentSlug = slug || "";
    document.body.classList.toggle("is-profile", !!slug);
    if (slug) profilePage(findProfile(slug));
    else home();
  }

  function go(slug, sectionId) {
    var target = slug ? url(slug) : BASE;
    if (location.pathname !== target) history.pushState(null, "", target);
    if (currentSlug !== (slug || "")) render(slug);
    if (sectionId) scrollToSection(sectionId);
    else window.scrollTo(0, 0);
  }

  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.addEventListener("popstate", function () { render(slugFromPath()); });

  // ---------- okienko ----------
  function openModal(title) {
    document.getElementById("modal-title").textContent = title || "Poznaj kogoś nowego";
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  document.getElementById("age-young").href = cfg.linkYounger;
  document.getElementById("age-old").href = cfg.linkOlder;

  // ---------- kliknięcia ----------
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var t = e.target;

    if (t.closest("[data-close]")) return closeModal();

    var join = t.closest("[data-join]");
    if (join) {
      e.preventDefault();
      var title = join.getAttribute("data-join");
      if (!title && currentSlug) title = findProfile(currentSlug).name + " czeka na wiadomość";
      return openModal(title);
    }

    var route = t.closest("[data-route]");
    if (route) { e.preventDefault(); return go(route.getAttribute("data-route")); }

    var section = t.closest("[data-section]");
    if (section) { e.preventDefault(); return go("", section.getAttribute("data-section")); }

    if (t.closest("[data-home]")) { e.preventDefault(); return go(""); }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // ---------- start ----------
  document.getElementById("logo-name").innerHTML = esc(cfg.brand[0]) + "<span>" + esc(cfg.brand[1] || "") + "</span>";
  document.getElementById("logo-sub").textContent = cfg.brandSub || "";
  render(slugFromPath());
  if (location.hash.length > 1) scrollToSection(location.hash.slice(1));
})();
