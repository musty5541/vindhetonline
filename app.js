document.addEventListener("DOMContentLoaded", function () {
    fetch("listings.json")
        .then(response => response.json())
        .then(data => {
            const filterForm = document.getElementById("filterForm");
            const listingsContainer = document.getElementById("listings");

            // Tüm ilanları yükle
            displayListings(data);

            // Filtreleme olayı
            filterForm.addEventListener("submit", function (e) {
                e.preventDefault();

                const selectedCategory = document.getElementById("category").value;

                const filteredData = data.filter(item => {
                    return selectedCategory === "" || item.category === selectedCategory;
                });

                displayListings(filteredData);
            });

            // İlanları ekrana basan fonksiyon
            function displayListings(listings) {
                listingsContainer.innerHTML = "";

                listings.forEach(item => {
                    const card = document.createElement("div");
                    card.classList.add("listing-card");

                    card.innerHTML = `
                        <img src="${item.image}" alt="Foto" width="100">
                        <h2>${item.title}</h2>
                        <p><strong>Prijs:</strong> €${item.price}</p>
                        <p><strong>Categorie:</strong> ${item.category}</p>
                        <p><strong>Merk:</strong> ${item.brand}</p>
                        <p><strong>Model:</strong> ${item.model}</p>
                        <p><strong>Bouwjaar:</strong> ${item.year}</p>
                        <p><strong>KM:</strong> ${item.km}</p>
                        <p><strong>Brandstof:</strong> ${item.fuel}</p>
                    `;

                    listingsContainer.appendChild(card);
                });
            }
        });
});
