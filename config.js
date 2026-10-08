// ============================================================
//  KONFIGURACJA – tu zmieniasz wszystko bez grzebania w kodzie
// ============================================================
window.SITE_CONFIG = {
  // Logo: pierwsza część biała, druga w kolorze akcentu.
  brand: ["randki", ".site"],
  brandSub: "portal randkowy",

  // Okienko z wyborem wieku – każdy przycisk "Dołącz", "Zobacz profil",
  // "Wyślij wiadomość" itd. otwiera to okienko.
  linkYounger: "https://radarkobiet.pl/link/3107/37989837", // "Mam 18–45 lat"
  linkOlder: "https://radarkobiet.pl/link/3806/37989837",   // "Mam więcej niż 45 lat"

  // Test A/B: przy pierwszym wejściu losujemy wersję strony i pamiętamy ją
  // w przeglądarce przez rememberHours godzin (klikanie i odświeżanie jej nie zmienia).
  //   wersja 1 – portal z profilami,  wersja 2 – siatka zdjęć z potwierdzeniem wieku.
  // Podgląd konkretnej wersji: randki.site/?wersja=1 lub ?wersja=2
  abTest: {
    version2Share: 0.5,   // 0.5 = 50% wejść na wersję 2; 0 = tylko wersja 1; 1 = tylko wersja 2
    rememberHours: 1,
  },

  // Wersja 2: 8 widocznych zdjęć + 9. rozmyte z kłódką (slugi profili z listy poniżej).
  gate: {
    photos: ["klaudia", "sandra", "daria", "paulina", "nikola", "dominika", "weronika", "iwona", "monika"],
    title: "Kobiety z Twojej okolicy są teraz online",
    text: "Strona zawiera treści przeznaczone wyłącznie dla dorosłych. Potwierdź swój wiek, aby zobaczyć profile.",
    btnYounger: "Potwierdzam, że mam 18 lat",
    btnOlder: "Potwierdzam, że mam powyżej 45 lat",
    btnLeave: "Opuść stronę",
    leaveUrl: "https://www.google.com/",
  },

  // Profile. Adres strony profilu to /<slug>, np. randki.site/karolina.
  // Kolejność = kolejność na stronie głównej. isNew = plakietka "Nowa".
  // photo = zdjęcie główne, photos = dodatkowe zdjęcia (pokazywane jako zablokowane miniatury).
  profiles: [
    {
      slug: "klaudia", name: "Klaudia", age: 27, photo: "img/klaudia.jpg", isNew: true,
      bio: "Uśmiech to moja broń. Sprawdź, czy na Ciebie też zadziała 😉",
      about: "Lubię się dobrze ubrać, wyjść wieczorem na miasto i poznać kogoś, przy kim czas leci za szybko. Doceniam facetów pewnych siebie, ale bez zadęcia.",
      interests: ["Moda", "Wieczorne wyjścia", "Flirt"],
    },
    {
      slug: "sandra", name: "Sandra", age: 25, photo: "img/sandra.jpg", isNew: true,
      bio: "Siłownia rano, randka wieczorem? Brzmi jak idealny dzień 😉",
      about: "Dbam o siebie i lubię, kiedy facet też to robi. Jestem bezpośrednia – jeśli ktoś mi się podoba, nie udaję, że jest inaczej.",
      interests: ["Siłownia", "Flirt", "Wieczorne wyjścia"],
    },
    {
      slug: "daria", name: "Daria", age: 27, photo: "img/daria.jpg", isNew: true,
      bio: "Lubię biel, koronki i facetów, którzy potrafią prawić komplementy 😘",
      about: "Jestem kobieca i nie wstydzę się tego. Szukam mężczyzny pewnego siebie, który wie, jak zainteresować kobietę rozmową, zanim zaprosi ją na randkę.",
      interests: ["Moda", "Flirt", "Romantyczne wieczory"],
    },
    {
      slug: "paulina", name: "Paulina", age: 29, photo: "img/paulina.jpg", isNew: true,
      bio: "Właśnie wróciłam z wakacji i szukam kogoś, z kim zaplanuję kolejne ☀️",
      about: "Opalenizna jeszcze trzyma, humor też. Lubię aktywnie spędzać czas, ale wieczory wolę spokojne – najlepiej we dwoje.",
      interests: ["Podróże", "Fitness", "Wieczory we dwoje"],
    },
    {
      slug: "ola", name: "Ola", age: 27, photo: "img/ola.jpg", isNew: false,
      bio: "Lubię długie rozmowy przy winie i facetów, którzy potrafią mnie rozśmieszyć 😊",
      about: "Nie lubię pisać w nieskończoność. Jeśli od pierwszych wiadomości dobrze się dogadujemy, chętnie umówię się na kawę albo spacer.",
      interests: ["Wino", "Spacery", "Seriale"],
    },
    {
      slug: "dominika", name: "Dominika", age: 26, photo: "img/dominika.jpg", isNew: true,
      bio: "Koronka, uśmiech i odrobina zadziorności. Odważysz się napisać?",
      about: "Lubię wyglądać dobrze i czuć się dobrze w swoim towarzystwie. Szukam faceta, który potrafi docenić kobietę i nie boi się zrobić pierwszego kroku.",
      interests: ["Moda", "Chemia", "Randki"],
    },
    {
      slug: "monika", name: "Monika", age: 46, photo: "img/monika.jpg", photos: ["img/monika-2.jpg"], isNew: true,
      bio: "Dojrzała, ciepła i z poczuciem humoru. Wiem, czego chcę – a Ty?",
      about: "Dzieci już dorosłe, więc wreszcie mam czas dla siebie. Lubię spacery, wycieczki po Polsce i rozmowy do późna. Szukam mężczyzny, który doceni kobietę z doświadczeniem.",
      interests: ["Wycieczki", "Natura", "Romantyczne wieczory"],
    },
    {
      slug: "nikola", name: "Nikola", age: 24, photo: "img/nikola.jpg", isNew: true,
      bio: "Niebieskie oczy i zero cierpliwości do nudnych wiadomości 😏",
      about: "Lubię ładne rzeczy, dobre jedzenie i facetów, którzy wiedzą, jak zaprosić kobietę na randkę. Nie odpisuję na „hej”, więc postaraj się bardziej.",
      interests: ["Moda", "Restauracje", "Flirt"],
    },
    {
      slug: "weronika", name: "Weronika", age: 24, photo: "img/weronika.jpg", isNew: true,
      bio: "Długie włosy, krótkie spódniczki i jeszcze krótsza cierpliwość do nudy 😉",
      about: "Jestem tu od niedawna i ciekawi mnie, kto odważy się napisać pierwszy. Lubię facetów z humorem i inicjatywą.",
      interests: ["Taniec", "Flirt", "Spontaniczne randki"],
    },
    {
      slug: "iwona", name: "Iwona", age: 38, photo: "img/iwona.jpg", isNew: true,
      bio: "Lato nad jeziorem, zachody słońca i dobre towarzystwo. Dołączysz? ☀️",
      about: "Mam swoje lata i swoje doświadczenia, ale wciąż lubię flirtować jak nastolatka. Szukam dojrzałego mężczyzny, z którym nie będzie nudno.",
      interests: ["Jeziora", "Plaża", "Wino"],
    },
    {
      slug: "patrycja", name: "Patrycja", age: 28, photo: "img/patrycja.jpg", isNew: true,
      bio: "Puszczam oczko tylko wybranym 😉 Może będziesz następny?",
      about: "Mam poczucie humoru i lubię się droczyć. Najlepiej dogaduję się z facetami, którzy łapią żarty i sami potrafią rozśmieszyć.",
      interests: ["Flirt", "Humor", "Wieczory we dwoje"],
    },
    {
      slug: "karolina", name: "Karolina", age: 29, photo: "img/karolina.jpg", isNew: false,
      bio: "Słońce, morze i spontaniczne wyjazdy. Szukam kogoś, kto spakuje się w 10 minut 😉",
      about: "Jestem typem osoby, która w piątek wieczorem decyduje, że w sobotę jedzie nad morze. Fajnie byłoby mieć z kim.",
      interests: ["Podróże", "Morze", "Spontaniczność"],
    },
    {
      slug: "oliwia", name: "Oliwia", age: 23, photo: "img/oliwia.jpg", isNew: true,
      bio: "Trochę szalona, trochę leniwa w niedziele. Szukam kogoś do obu wersji 😜",
      about: "W tygodniu studia i praca, w weekend chętnie wyskoczę gdzieś spontanicznie. Lubię facetów z dystansem do siebie.",
      interests: ["Imprezy", "Seriale", "Spontaniczność"],
    },
    {
      slug: "magda", name: "Magda", age: 31, photo: "img/magda.jpg", isNew: false,
      bio: "Kawa, książki i dobre rozmowy. Inteligencja to dla mnie najlepszy flirt.",
      about: "Na co dzień spokojna, ale przy dobrym towarzystwie robię się zaskakująco gadatliwa. Lubię facetów, którzy mają coś ciekawego do powiedzenia.",
      interests: ["Kawa", "Książki", "Rozmowy"],
    },
    {
      slug: "agnieszka", name: "Agnieszka", age: 35, photo: "img/agnieszka.jpg", isNew: true,
      bio: "Dom z ogródkiem już mam. Brakuje tylko kogoś, z kim wypiję wieczorem wino 🍷",
      about: "Jestem dojrzała, wiem, czego chcę, i nie lubię gierek. Szukam mężczyzny, z którym będzie mi dobrze zarówno na kanapie, jak i na mieście.",
      interests: ["Wino", "Ogród", "Romantyczne wieczory"],
    },
    {
      slug: "ania", name: "Ania", age: 26, photo: "img/ania.jpg", isNew: false,
      bio: "Uśmiechnięta, pozytywna i ciekawa ludzi. Napisz, a sprawdzimy, czy zaiskrzy ✨",
      about: "Wierzę, że od jednej dobrej rozmowy może się zacząć coś naprawdę fajnego. Szukam kogoś, z kim nie będzie nudno.",
      interests: ["Muzyka", "Koncerty", "Randki"],
    },
    {
      slug: "marta", name: "Marta", age: 27, photo: "img/marta.jpg", isNew: true,
      bio: "Naturalna, trochę nieśmiała, ale z dużym sercem 🙂",
      about: "Nie jestem typem imprezowiczki. Wolę spokojne randki, długie rozmowy i kogoś, przy kim mogę być sobą.",
      interests: ["Kawa", "Spacery", "Kino"],
    },
    {
      slug: "ewelina", name: "Ewelina", age: 31, photo: "img/ewelina.jpg", isNew: true,
      bio: "Zdjęcie twarzy pokażę po pierwszej dobrej wiadomości 😉",
      about: "Jestem dyskretna i wolę poznać kogoś najpierw przez rozmowę. Jeśli złapiemy kontakt, chętnie umówię się na żywo.",
      interests: ["Fitness", "Dyskrecja", "Wieczory we dwoje"],
    },
    {
      slug: "kasia", name: "Kasia", age: 24, photo: "img/kasia.jpg", isNew: false,
      bio: "Nowa tutaj. Trochę nieśmiała, ale tylko na początku 🙈",
      about: "Przy pierwszej wiadomości zwykle się stresuję, ale potem nie da się mnie zatrzymać. Doceniam facetów, którzy piszą pierwsi.",
      interests: ["Filmy", "Gotowanie", "Flirt"],
    },
    {
      slug: "natalia", name: "Natalia", age: 30, photo: "img/natalia.jpg", isNew: false,
      bio: "Konkretna i z poczuciem humoru. Wolę jedno spotkanie niż sto wiadomości.",
      about: "Mam swoje życie, pracę i pasje, ale brakuje mi kogoś, z kim mogłabym spędzać wieczory. Jeśli też masz dość samotnych weekendów, napisz.",
      interests: ["Samochody", "Sport", "Wieczorne wyjścia"],
    },
    {
      slug: "julia", name: "Julia", age: 28, photo: "img/julia.jpg", isNew: false,
      bio: "Rude włosy, piegi i spory temperament. Uprzedzam lojalnie 😉",
      about: "Lubię domowe wieczory, ale równie chętnie wyskoczę gdzieś spontanicznie. Najważniejsze, żeby było z kim się pośmiać.",
      interests: ["Taniec", "Flirt", "Wieczory we dwoje"],
    },
    {
      slug: "zuzia", name: "Zuzia", age: 25, photo: "img/zuzia.jpg", isNew: false,
      bio: "Uwielbiam spacery po mieście i facetów, którzy wiedzą, czego chcą.",
      about: "Nie szukam księcia z bajki. Wystarczy ktoś normalny, szczery i z inicjatywą. Resztę dogadamy przy kawie.",
      interests: ["Miasto", "Kawa", "Randki"],
    },
    {
      slug: "wiktoria", name: "Wiktoria", age: 33, photo: "img/wiktoria.jpg", isNew: false,
      bio: "Dojrzała, spokojna, ale z iskrą w oku. Lubię mężczyzn z charakterem.",
      about: "Wiem już, czego chcę, i nie lubię tracić czasu na gierki. Jeśli masz podobnie, możemy się szybko dogadać.",
      interests: ["Natura", "Kolacje", "Chemia"],
    },
  ],

  // Profil dla imion spoza listy (np. randki.site/ewa): zdjęcie, wiek i opis
  // dobierane z poniższych pul – zawsze te same dla danego imienia.
  fallback: {
    ageMin: 23,
    ageMax: 34,
    bios: [
      "Szukam kogoś, z kim rozmowa będzie się kleić od pierwszej wiadomości 😊",
      "Lubię spontaniczne randki i facetów z poczuciem humoru.",
      "Nowa w okolicy, chętnie poznam kogoś interesującego ✨",
      "Wolę jedno dobre spotkanie niż tygodnie pisania 😉",
    ],
    abouts: [
      "Nie lubię długo pisać – jeśli złapiemy dobry kontakt, chętnie umówię się na żywo.",
      "Cenię szczerość, humor i inicjatywę. Napisz, a zobaczymy, czy zaiskrzy.",
    ],
    interests: [["Flirt", "Randki", "Kawa"], ["Spacery", "Muzyka", "Chemia"], ["Kino", "Podróże", "Wieczory we dwoje"]],
  },
};
