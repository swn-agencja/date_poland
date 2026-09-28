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

  // Druga wiadomość zaraz po odpowiedzi z wiekiem – losowana jedna z listy.
  // Dopiero po niej pojawia się przycisk "Kontynuuj rozmowę".
  followUpMessages: [
    "Kogo szukasz 🙂 związek na poważnie?",
    "A czego tu szukasz? Czegoś na poważnie czy luźno 😉?",
    "Powiedz, szukasz związku czy raczej luźnej znajomości? 🙂",
    "Kogo szukasz? Bo ja chyba kogoś na dłużej 🙈",
    "A ty szukasz czegoś na poważnie? 🙂",
    "Szukasz związku czy bardziej luźnego poznania się? 😊",
    "Ciekawa jestem, kogo szukasz 🙂 ktoś na stałe?",
    "Czego szukasz na portalu? Związku na poważnie? 🙂",
  ],
  followUpTypingMs: 2200,

  // Po ilu ms od odpowiedzi pokazać przycisk "Kontynuuj rozmowę".
  ctaDelayMs: 2000,
  ctaInfo: "{imie} czeka na Twoją odpowiedź 💬",
  ctaText: "Kontynuuj rozmowę",

  // Link pod przyciskiem zależy od wieku wyłapanego z wiadomości użytkownika.
  // Wiek >= ageThreshold -> linkOlder, młodszy albo nieznany -> linkYounger.
  ageThreshold: 45,
  linkOlder: "https://radarkobiet.pl/link/3806/37989837",
  linkYounger: "https://radarkobiet.pl/link/3107/37989837",

  // Okienko po kliknięciu ikon (kamera, telefon, zdjęcie, plus, wstecz).
  // Przycisk w okienku zawsze prowadzi na featureLink.
  featureText: "Ta funkcja będzie dostępna po przejściu do głównej wersji witryny.",
  featureButton: "Przejdź do głównej wersji",
  featureLink: "https://radarkobiet.pl/link/3107/37989837",

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
