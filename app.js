function filterAdvertenties() {
  const merk = document.getElementById("merk").value.toLowerCase();
  const brandstof = document.getElementById("brandstof").value;
  const transmissie = document.getElementById("transmissie").value;
  const jaarMin = parseInt(document.getElementById("jaarMin").value) || 0;
const bouwjaarTot = parseInt(document.getElementById("bouwjaarTot").value) || Infinity;  
  const kmMax = parseInt(document.getElementsByName("km")[0].value) || Infinity;
  const prijsMax = parseInt(document.getElementById("prijsMax").value) || Infinity;

  fetch("https://vindhetonline.netlify.app/.netlify/functions/getData")
    .then((res) => res.json())
    .then((data) => {
      const gefilterdeAdvertenties = data.filter((listing) => {
        return (
          (merk === "" || listing.merk.toLowerCase().includes(merk)) &&
          (brandstof === "Alle" || listing.brandstof === brandstof) &&
          (transmissie === "Alle" || listing.transmissie === transmissie) &&
          listing.jaar >= jaarMin &&
          listing.km <= kmMax &&
          listing.prijs <= prijsMax
        );
      });

      advertentiesTonen(gefilterdeAdvertenties);
    });
}
const bouwjaarTot = parseInt(document.getElementById("bouwjaarTot").value);
