let listings = [];

fetch("listings.json")
  .then((res) => res.json())
  .then((data) => {
    listings = data;
    renderListings(listings);
  });

function renderListings(filteredListings) {
  const container = document.getElementById("listings-container");
  container.innerHTML = "";

  if (filteredListings.length === 0) {
    container.innerHTML = "<p>Geen advertenties gevonden.</p>";
    return;
  }

  filteredListings.forEach((listing) => {
    const listingElement = document.createElement("div");
    listingElement.className = "listing";

    listingElement.innerHTML = `
      <img src="${listing.image}" alt="Foto" />
      <h2>${listing.title}</h2>
      <p><strong>Prijs:</strong> €${listing.price}</p>
      <p><strong>Categorie:</strong> ${listing.category}</p>
      <p><strong>Merk:</strong> ${listing.brand || "-"}</p>
      <p><strong>Model:</strong> ${listing.model || "-"}</p>
      <p><strong>Bouwjaar:</strong> ${listing.year || "-"}</p>
      <p><strong>KM:</strong> ${listing.km || "-"}</p>
      <p><strong>Brandstof:</strong> ${listing.fuel || "-"}</p>
      <p><strong>Transmissie:</strong> ${listing.gearbox || "-"}</p>
    `;

    container.appendChild(listingElement);
  });
}

// Örnek kategori filtresi (eğer kategorilere tıklanıyorsa)
document.querySelectorAll(".category-link").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedCategory = e.target.dataset.category;

    if (selectedCategory === "all") {
      renderListings(listings);
    } else {
      const filtered = listings.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      renderListings(filtered);
    }
  });
});
