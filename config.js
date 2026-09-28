// ============================================================
//  KONFIGURACJA – tu zmieniasz wszystko bez grzebania w kodzie
// ============================================================
window.CHAT_CONFIG = {
  // Gdzie przekierować użytkownika po wysłaniu pierwszej wiadomości.
  // Ustaw na null, żeby po wysłaniu nic się nie działo.
  redirectUrl: "https://pl.wikipedia.org/",

  // Ile ms czekać po wysłaniu wiadomości zanim nastąpi przekierowanie.
  redirectDelayMs: 1500,

  // Imię używane, gdy ktoś wejdzie na stronę główną (bez /imie).
  defaultName: "Ola",

  // Ile ms "pisze..." zanim pojawi się pierwsza wiadomość.
  typingDelayMs: 1800,

  // Pierwsze wiadomości – losowana jest jedna z listy.
  // {imie} zostanie zamienione na imię z adresu (np. /karolina -> Karolina).
  firstMessages: [
    "Hej, co tam? 😊",
    "Cześć, jestem {imie} 👋",
    "Cześć, co słychać?",
    "Hejka! Nudzę się trochę, pogadamy? 🙈",
    "Hej :) widzę, że jesteś online",
    "Siemka, jak minął dzień?",
  ],

  // Ustawienia dla konkretnych imion (klucz małymi literami).
  // Pola: displayName, age, city, photo, firstMessages – wszystkie opcjonalne.
  profiles: {
    ola:      { photo: "img/ola.jpg" },
    karolina: { photo: "img/karolina.jpg" },
    magda:    { photo: "img/magda.jpg" },
    ania:     { photo: "img/ania.jpg" },
    kasia:    { photo: "img/kasia.jpg" },
    natalia:  { photo: "img/natalia.jpg" },
    julia:    { photo: "img/julia.jpg" },
    zuzia:    { photo: "img/zuzia.jpg" },
    wiktoria: { photo: "img/wiktoria.jpg" },
  },

  // Imiona spoza listy powyżej dostają jedno z tych zdjęć
  // (zawsze to samo dla danego imienia, np. /ewa zawsze ma to samo zdjęcie).
  photos: [
    "img/ola.jpg", "img/karolina.jpg", "img/magda.jpg",
    "img/ania.jpg", "img/kasia.jpg", "img/natalia.jpg",
    "img/julia.jpg", "img/zuzia.jpg", "img/wiktoria.jpg",
  ],
};
