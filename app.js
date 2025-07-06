document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get("category") || "";
  const listingsContainer = document.getElementById("listings-container");
  const searchInput = document.getElementById("search-input");
  const transmissionFilter = document.getElementById("transmission");
  const yearFromFilter = document.getElementById("year-from");
  const yearToFilter = document.getElementById("year-to");
  const priceMinFilter = document.getElementById("price-min");
  const priceMaxFilter = document.getElementById("price-max");
  const kmMaxFilter = document.getElementById("km-max");
  const fuelFilter = document.getElementById("fuel");

  fetch("../data/listings.json")
    .then(res => res.json())
    .then(data => {
      if (selectedCategory) {
        document.getElementById("category").value = selectedCategory;
      }

      applyFilters(data);

      [
        searchInput, transmissionFilter, yearFromFilter, yearToFilter,
        priceMinFilter, priceMaxFilter, kmMaxFilter, fuelFilter
      ].forEach(input => {
        input.addEventListener("input", () => applyFilters(data));
      });
    });

  function applyFilters(data) {
    const query = searchInput.value.toLowerCase();
    const category = selectedCategory;
    const transmission = transmissionFilter.value;
    const yearFrom = yearFromFilter.value;
    const yearTo = yearToFilter.value;
    const priceMin = priceMinFilter.value;
    const priceMax = priceMaxFilter.value;
    const kmMax = kmMaxFilter.value;
    const fuel = fuelFilter.value;

    const filtered = data.filter(item => {
      return (
        (!category || item.category === category) &&
        (!query || item.title.toLowerCase().includes(query)) &&
        (!transmission || item.transmission === transmission) &&
        (!fuel || item.fuel === fuel) &&
        (!yearFrom || parseInt(item.year) >= parseInt(yearFrom)) &&
        (!yearTo || parseInt(item.year) <= parseInt(yearTo)) &&
        (!priceMin || parseInt(item.price) >= parseInt(priceMin)) &&
        (!priceMax || parseInt(item.price) <= parseInt(priceMax)) &&
        (!kmMax || parseInt(item.kilometers) <= parseInt(kmMax))
      );
    });

    renderListings(filtered);
  }

  function renderListings(listings) {
    listingsContainer.innerHTML = "";

    if (listings.length === 0) {
      listingsContainer.innerHTML = "<p>Geen resultaten gevonden.</p>";
      return;
    }

    listings.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("listing-card");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Prijs: €${item.price}</p>
        <p>Bouwjaar: ${item.year}</p>
        <p>KM: ${item.kilometers}</p>
        <p>Transmissie: ${item.transmission}</p>
        <p>Brandstof: ${item.fuel}</p>
        <p>Categorie: ${item.category}</p>
      `;
      listingsContainer.appendChild(div);
    });
  }
});
