// Dati del cast
const castData = [
  { role: "Attore", name: "Leonardo Nenna" },
  { role: "Soggetto e sceneggiatura", name: "Gioele Gallo, Giovanni Vecchio" },
  { role: "Regia", name: "Gioele Gallo" },
  { role: "Intervistati", name: "Anna Maria Monteverdi, Guido Segni, Tommaso Verde, Sandra Lischi" },
  { role: "Fotografia", name: "Giacomo Tieghi" },
  { role: "Musiche originali", name: "Andrea Giorgelli" },
  { role: "Sound Designer e mix", name: "Andrea Giorgelli" },
  { role: "Montaggio", name: "Gioele Gallo" },
  { role: "Assistenti al montaggio", name: "Nicolas Micheletti, Agnese Nannipieri" },
  { role: "Titolazione e lettering", name: "Agnese Nannipieri" },
  { role: "Operatori", name: "Nicolas Micheletti, Giacomo Tieghi, Gioele Gallo" },
  { role: "Fonici di presa diretta", name: "Nicolas Micheletti, Gioele Gallo" },
  { role: "Color correction", name: "Andrea Vignali, Gioele Gallo" },
  { role: "Artwork", name: "Matteo Spinapolice" },
  { role: "Produzione", name: "Gioele Gallo, Nicolas Micheletti, Giovanni Vecchio" },
];

// Dati degli articoli
const articlesData = [
  {
    title: "Sold Out al Cinema Arsenale di Pisa per l'anteprima del film",
    url: "https://www.annamonteverdi.it/digital/sold-out-al-cinema-arsenale-di-pisa-per-lanteprima-del-film-giacomo-verde-non-esiste-di-gioele-gallo/",
    description: "Resoconto dell'anteprima sold out al Cinema Arsenale di Pisa",
  },
  {
    title: "Intervista a Gioele Gallo, regista del film-doc GVNE",
    url: "https://www.annamonteverdi.it/digital/intervista-a-gioele-gallo-regista-del-film-doc-gvne-giacomo-verde-non-esiste/",
    description: "Intervista approfondita al regista Gioele Gallo",
  },

];

// Immagini della galleria
const galleryImages = [
  "images/Foto1.jpg",
  "images/Foto2.jpg",
  "images/Foto3.jpg",
  "images/Foto4.jpg",
  "images/Foto5.webp",
  "images/Foto6.jpg",
  "images/Foto7.jpg",
  "images/foto8.jpg",
  "images/foto9.jpg",
];

// Inizializzazione
document.addEventListener("DOMContentLoaded", () => {
  // Rimuovi loading screen
  setTimeout(() => {
    const loading = document.getElementById("loading")
    if (loading) {
      loading.style.opacity = "0"
      setTimeout(() => (loading.style.display = "none"), 400)
    }
  }, 700)

  // Inizializza componenti
  initMobileMenu()
  initSmoothScrolling()
  populateCast()
  populateGallery()
  populateArticles()
  initLightbox()
})

// Menu mobile
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navbarMenu = document.getElementById("navbarMenu")

  if (mobileMenuBtn && navbarMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active")
      navbarMenu.classList.toggle("active")
    })

    // Chiudi menu quando si clicca su un link
    const navLinks = navbarMenu.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        navbarMenu.classList.remove("active")
      })
    })
  }
}

// Smooth scrolling
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for fixed header
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Popola cast
function populateCast() {
  const castGrid = document.getElementById("castGrid")
  if (!castGrid) return

  castGrid.innerHTML = castData
    .map(
      (member) => `
    <div class="cast-card">
      <h5 class="cast-role">${member.role}</h5>
      <p class="cast-name">${member.name}</p>
    </div>
  `,
    )
    .join("")
}

// Popola galleria
function populateGallery() {
  const galleryGrid = document.getElementById("galleryGrid")
  if (!galleryGrid) return

  galleryGrid.innerHTML = galleryImages
    .map(
      (image, index) => `
    <div class="gallery-item" data-image="${image}">
      <img src="${image}" alt="Foto ${index + 1}" loading="lazy">
    </div>
  `,
    )
    .join("")
}

// Popola articoli
function populateArticles() {
  const articlesGrid = document.getElementById("articlesGrid")
  if (!articlesGrid) return

  articlesGrid.innerHTML = articlesData
    .map(
      (article) => `
    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="article-card">
      <div class="article-header">
        <span class="article-icon">📄</span>
        <span class="external-icon">↗</span>
      </div>
      <h3 class="article-title">${article.title}</h3>
      <p class="article-description">${article.description}</p>
    </a>
  `,
    )
    .join("")
}

// Lightbox
function initLightbox() {
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightboxImg")
  const lightboxClose = document.getElementById("lightboxClose")

  if (!lightbox || !lightboxImg || !lightboxClose) return

  // Apri lightbox
  document.addEventListener("click", (e) => {
    if (e.target.closest(".gallery-item")) {
      const galleryItem = e.target.closest(".gallery-item")
      const imageSrc = galleryItem.dataset.image
      lightboxImg.src = imageSrc
      lightbox.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  })

  // Chiudi lightbox
  function closeLightbox() {
    lightbox.classList.remove("active")
    document.body.style.overflow = ""
    lightboxImg.src = ""
  }

  lightboxClose.addEventListener("click", closeLightbox)

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Chiudi con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox()
    }
  })
}

// Scroll effects per navbar
window.addEventListener("scroll", () => {
  const nav = document.querySelector("header")
  if (window.scrollY > 30) {
    nav.style.background = "linear-gradient(90deg, rgba(0,0,0,0.95) 70%, rgba(0,255,65,0.2) 100%)"
  } else {
    nav.style.background = "linear-gradient(90deg, var(--black) 70%, rgba(0,255,65,0.2) 100%)"
  }
})
