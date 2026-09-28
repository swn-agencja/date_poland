// Wyłapywanie wieku z wiadomości użytkownika.
// detectAge(["Hej", "mariusz", "27 lat"]) -> 27, a gdy nic nie pasuje -> null.
// Każde trafienie dostaje punkty za pewność; wygrywa najwyżej ocenione,
// przy remisie to z późniejszej wiadomości.
(function (root) {
  "use strict";

  var MIN = 16, MAX = 99;

  var TEENS = { szesnascie: 16, siedemnascie: 17, osiemnascie: 18, dziewietnascie: 19 };
  var TENS = {
    dwadziescia: 20, trzydziesci: 30, czterdziesci: 40, piecdziesiat: 50,
    szescdziesiat: 60, siedemdziesiat: 70, osiemdziesiat: 80, dziewiecdziesiat: 90,
  };
  // "czterdziestka", "po piecdziesiatce", "trzydziestoletni"
  var TEN_STEMS = [
    ["dwudziest", 20], ["trzydziest", 30], ["czterdziest", 40], ["piecdziesi", 50],
    ["szescdziesi", 60], ["siedemdziesi", 70], ["osiemdziesi", 80],
  ];
  var UNITS = {
    jeden: 1, dwa: 2, trzy: 3, cztery: 4, piec: 5,
    szesc: 6, siedem: 7, osiem: 8, dziewiec: 9,
  };

  function normalize(s) {
    return String(s).toLowerCase()
      .replace(/ł/g, "l")
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function candidates(raw, now) {
    var t = normalize(raw);
    var out = [];
    var m, re;
    function add(age, score) {
      if (age >= MIN && age <= MAX) out.push({ age: age, score: score });
    }

    // Rok urodzenia: "1978", "rocznik 1978", "ur. 1978"
    re = /(^|\D)(19[2-9]\d|200\d|201[0-2])(?!\d)/g;
    while ((m = re.exec(t))) {
      var before = t.slice(Math.max(0, m.index - 12), m.index + m[1].length);
      add(now - +m[2], /(rocznik|urodz\w*|(^|\s)ur\.?|(^|\s)z)\s*$/.test(before) ? 6 : 3);
    }

    // Rocznik dwucyfrowo: "rocznik 78", "ur. 78", "r. 78", "jestem z 78"
    re = /(rocznik|urodzon\w*|(?:^|\s)(?:ur\.?|r\.|z))\s*'?(\d{2})(?![\d:.,]|\s*(?:min|h\b|godz|os))/g;
    while ((m = re.exec(t))) {
      var yy = +m[2];
      add(now - (yy > now % 100 ? 1900 + yy : 2000 + yy), 6);
    }

    // Liczby 2-cyfrowe. Pomijamy godziny (18:30), kwoty, wymiary, telefony itd.
    re = /(^|[^\d:.,\/])(\d{2})(?![\d]|[:.,\/]\d)/g;
    while ((m = re.exec(t))) {
      var n = +m[2];
      var start = m.index + m[1].length;
      var pre = t.slice(Math.max(0, start - 14), start);
      var post = t.slice(start + 2, start + 14);

      if (/^\s*-?\s*(cm|kg|zl|pln|km|m\b|min|h\b|godz|sek|%|dzieci|dziec|razy|x\b|stopni|st\b|euro|eur|dolar|\$|k\b|tys)/.test(post)) continue;
      if (/(^|\s)(nr|numer|tel|ul\.?|godz\.?|o|na|za|od|do|w)\s*$/.test(pre)) {
        // "o 18", "za 20 min", "do 30" – raczej nie wiek
        add(n, 0.5);
        continue;
      }

      if (/^\s*-?\s*(lat|let|l\b|latek|lecie|latk|wiosen|yo\b|y\.o|lvl|r\.z)/.test(post)) add(n, 5);
      else if (/^\s*(\+|-?\s*(stk|tk|tce|tka|ki|ke|ce)\b)/.test(post)) add(n, 4);
      else if (/(^|\s)(mam|wiek|wieku|lat|lata|lat:|juz|dopiero|skonczylem|skonczylam|skoncze|skonczyl|po|prawie|niedlugo|jestem)\s*$/.test(pre)) add(n, 4);
      else if (/^\s*\d{2}\s*$/.test(t)) add(n, 3);          // wiadomość to sama liczba: "27"
      else add(n, 1);
    }

    // Słownie: "czterdziesci piec", "trzydziesci", "osiemnascie"
    var words = t.split(/[^a-z]+/);
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (TENS[w]) {
        var u = UNITS[words[i + 1]] || 0;
        add(TENS[w] + u, 3);
      } else if (TEENS[w]) {
        add(TEENS[w], 3);
      } else {
        for (var j = 0; j < TEN_STEMS.length; j++) {
          if (w.indexOf(TEN_STEMS[j][0]) === 0) { add(TEN_STEMS[j][1], 3); break; }
        }
      }
    }

    return out;
  }

  function detectAge(messages, now) {
    now = now || new Date().getFullYear();
    var best = null;
    [].concat(messages).forEach(function (msg) {
      candidates(msg, now).forEach(function (c) {
        if (!best || c.score >= best.score) best = c;
      });
    });
    return best && best.score >= 1 ? best.age : null;
  }

  if (typeof module !== "undefined" && module.exports) module.exports = detectAge;
  else root.detectAge = detectAge;
})(this);
