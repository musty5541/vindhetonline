function applyFilters(listings) {
  const category = document.getElementById("category").value;
  const brand = document.getElementById("brand").value.toLowerCase();
  const model = document.getElementById("model").value.toLowerCase();

  return listings.filter(item => {
    return (
      (category === "" || item.category === category) &&
      (brand === "" || item.brand.toLowerCase().includes(brand)) &&
      (model === "" || item.model.toLowerCase().includes(model))
    );
  });
}

function displayListings(listings) {
  const filtered = applyFilters(listings); // ← filtre uygulanıyor
  const container = document.getElementById("listings");
  container.innerHTML = "";

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "listing-card";

    card.innerHTML = `
      <img src="${item.image}" alt="Foto" onerror="this.src='https://via.placeholder.com/150?text=Foto';" />
      <h2>${item.title}</h2>
      <p><strong>Prijs:</strong> €${item.price}</p>
      <p><strong>Categorie:</strong> ${item.category}</p>
      ${item.brand ? `<p><strong>Merk:</strong> ${item.brand}</p>` : ""}
      ${item.model ? `<p><strong>Model:</strong> ${item.model}</p>` : ""}
      ${item.year ? `<p><strong>Bouwjaar:</strong> ${item.year}</p>` : ""}
      ${item.km ? `<p><strong>KM:</strong> ${item.km}</p>` : ""}
      ${item.fuel ? `<p><strong>Brandstof:</strong> ${item.fuel}</p>` : ""}
    `;

    container.appendChild(card);
  });
}
