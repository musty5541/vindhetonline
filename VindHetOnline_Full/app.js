let currentLang = "nl";

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("welcome-text").innerText = data.welcome;
      document.getElementById("login-btn").innerText = data.submit;
      document.getElementById("email").placeholder = data.email;
      document.getElementById("password").placeholder = data.password;
      document.getElementById("recent-title").innerText = data.recent;
    })
    .catch(err => console.error("Taalbestand kon niet worden geladen:", err));
}

function changeLang(lang) {
  currentLang = lang;
  loadLanguage(lang);
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "mustafa@vindhetonline.be" && password === "efsane2025!") {
    alert("Welkom terug, Mustafa!");
  } else {
    alert("Ongeldige e-mail of wachtwoord.");
  }
}

function loadListings() {
  fetch("listings.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("listing-container");
      container.innerHTML = "";

      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "listing-card";
        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}" />
          <h3>${item.title}</h3>
          <p>${item.price} – ${item.location}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Ilanlar yüklenemedi:", err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLang);
  loadListings();
});
