# M3 – ELKASS Live Platform

Milestone M3 łączy najważniejsze etapy przejścia z prototypu do aplikacji: Live CMS, Home Builder LIVE, Media Studio LIVE, Visual Builder, Theme Engine LIVE oraz standard Design System.

## Co zostało dodane

- Nowa zakładka **M3 Live Platform** w `/admin`.
- Edytor produktów z listą, formularzem, zapisem, usuwaniem i otwieraniem produktu.
- Home Builder LIVE: nagłówek Hero, opis, CTA, wysokości desktop/mobile i grafika Hero.
- Media Studio LIVE: biblioteka grafik, upload lokalny i wybór grafiki do Hero/produktu.
- Theme Engine LIVE: wybór motywu i efektów sezonowych.
- Backup projektu w JSON.
- Publiczny renderer ustawień Home i motywu.
- Tryb Visual Builder po wejściu z parametrem `?edit=1`.

## Jak testować

1. Wejdź w `/admin`.
2. Kliknij **M3 Live Platform**.
3. Zmień grafikę Hero i kliknij **Opublikuj Home**.
4. Odśwież stronę główną.
5. Dodaj lub edytuj produkt i kliknij **Zapisz produkt**.
6. Otwórz produkt z przycisku **Otwórz produkt**.
7. Wybierz motyw Boże Narodzenie i włącz dekoracje.

## Chmura

M3 działa lokalnie przez `localStorage`, ale korzysta z warstwy `ElkassCloud`. Po skonfigurowaniu Supabase w `config/cloud-config.js` zapis produktów może zostać przełączony na chmurę bez zmiany UI.

## WOODYBOY

Moduły M3 są projektowane tak, aby w przyszłości można było je wydzielić jako elementy **WOODYBOY Core**:

- Product Engine
- Home Builder
- Media Engine
- Theme Engine
- Visual Builder
- Design System
