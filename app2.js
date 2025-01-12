document.addEventListener("DOMContentLoaded", () => {
    const citySelector = document.getElementById("city-selector");
    const eventInfo = document.getElementById("event-info");
    const registerBtn = document.getElementById("register-btn");
    const changeCityBtn = document.getElementById("change-city");
    const eventDetails = document.getElementById("event-details");
    const nextEventDetails = document.getElementById("next-event-details");

    const cities = {
        poznan: "https://local.issa.org.pl/spotkania/category/poznan/feed",
        szczecin: "https://local.issa.org.pl/spotkania/category/szczecin/feed",
        rzeszow: "https://local.issa.org.pl/spotkania/category/rzeszow/feed",
        lublin: "https://local.issa.org.pl/spotkania/category/lublin/feed",
        krakow: "https://local.issa.org.pl/spotkania/category/krakow/feed",
        lodz: "https://local.issa.org.pl/spotkania/category/lodz/feed",
        katowice: "https://local.issa.org.pl/spotkania/category/katowice/feed",
        trojmiasto: "https://local.issa.org.pl/spotkania/category/trojmiasto/feed",
        warszawa: "https://local.issa.org.pl/spotkania/category/warszawa/feed",
        wroclaw: "https://local.issa.org.pl/spotkania/category/wroclaw/feed",
        akademia: "https://local.issa.org.pl/spotkania/category/akademia/feed",
        "nl-akademia-najlepsze-prelekcje-z-local": "https://local.issa.org.pl/spotkania/category/nl-akademia-najlepsze-prelekcje-z-local/feed"
    };

    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity && cities[savedCity]) {
        loadEvents(cities[savedCity]);
        citySelector.style.display = "none";
        eventInfo.style.display = "block";
    } else {
        citySelector.style.display = "block";
        eventInfo.style.display = "none";
    }

    document.querySelectorAll(".city-btn").forEach(button => {
        button.addEventListener("click", () => {
            const selectedCity = button.dataset.city;
            if (selectedCity && cities[selectedCity]) {
                localStorage.setItem("selectedCity", selectedCity);
                loadEvents(cities[selectedCity]);
                citySelector.style.display = "none";
                eventInfo.style.display = "block";
            }
        });
    });

    changeCityBtn.addEventListener("click", () => {
        localStorage.removeItem("selectedCity");
        location.reload();
    });

    async function loadEvents(feedUrl) {
        try {
            const response = await fetch(feedUrl);
            const text = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "application/xml");
            const items = xml.querySelectorAll("item");

            if (items.length > 0) {
                const firstEvent = items[0];
                const title = firstEvent.querySelector("title").textContent;
                const date = firstEvent.querySelector("pubDate").textContent;
                const location = firstEvent.querySelector("location")?.textContent || "Sprawdź w wydarzeniu";
                const time = firstEvent.querySelector("time")?.textContent || "Sprawdź w wydarzeniu";
                const link = firstEvent.querySelector("link").textContent;

                const eventDate = new Date(date);
                const today = new Date();
                const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

                eventDetails.innerHTML = `<h3>${title}</h3>
                    <p>Data: ${eventDate.toLocaleDateString("pl-PL")}</p>
                    <p>Miejsce: ${location}</p>
                    <p>Godzina: ${time}</p>
                    <p>Pozostało: ${diffDays} dni</p>`;
                registerBtn.style.display = "inline-block";
                registerBtn.onclick = () => window.open(link, "_blank");

                if (items.length > 1) {
                    const secondEvent = items[1];
                    const title2 = secondEvent.querySelector("title").textContent;
                    const date2 = secondEvent.querySelector("pubDate").textContent;

                    const eventDate2 = new Date(date2);
                    nextEventDetails.innerHTML = `<h4>${title2}</h4>
                        <p>Data: ${eventDate2.toLocaleDateString("pl-PL")}</p>`;
                }
            } else {
                eventDetails.innerHTML = "<p>Brak zaplanowanych wydarzeń.</p>";
            }
        } catch (error) {
            eventDetails.innerHTML = "<p>Błąd ładowania danych.</p>";
            console.error("Error fetching RSS feed:", error);
        }
    }
});
