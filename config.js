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

  // Opcjonalne ustawienia dla konkretnych imion (klucz małymi literami).
  // Wszystkie pola są opcjonalne. Imiona spoza listy też działają.
  profiles: {
    // karolina: {
    //   displayName: "Karolina",
    //   age: 26,
    //   city: "Kraków",
    //   photo: "img/karolina.jpg",
    //   firstMessages: ["Hej, tu Karolina z Krakowa 😊"],
    // },
  },
};
