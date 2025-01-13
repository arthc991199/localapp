apka do wglądu w aktualne wydarzenia local

korzysta z rss dla miast
https://local.issa.org.pl/spotkania/category/szczecin/
https://local.issa.org.pl/spotkania/category/rzeszow/
https://local.issa.org.pl/spotkania/category/poznan/
https://local.issa.org.pl/spotkania/category/lublin/
https://local.issa.org.pl/spotkania/category/krakow/
https://local.issa.org.pl/spotkania/category/lodz/
https://local.issa.org.pl/spotkania/category/katowice/
https://local.issa.org.pl/spotkania/category/akademia/ akademie ktore publikujemy czasami
https://local.issa.org.pl/spotkania/category/nl-akademia-najlepsze-prelekcje-z-local/ powtórki z local
https://local.issa.org.pl/spotkania/category/trojmiasto/
https://local.issa.org.pl/spotkania/category/warszawa/
https://local.issa.org.pl/spotkania/category/wroclaw/


to wydarzenia opublikowane na https://local.issa.org.pl/
tutaj kalendarz wizualny https://local.issa.org.pl/spotkania/


apka w obecnej wersji działa https://local.issa.org.pl/app2/

docelowo:
-info o godzinie startu
-info o punktach agendy
-powiadomienia push na telefonie
-ikona w apce PWA z ilosci dni do kolejnego eventu
-uycie profilu uczestnika do zarejestrowania się na evencie
inne?

w pliku index.html
    <script defer src="app8.js"></script>
odwołuje się do .js
tworzenie nowych js jest wymuszone cache w stronie, który nie pozwala na skuteczną edycję samego js.

***Dokumentacja projektu: Aplikacja wydarzeń lokalnych ISSA***
Cel aplikacji
Aplikacja ma za zadanie umożliwić użytkownikom przeglądanie najbliższych wydarzeń w wybranym mieście, wyświetlać szczegóły wydarzenia (data, godzina, miejsce, agenda) oraz zapewnić możliwość dodania aplikacji do ekranu głównego jako PWA (Progressive Web App).

Struktura projektu
Aplikacja składa się z następujących komponentów:

**1. Pliki HTML, CSS i JavaScript**
index.html:

Strona główna aplikacji.
Zawiera interfejs użytkownika: przyciski wyboru miasta, sekcję szczegółów wydarzenia i przycisk zmiany miasta.
Identyfikatory elementów:
city-selector – kontener przycisków wyboru miasta.
event-info – kontener wyświetlający szczegóły wydarzenia.
event-details – sekcja z informacjami o wydarzeniu (miejsce, agenda, godzina).
register-btn – przycisk rejestracji na wydarzenie.
change-city – przycisk zmiany miasta.
styles.css:

Zawiera style responsywne, zapewniając czytelność aplikacji na urządzeniach mobilnych i desktopowych.
Definiuje wygląd przycisków miasta, sekcji wydarzenia i nagłówków.
app.js:

***Główna logika aplikacji.***
Obsługuje:
Wybór miasta przez użytkownika.
Pobieranie danych RSS dla wybranego miasta.
Parsowanie danych wydarzenia (data, miejsce, agenda).
Zapisywanie wyboru miasta w Local Storage.
Obsługę błędów i brakujących danych.
**2. Ikony aplikacji**
favicon.png: Ikona wyświetlana na pasku przeglądarki.
icon-192x192.png: Ikona aplikacji w rozdzielczości 192x192, używana w PWA.
icon-512x512.png: Ikona aplikacji w rozdzielczości 512x512, używana w PWA.
**3. Manifest aplikacji**
manifest.json:
Plik definiujący parametry PWA, m.in.:
Nazwę aplikacji (name, short_name).
Ikony aplikacji (icons).
Startowy URL aplikacji (start_url).
Tryb wyświetlania (display: standalone).
Kolory motywu (theme_color) i tła (background_color).
**4. Service Worker**
service-worker.js:
Obsługuje cache'owanie zasobów aplikacji dla poprawy wydajności.
Zapewnia możliwość działania aplikacji offline (jeśli dodano taką funkcję).
Funkcjonalności aplikacji
Wybór miasta:

Użytkownik wybiera miasto z listy przycisków.
Wybór jest zapisywany w Local Storage, dzięki czemu aplikacja "pamięta" miasto po odświeżeniu.
Wyświetlanie szczegółów wydarzenia:

Pobieranie danych z RSS dla wybranego miasta.
Wyświetlanie informacji o najbliższym wydarzeniu:
Tytuł wydarzenia.
Data i godzina.
Miejsce (jeśli dostępne w danych RSS).
Agenda (jeśli dostępna w danych RSS).
Przycisk "Zarejestruj się" kieruje na stronę wydarzenia.
Zmiana miasta:

Użytkownik może zmienić miasto, klikając przycisk "Zmień miasto", co powoduje usunięcie wyboru z Local Storage.
Progressive Web App (PWA):

Użytkownik może dodać aplikację na pulpit (Android/iOS) jako skrót do aplikacji.
Aplikacja działa w trybie pełnoekranowym jako natywna aplikacja mobilna.
Obsługa danych
Dane o wydarzeniach są pobierane z RSS w formacie XML, np.:

ruby
Skopiuj kod
https://local.issa.org.pl/spotkania/category/poznan/feed
Przykład struktury RSS:

xml
Skopiuj kod
<item>
    <title>25 Poznań #ISSAPolskaPoznań</title>
    <pubDate>Mon, 13 Jan 2025 16:00:00 +0000</pubDate>
    <description>
        <p>%%EVENTLINK%%<br />
        <a href="https://local.issa.org.pl/event/25-poznan-issapolskapoznan/">25 Poznań #ISSAPolskaPoznań</a></p>
        <p>17:00 wspólna kawa 17:20 ISSA Polska co to jest 17:30 dyskusja SOC własny czy zewnętrzny?</p>
        <div class="tribe-block__venue__name">
            <h3>Politechnika Wrocławska – budynek C-13, Sala 0.32</h3>
        </div>
        <span class="tribe-street-address">ul. Janiszewskiego 11-17</span>
        <span class="tribe-locality">Wrocław</span>
    </description>
</item>
**Parsowane dane:**

Tytuł wydarzenia: <title>
Data i godzina: <pubDate>
Miejsce: Wewnątrz <description>, np. .tribe-block__venue__name.
Agenda: Drugi paragraf <p> w <description>.
Obsługa błędów
Brakujące dane w RSS:
Wyświetlany jest komunikat "Brak danych o miejscu" lub "Brak opisu wydarzenia".
Problemy z Local Storage:
Obsługa błędów w przypadku braku dostępu do Local Storage (np. w trybie incognito).
Instrukcje dla deweloperów
Konfiguracja serwera:

Upewnij się, że pliki aplikacji są umieszczone w katalogu z dostępem HTTPS.
Zainstaluj pliki ikon (favicon.png, icon-192x192.png, icon-512x512.png) w katalogu aplikacji.
**-brak plików obecnie**
Modyfikacja miast:

Lista miast znajduje się w obiekcie cities w pliku app.js.
Dodaj nowe miasto, wpisując odpowiedni URL RSS.
Testowanie aplikacji:

Sprawdź działanie PWA w przeglądarkach (Chrome, Safari).
Przetestuj, czy dane z RSS są poprawnie pobierane i wyświetlane.
Debugowanie:

**Użyj console.log w kodzie, aby monitorować:**
Zawartość description w RSS.
Wynik parsowania miejsca i agendy.
Problemy z Local Storage.
Przykład wdrożenia
Lokalizacja aplikacji: https://local.issa.org.pl/app2/
Manifest: https://local.issa.org.pl/app2/manifest.json
Możliwości rozwoju
Dodanie obsługi wielu wydarzeń (np. lista najbliższych 3 wydarzeń).
Funkcja powiadomień push.
Tryb offline z cache'owaniem danych RSS.
