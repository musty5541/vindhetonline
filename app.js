function advertentiesTonen(advertenties) {
  const container = document.getElementById("advertentiesContainer");
  container.innerHTML = "";

  advertenties.forEach((ad) => {
    const card = document.createElement("div");
    card.classList.add("advertentie-card");
    card.innerHTML = `
      <h3>${ad.naam}</h3>
      <p><strong>Merk:</strong> ${ad.merk}</p>
      <p><strong>Brandstof:</strong> ${ad.brandstof}</p>
      <p><strong>Transmissie:</strong> ${ad.transmissie}</p>
      <p><strong>Bouwjaar:</strong> ${ad.jaar}</p>
      <p><strong>Kilometerstand:</strong> ${ad.kilometers.toLocaleString()} km</p>
      <p><strong>Prijs:</strong> €${ad.prijs.toLocaleString()}</p>
      <p>${ad.beschrijving}</p>
    `;
    container.appendChild(card);
  });
}
