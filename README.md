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

## Okienko „Szybki start”

- „Mam 18–45 lat” → `linkYounger`
- „Mam więcej niż 45 lat” → `linkOlder`

## Lokalnie

```bash
python3 -m http.server 8000
# otwórz http://localhost:8000/?imie=karolina
```

## Aktualizacje a pamięć przeglądarki

GitHub Pages pozwala przeglądarkom trzymać pliki do 10 minut. Po każdej zmianie w `style.css`, `config.js` lub `app.js` podbij numer `?v=` w `index.html` (np. `?v=10` → `?v=11`), wtedy nowa wersja wczyta się od razu. Do podglądu: Ctrl+Shift+R albo okno incognito.
