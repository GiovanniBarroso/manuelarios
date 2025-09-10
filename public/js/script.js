document.addEventListener("DOMContentLoaded", () => {
  // --- Inicialización AOS ---
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // --- Smooth scroll para enlaces anchor ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        const yOffset = -80;
        const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });

  // --- Delegación de eventos para servicios ---
  const servicesSection = document.getElementById("services");
  if (servicesSection)
    servicesSection.addEventListener("click", handleServiceClick);

  // --- Lazy loading imágenes y background-images ---
  const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.tagName.toLowerCase() === "img") el.style.opacity = "1";
        else if (el.dataset.bg) {
          el.style.backgroundImage = `url('${el.dataset.bg}')`;
          el.style.opacity = "1";
        }
        observer.unobserve(el);
      }
    });
  });

  document
    .querySelectorAll(
      "img[data-src], .about-image[data-bg], .gallery-item[data-bg]",
    )
    .forEach((el) => lazyObserver.observe(el));

  // --- Manejo de errores para imágenes ---
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.src = "img/placeholder.jpg";
    });
  });

  // --- Reset servicios ---
  setTimeout(() => {
    document
      .querySelectorAll(".service.expanded")
      .forEach((s) => s.classList.remove("expanded"));
  }, 100);

  // --- Parallax galería ---
  const gallery = document.querySelector(".gallery-parallax");
  if (gallery) {
    const items = gallery.querySelectorAll(".gallery-item");

    const updateGalleryParallax = () => {
      const galleryRect = gallery.getBoundingClientRect();
      const centerX = galleryRect.left + galleryRect.width / 2;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const distance = Math.min(
          Math.abs(centerX - itemCenterX),
          galleryRect.width / 2,
        );

        const scale = 1 - (distance / (galleryRect.width / 2)) * 0.15; // mínimo 0.85
        const rotateY =
          (distance / (galleryRect.width / 2)) *
          15 *
          (itemCenterX < centerX ? 1 : -1);
        const opacity = 1 - (distance / (galleryRect.width / 2)) * 0.4; // mínimo 0.6

        item.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
        item.style.opacity = opacity;
      });
    };

    let isScrolling = false;
    gallery.addEventListener("scroll", () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          updateGalleryParallax();
          isScrolling = false;
        });
      }
      isScrolling = true;
    });

    // Centrar primer item al cargar
    if (items.length > 0) {
      const firstItem = items[0];
      gallery.scrollLeft =
        firstItem.offsetLeft -
        gallery.offsetWidth / 2 +
        firstItem.offsetWidth / 2;
      updateGalleryParallax();
    }
  }
});

// --- Navbar scroll effect con debounce ---
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  debounce(() => {
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }, 10),
);

// --- Mobile menu toggle ---
function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("active");
}

function closeMenu() {
  document.getElementById("nav-menu").classList.remove("active");
}

// --- Cerrar menú móvil al hacer clic fuera ---
document.addEventListener("click", (event) => {
  const nav = document.getElementById("nav-menu");
  const toggle = document.querySelector(".menu-toggle");
  if (
    nav.classList.contains("active") &&
    !nav.contains(event.target) &&
    !toggle.contains(event.target)
  ) {
    nav.classList.remove("active");
  }
});

// --- Manejo click en servicios ---
function handleServiceClick(event) {
  const serviceCard = event.target.closest(".service");
  if (serviceCard && !event.target.closest(".service-details")) {
    event.preventDefault();
    event.stopPropagation();
    const isExpanded = serviceCard.classList.contains("expanded");

    document
      .querySelectorAll(".service.expanded")
      .forEach((s) => s.classList.remove("expanded"));

    if (!isExpanded) {
      serviceCard.classList.add("expanded");
      if (window.innerWidth > 768) {
        setTimeout(() => {
          const yOffset = -100;
          const y =
            serviceCard.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 300);
      }
    }
  }
}

// --- Recalcular al hacer resize ---
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Aquí se puede recalcular posiciones si hace falta
  }, 250);
});
