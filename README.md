# randki.site

Portal-landing w stylu serwisu randkowego: strona główna z siatką profili i strony profili pod `/imie` (np. `randki.site/karolina`). Każdy przycisk otwiera okienko z wyborem wieku, które prowadzi na link afiliacyjny.

Zero frameworków i zero budowania – czysty HTML/CSS/JS.

## Pliki

| Plik | Do czego |
|------|----------|
| `config.js` | **Tu zmieniasz wszystko**: profile (imię, wiek, zdjęcie, opisy, zainteresowania), linki w okienku, logo |
| `index.html` | Szkielet strony: nagłówek, okienko z wyborem wieku, pasek na telefonie |
| `app.js` | Strona główna, strona profilu, nawigacja między nimi |
| `style.css` | Wygląd |
| `img/` | Zdjęcia profilowe |
| `404.html` | Obsługa adresów `/imie` na GitHub Pages |
| `CNAME` | Domena `randki.site` dla GitHub Pages |

## Adresy

- `randki.site` – strona główna
- `randki.site/<slug>` – profil z `config.js` (np. `/karolina`)
- dowolne inne imię (np. `/ewa`) – profil składany automatycznie: zdjęcie, wiek i opis zawsze te same dla danego imienia

## Tryb domyślny: strona zaproszenia

Każde imię w adresie (`/kasia`, `/ania`, `/basia`…) pokazuje zdjęcie tej osoby, jej wiek i napis „<Imię> zaprasza Cię do dołączenia do znajomych”. Przycisk „Przejdź dalej” otwiera okienko z wyborem wieku (18–45 / 45+), które prowadzi na linki afiliacyjne. Strona główna `randki.site/` pokazuje osobę z `invite.defaultSlug`. Teksty: `invite` w `config.js`.

Test A/B jest **wyłączony** (`abTest.enabled: false`), kod zostaje. Podgląd starych wersji: `?wersja=1` (portal) i `?wersja=2` (siatka 3×3); żeby znów losować, ustaw `abTest.enabled: true`.

## Test A/B – dwie wersje strony

Przy pierwszym wejściu losowana jest wersja (domyślnie 50/50) i zapamiętywana w przeglądarce na godzinę – klikanie i odświeżanie jej nie zmienia.

- **Wersja 1** – portal z profilami (opisany wyżej).
- **Wersja 2** – siatka 3×3 (8 zdjęć + 9. rozmyte z kłódką) i przyciski: „Potwierdzam, że mam 18 lat” → `linkYounger`, „Potwierdzam, że mam powyżej 45 lat” → `linkOlder`, „Opuść stronę” → `gate.leaveUrl`. Wejście z linku z imieniem (np. `/iwona`) stawia tę osobę na pierwszym miejscu siatki.

Ustawienia: `abTest` i `gate` w `config.js`. Podgląd konkretnej wersji: `randki.site/?wersja=1` albo `?wersja=2`.

## Statystyki (Google Analytics 4)

Wpisz identyfikator (`G-...`) w `config.js` → `analytics.gaId`. Strona wysyła:

| Zdarzenie | Kiedy |
|---|---|
| `page_view` | każde wejście i przejście na stronę główną / profil (z parametrem `profil`) |
| `okienko_wieku` | otwarcie okienka z wyborem wieku |
| `klik_18_45` | kliknięcie „18–45” (parametr `link_url` = wylosowany link) |
| `klik_45_plus` | kliknięcie „45+” |
| `opusc_strone` | „Opuść stronę” w wersji 2 |

Każde zdarzenie ma parametr `wersja` (`v1` / `v2`) do porównania testu A/B.

## Okienko „Szybki start”

- „Mam 18–45 lat” → losowo jeden z linków z listy `linkYounger`
- „Mam więcej niż 45 lat” → `linkOlder`

## Lokalnie

```bash
python3 -m http.server 8000
# otwórz http://localhost:8000/?imie=karolina
```

## Podgląd linku (Open Graph) – Facebook, Messenger

Roboty Facebooka nie wykonują JavaScriptu, a GitHub Pages nie ma serwera, więc każda bohaterka z `config.js` ma własny plik HTML z tagami `og:*` w treści (`ania.html` → `randki.site/ania`) oraz obraz podglądu `og/ania.jpg` (1200×630, zdjęcie bez rozciągania na rozmytym tle). Teksty podglądu: `og` w `config.js` (`{imie}`, `{wiek}`).

**Pliki `<imie>.html`, `og/*.jpg` oraz tagi w `index.html` są generowane – nie edytuj ich ręcznie.**

Po dodaniu / zmianie bohaterki w `config.js` (albo zmianie zdjęcia, `index.html`, `app.js`, `style.css`) uruchom:

```bash
python3 tools/build.py      # wymaga: python3, Pillow, node
```

Ten sam skrypt odpala się sam na GitHubie (`.github/workflows/og.yml`) po każdym pushu i dopisuje wygenerowane pliki. Skrypt podbija też numery wersji plików (`?v=...`) na podstawie ich zawartości, więc nie trzeba tego robić ręcznie.

Imiona spoza listy (np. `/ewa`) nadal działają przez `404.html` i nie mają własnego podglądu.

**Odświeżenie podglądu na Facebooku:** https://developers.facebook.com/tools/debug/ → wklej `https://randki.site/ania` → **Debuguj** → **Zeskanuj ponownie** (Scrape Again). Zrób to po każdej zmianie zdjęcia lub tekstu, bo Facebook trzyma stary podgląd w pamięci.
