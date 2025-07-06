// js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const listingsContainer = document.getElementById("listings-container");
  const categoryFilter = document.getElementById("category");
  const searchInput = document.getElementById("search-input");
  const transmissionFilter = document.getElementById("transmission");
  const yearFromFilter = document.getElementById("year-from");
  const yearToFilter = document.getElementById("year-to");
  const priceMinFilter = document.getElementById("price-min");
  const priceMaxFilter = document.getElementById("price-max");
  const kmMaxFilter = document.getElementById("km-max");
  const fuelFilter = document.getElementById("fuel");

  fetch("../data/listings.json")
    .then(response => response.json())
    .then(data => {
      renderListings(data);

      function applyFilters() {
        const filtered = data.filter(listing => {
          const categoryMatch = categoryFilter.value === "" || listing.category === categoryFilter.value;
          const searchMatch = searchInput.value === "" || listing.title.toLowerCase().includes(searchInput.value.toLowerCase());
          const transmissionMatch = transmissionFilter.value === "" || listing.transmission === transmissionFilter.value;
          const yearFromMatch = yearFromFilter.value === "" || parseInt(listing.year) >= parseInt(yearFromFilter.value);
          const yearToMatch = yearToFilter.value === "" || parseInt(listing.year) <= parseInt(yearToFilter.value);
          const priceMinMatch = priceMinFilter.value === "" || parseInt(listing.price) >= parseInt(priceMinFilter.value);
          const priceMaxMatch = priceMaxFilter.value === "" || parseInt(listing.price) <= parseInt(priceMaxFilter.value);
          const kmMatch = kmMaxFilter.value === "" || parseInt(listing.kilometers) <= parseInt(kmMaxFilter.value);
          const fuelMatch = fuelFilter.value === "" || listing.fuel === fuelFilter.value;

          return categoryMatch && searchMatch && transmissionMatch && yearFromMatch && yearToMatch &&
                 priceMinMatch && priceMaxMatch && kmMatch && fuelMatch;
        });

        renderListings(filtered);
      }

      function renderListings(listings) {
        listingsContainer.innerHTML = "";
        if (listings.length === 0) {
          listingsContainer.innerHTML = "<p>Geen resultaten gevonden.</p>";
          return;
        }

        listings.forEach(listing => {
          const card = document.createElement("div");
          card.classList.add("listing-card");

          card.innerHTML = `
            <img src="${listing.image}" alt="${listing.title}">
            <h3>${listing.title}</h3>
            <p>Prijs: €${listing.price}</p>
            <p>Bouwjaar: ${listing.year}</p>
            <p>KM: ${listing.kilometers}</p>
            <p>Transmissie: ${listing.transmission}</p>
            <p>Brandstof: ${listing.fuel}</p>
            <p>Categorie: ${listing.category}</p>
          `;

          listingsContainer.appendChild(card);
        });
      }

      // Tüm filtre olaylarını dinle
      [
        categoryFilter, searchInput, transmissionFilter,
        yearFromFilter, yearToFilter,
        priceMinFilter, priceMaxFilter,
        kmMaxFilter, fuelFilter
      ].forEach(input => {
        input.addEventListener("input", applyFilters);
      });
    });
});
