// 1. Smooth scrolling per la navigazione
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
    // Chiudi navbar mobile
    const navbarCollapse = document.getElementById('mainNavbar');
    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).toggle();
    }
  });
});

// 2. Animazioni on scroll (fade-in, slide-up)
function animateOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in, .slide-up');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// 3. Lightbox per la galleria immagini
const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxImg = document.getElementById('lightboxImg');
galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    const imgSrc = this.getAttribute('data-img');
    if (lightboxImg) {
      lightboxImg.src = imgSrc;
    }
  });
});
// Reset src quando si chiude
const lightboxModal = document.getElementById('lightboxModal');
if (lightboxModal) {
  lightboxModal.addEventListener('hidden.bs.modal', function () {
    if (lightboxImg) lightboxImg.src = '';
  });
}

// 4. Responsive video player (iframe ratio è già gestito da Bootstrap)
// (Opzionale: puoi aggiungere altre logiche qui se necessario)

// 5. Sticky navigation con effetti (già sticky, aggiungiamo shadow dinamica)
window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav.navbar');
  if (window.scrollY > 30) {
    nav.classList.add('shadow-lg');
  } else {
    nav.classList.remove('shadow-lg');
  }
});

// 6. Parallax effect per hero section
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (hero) {
    let offset = window.scrollY * 0.5;
    hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
  }
});

// 7. Loading animation
window.addEventListener('DOMContentLoaded', function() {
  const loading = document.getElementById('loading');
  if (loading) {
    setTimeout(() => {
      loading.style.opacity = 0;
      setTimeout(() => loading.style.display = 'none', 400);
    }, 700);
  }
});

// 8. Mobile hamburger menu animazione (già gestito da Bootstrap, ma puoi aggiungere effetti custom qui)
// Esempio: animazione icona hamburger
const navbarToggler = document.querySelector('.navbar-toggler');
if (navbarToggler) {
  navbarToggler.addEventListener('click', function() {
    this.classList.toggle('active');
  });
}
