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

## Test A/B – dwie wersje strony

Przy pierwszym wejściu losowana jest wersja (domyślnie 50/50) i zapamiętywana w przeglądarce na godzinę – klikanie i odświeżanie jej nie zmienia.

- **Wersja 1** – portal z profilami (opisany wyżej).
- **Wersja 2** – siatka 3×3 (8 zdjęć + 9. rozmyte z kłódką) i przyciski: „Potwierdzam, że mam 18 lat” → `linkYounger`, „Potwierdzam, że mam powyżej 45 lat” → `linkOlder`, „Opuść stronę” → `gate.leaveUrl`. Wejście z linku z imieniem (np. `/iwona`) stawia tę osobę na pierwszym miejscu siatki.

Ustawienia: `abTest` i `gate` w `config.js`. Podgląd konkretnej wersji: `randki.site/?wersja=1` albo `?wersja=2`.

## Okienko „Szybki start”

- „Mam 18–45 lat” → `linkYounger`
- „Mam więcej niż 45 lat” → `linkOlder`

## Lokalnie

```bash
python3 -m http.server 8000
# otwórz http://localhost:8000/?imie=karolina
```

## Aktualizacje a pamięć przeglądarki

GitHub Pages pozwala przeglądarkom trzymać pliki do 10 minut. Po każdej zmianie w `style.css`, `config.js` lub `app.js` podbij numer `?v=` w `index.html` (np. `?v=14` → `?v=15`), wtedy nowa wersja wczyta się od razu. Do podglądu: Ctrl+Shift+R albo okno incognito.
