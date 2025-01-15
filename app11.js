document.addEventListener("DOMContentLoaded", () => {
    const citySelector = document.getElementById("city-selector");
    const eventInfo = document.getElementById("event-info");
    const highlightImage = document.getElementById("highlight-image");

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
                const description = firstEvent.querySelector("description").textContent;
                const link = firstEvent.querySelector("link").textContent;
    
                const eventDate = new Date(date);
                const today = new Date();
                eventDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);
    
                const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    
                let timeMessage = "";
                if (diffDays > 0) {
                    timeMessage = `Pozostało: ${diffDays} dni`;
                } else if (diffDays === 0) {
                    timeMessage = "Wydarzenie jest dzisiaj!";
                } else {
                    timeMessage = "Wydarzenie już się odbyło.";
                }
    
                // Parsowanie obrazka z opisu
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = description;
    
                const imgElement = tempDiv.querySelector("img");
                const imageUrl = imgElement ? imgElement.getAttribute("src") : null;
    
                // Wyświetlanie szczegółów wydarzenia
                eventDetails.innerHTML = `<h3>${title}</h3>
                    <p>Data: ${eventDate.toLocaleDateString("pl-PL")}</p>
                    <p>${timeMessage}</p>`;
    
                registerBtn.style.display = "inline-block";
                registerBtn.onclick = () => window.open(link, "_blank");
    
                // Wyświetlanie obrazka
                if (imageUrl) {
                    highlightImage.src = imageUrl;
                    highlightImage.style.display = "block";
                } else {
                    highlightImage.style.display = "none";
                }
    
                // Pokaż sekcję wydarzenia
                eventInfo.style.display = "block";
            } else {
                eventDetails.innerHTML = "<p>Brak zaplanowanych wydarzeń.</p>";
            }
        } catch (error) {
            eventDetails.innerHTML = "<p>Błąd ładowania danych.</p>";
            console.error("Error fetching RSS feed:", error);
        }
    }
    
});
