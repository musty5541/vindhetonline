// Voorbeelddata
let listings = [
  {
    id: 1,
    title: "2015 Fiat Egea",
    category: "Auto",
    price: 18000,
    image: "https://via.placeholder.com/300x150",
    description: "Lage km, goed onderhouden."
  },
  {
    id: 2,
    title: "Sony PlayStation 5",
    category: "Elektronica",
    price: 500,
    image: "https://via.placeholder.com/300x150",
    description: "Nieuw in doos."
  },
  {
    id: 3,
    title: "Vintage Leren Jasje",
    category: "Kleding",
    price: 120,
    image: "https://via.placeholder.com/300x150",
    description: "Uniek item."
  }
];

// Categorieën in het Nederlands
const categories = [
  "Alles","Auto","Kleding","Sport","Elektronica",
  "Woning","Spullen","Hobby","Te Huur","Te Koop"
];

// LocalStorage laden
if (localStorage.getItem("listingsDemo")) {
  listings = JSON.parse(localStorage.getItem("listingsDemo"));
}

// Elementreferenties
const catList = document.getElementById("category-list");
const cards   = document.getElementById("cards");
const formDiv = document.getElementById("listing-form");
const showBtn = document.getElementById("show-form");
const cancel  = document.getElementById("cancel");
const form    = document.getElementById("form");

// Categorie-pills maken
categories.forEach((cat, i) => {
  const li = document.createElement("li");
  li.className = "nav-item";
  li.innerHTML = `
    <a href="#" class="nav-link${i===0?" active":""}" data-cat="${cat}">
      ${cat}
    </a>`;
  catList.appendChild(li);
});

// Renderfunctie
function render(category = "Alles") {
  cards.innerHTML = "";
  const filtered = category === "Alles"
    ? listings
    : listings.filter(l => l.category === category);

  if (!filtered.length) {
    cards.innerHTML = "<p class='text-muted'>Geen advertenties gevonden.</p>";
    return;
  }

  filtered.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${item.image || 'https://via.placeholder.com/300x150'}" class="card-img-top">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text text-success fw-bold">€ ${item.price}</p>
          <p class="card-text">${item.description || ''}</p>
        </div>
      </div>`;
    cards.appendChild(col);
  });
}

// Categorie-selectie
catList.addEventListener("click", e => {
  if (!e.target.matches("a")) return;
  e.preventDefault();

  catList.querySelectorAll("a").forEach(a => a.classList.remove("active"));
  e.target.classList.add("active");
  render(e.target.dataset.cat);
});

// Eerste render
render();

// Formulier tonen/verbergen
showBtn.onclick = () => formDiv.classList.toggle("d-none");
cancel.onclick  = () => formDiv.classList.add("d-none");

// Nieuwe advertentie toevoegen
form.onsubmit = e => {
  e.preventDefault();
  const newItem = {
    id: Date.now(),
    title: form.title.value,
    category: form.category.value,
    price: form.price.value,
    image: form.image.value,
    description: form.description.value
  };
  listings.push(newItem);
  localStorage.setItem("listingsDemo", JSON.stringify(listings));
  form.reset();
  formDiv.classList.add("d-none");

  const activeCat = catList.querySelector("a.active").dataset.cat;
  render(activeCat);
};
