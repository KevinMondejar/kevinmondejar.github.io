const toggle = document.getElementById("toggle")
const body = document.body

// Charger thème sauvegardé
if (localStorage.getItem("theme") === "light") {

  body.classList.add("light")
  toggle.checked = false

} else {

  body.classList.remove("light")
  toggle.checked = true

}

// Changement de thème
toggle.addEventListener("change", () => {

  if (toggle.checked) {

    body.classList.remove("light")
    localStorage.setItem("theme", "dark")

  } else {

    body.classList.add("light")
    localStorage.setItem("theme", "light")

  }

})

// Données passions
const passionsData = [
  { text: "Dessin", img: "asset/images/dessin.png" },
  { text: "Automobile", img: "asset/images/auto.png" },
  { text: "Moto", img: "asset/images/moto.png" },
  { text: "Jeux vidéo", img: "asset/images/jeux-vidéo.png" },
  { text: "Photographie", img: "asset/images/photo.png" },
  { text: "Cuisine", img: "asset/images/cuisine.png" },
]

// Création des items
const carousel = document.getElementById("passions-carousel")
passionsData.forEach((passion, index) => {
  const div = document.createElement("div")
  div.classList.add("carousel-item")
  div.innerHTML = `<img src="${passion.img}" alt="${passion.text}"><p>${passion.text}</p>`
  carousel.appendChild(div)
})

// Animation carrousel
let angle = 0
const radius = 250 // distance au centre
const items = document.querySelectorAll(".carousel-item")
const itemCount = items.length

function animateCarousel() {
  items.forEach((item, i) => {
    const theta = (360 / itemCount) * i + angle
    const rad = theta * (Math.PI / 180)
    // calcul position X
    const x = radius * Math.sin(rad)
    // échelle pour effet profondeur
    const scale = 0.5 + 0.5 * Math.cos(rad)
    const zIndex = Math.round(scale * 100)
    const opacity = 0.3 + 0.7 * scale

    item.style.transform = `translateX(${x}px) translateY(-50%) scale(${scale})`
    item.style.zIndex = zIndex
    item.style.opacity = opacity
  })

  angle += 0.1 // vitesse, augmente pour tourner plus vite
  requestAnimationFrame(animateCarousel)
}

animateCarousel()

const projectCarousels = document.querySelectorAll(".project-carousel")

projectCarousels.forEach(carousel => {
  const images = carousel.querySelectorAll("img")
  let index = 0

  setInterval(() => {
    images.forEach((img, i) => {
      img.style.transform = `translateX(-${index * 100}%)`
    })
    index = (index + 1) % images.length
  }, 3000) // change toutes les 3 secondes
})

// const contactForm = document.getElementById("contact-form")

// contactForm.addEventListener("submit", function(e){
//   e.preventDefault() // Empêche le rechargement

//   const name = document.getElementById("name").value
//   const email = document.getElementById("email").value
//   const message = document.getElementById("message").value

//   // Construction mailto
//   const subject = encodeURIComponent(`Nouveau message de ${name}`)
//   const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)

//   const mailtoLink = `mailto:mondejar.kevin.2005@gmail.com?subject=${subject}&body=${body}`
//   window.location.href = mailtoLink
// })

// Appliquer ou retirer la classe dark-mode au clic
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", toggle.checked);
});

// --- NOUVEAU : Appliquer filtre au chargement ---
window.addEventListener("DOMContentLoaded", () => {
  if (toggle.checked || document.body.classList.contains("dark-mode")) {
    document.body.classList.add("dark-mode");
  }
});

const toggleDescBtns = document.querySelectorAll('.toggle-desc');

toggleDescBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const allDescriptions = document.querySelectorAll('.project-description');
    // Vérifie si une description est déjà ouverte
    const anyExpanded = Array.from(allDescriptions).some(desc => desc.classList.contains('expanded'));

    // Ajoute ou retire la classe 'expanded' sur toutes les descriptions
    allDescriptions.forEach(desc => {
      desc.classList.toggle('expanded', !anyExpanded);
    });

    // Met à jour le texte de tous les boutons
    toggleDescBtns.forEach(b => {
      b.textContent = anyExpanded ? 'Voir plus' : 'Voir moins';
    });
  });
});

const message = document.getElementById('message');
const counter = document.getElementById('char-counter');

message.addEventListener('input', () => {
  const len = message.value.length;
  counter.textContent = `${len}/500`;
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
  if (message.value.length > 500) {
    e.preventDefault();
    alert("Le message ne doit pas dépasser 500 caractères !");
  }
});