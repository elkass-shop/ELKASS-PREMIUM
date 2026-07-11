# M1 Production Ready — Live CMS Console (v61)

Ten etap dodaje warstwę kontrolną do przejścia z prototypu do aplikacji.

## Dodane

- zakładka `M1 Live CMS` w `/admin`,
- wgrywanie demo content do lokalnego CMS,
- backup/export ustawień projektu,
- import backupu,
- snapshot publikacji,
- przywracanie snapshotu,
- walidacja projektu przed publikacją,
- raport linków produktów, produktów, mediów i Home LIVE,
- plik `data/demo-store-v61.json`.

## Tryb pracy

Na tym etapie panel działa w trybie lokalnym przez `localStorage`, ale korzysta z tej samej warstwy `ElkassCloud`, która po podłączeniu Supabase przejdzie na zapis do chmury.

## Zasada WOODYBOY

Moduł jest projektowany jako przyszły element WOODYBOY Core: backup, publikacja, walidacja i demo seed są uniwersalne dla kolejnych sklepów.
