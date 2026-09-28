// ============================================================
//  KONFIGURACJA – tu zmieniasz wszystko bez grzebania w kodzie
// ============================================================
window.CHAT_CONFIG = {
  // Imię używane, gdy ktoś wejdzie na stronę główną (bez /imie).
  defaultName: "Ola",

  // Ile ms "pisze..." zanim pojawi się pierwsza wiadomość.
  typingDelayMs: 1800,

  // Pierwsze wiadomości – losowana jest jedna z listy.
  // {imie} zostanie zamienione na imię z adresu (np. /karolina -> Karolina).
  firstMessages: [
    "Hejka, jestem {imie}, a ty? Ile masz lat 🙂?",
    "Hej! Tu {imie} 😊 a ty jak masz na imię? Ile masz lat?",
    "Cześć, jestem {imie} 🙂 a ty? Ile masz lat?",
    "Hejka 😊 {imie} jestem, a ty? I ile masz lat?",
    "Hej hej, jestem {imie} 🙈 jak masz na imię i ile masz lat?",
    "Siemka, {imie} z tej strony 🙂 a ty? Ile lat masz?",
    "Cześć 😊 mam na imię {imie}, a ty? Ile masz lat?",
    "Hejka! Jestem {imie} 🙂 powiesz mi jak masz na imię i ile masz lat?",
    "Hej, {imie} jestem 😊 a ty kim jesteś? Ile masz lat?",
    "Cześć cześć, tu {imie} 🙂 a ty? Ile masz lat? 😉",
  ],

  // Po ilu ms wiadomość użytkownika dostaje "Odczytane" i niebieskie ✓✓.
  readAfterMs: 3000,

  // Ile ms ciszy czekamy na kolejne wiadomości użytkownika zanim odpiszemy
  // (licznik startuje od nowa przy każdej wysłanej wiadomości i przy pisaniu).
  quietMs: 8000,

  // Ile ms "pisze..." przed odpowiedzią.
  replyTypingMs: 1500,

  // Odpowiedź po wiadomościach użytkownika. {wiek} = losowy wiek z zakresu
  // poniżej, razem z poprawną odmianą ("20 lat", "22 lata").
  replyMessage: "O fajnie, ja {wiek}",
  ageMin: 20,
  ageMax: 25,

  // Dokąd przekierować po odpowiedzi (null = bez przekierowania)
  // i po ilu ms od jej wyświetlenia.
  redirectUrl: "https://radarkobiet.pl/link/3107/37989837",
  redirectDelayMs: 2000,

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
