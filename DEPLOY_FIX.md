# ELKASS Premium 2.1 — poprawka wdrożenia

Ta paczka ma pliki strony bezpośrednio w katalogu głównym archiwum. Po rozpakowaniu `index.html`, `assets`, `admin`, `app` i `config` muszą znajdować się obok siebie.

Naprawiono ścieżki CSS/JS w dokumentach HTML, aby strona nie uruchamiała się jako nieostylowany dokument przy wdrożeniu w katalogu lub podglądzie pliku.

Rekomendowane uruchomienie lokalne:

```bash
python3 -m http.server 8080
```

Następnie otwórz `http://localhost:8080/`.
