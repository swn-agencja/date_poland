# Czat landing page

Prosta strona imitująca czat. Wejście na `/karolina`, `/ania`, `/ola` itd. otwiera czat z tą osobą — po chwili „pisze...” pojawia się losowa pierwsza wiadomość, a po wysłaniu odpowiedzi użytkownik jest przekierowywany (na razie na Wikipedię).

Zero frameworków i zero budowania — czysty HTML/CSS/JS, więc wdrożenie to po prostu wrzucenie plików.

## Pliki

| Plik | Do czego |
|------|----------|
| `config.js` | **Tu zmieniasz wszystko**: pierwsze wiadomości, adres przekierowania, opóźnienia, profile (wiek, miasto, zdjęcie) |
| `index.html` | Szkielet strony |
| `app.js` | Logika czatu |
| `style.css` | Wygląd |
| `404.html` | Obsługa adresów `/imie` na GitHub Pages |
| `vercel.json` | Obsługa adresów `/imie` na Vercelu |

## Wdrożenie

### Vercel (polecane)
1. vercel.com → **Add New → Project** → wybierz to repozytorium.
2. Framework: **Other**, nic nie ustawiaj → **Deploy**.
3. Gotowe: `https://twoja-domena.vercel.app/karolina`

### GitHub Pages
1. Repo → **Settings → Pages** → Source: **Deploy from a branch**, wybierz gałąź, folder `/ (root)`.
2. Adres: https://swn-agencja.github.io/date_poland/karolina

### Lokalnie
```bash
python3 -m http.server 8000
# otwórz http://localhost:8000/?imie=karolina
```

## Konfiguracja (`config.js`)

- `firstMessages` — lista pierwszych wiadomości, losowana jest jedna. `{imie}` zamienia się na imię z adresu.
- `redirectUrl` — dokąd przekierować po pierwszej wiadomości (`null` = nic się nie dzieje).
- `profiles` — opcjonalne dane dla konkretnych imion (wiek, miasto, zdjęcie, własne wiadomości). Imiona spoza listy też działają — dostają kolorowy awatar z pierwszą literą.

## Aktualizacje a pamięć przeglądarki

GitHub Pages pozwala przeglądarkom trzymać pliki do 10 minut. Po każdej zmianie w `style.css`, `config.js` lub `app.js` podbij numer `?v=` w `index.html` (np. `?v=4` → `?v=5`), wtedy nowa wersja wczyta się od razu. Do podglądu: Ctrl+Shift+R albo okno incognito.
