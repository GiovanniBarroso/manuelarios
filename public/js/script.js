// ---------- Utils ----------
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// ---------- AOS (inicialización no bloqueante) ----------
const initAOS = () => {
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }
};

// Intenta en idle; fallback al load
if ("requestIdleCallback" in window) {
  requestIdleCallback(initAOS, { timeout: 2000 });
} else {
  window.addEventListener("load", initAOS, { once: true });
}

// ---------- DOM Ready ----------
document.addEventListener("DOMContentLoaded", () => {
  // --- Smooth scroll para anchors (respeta navbar) ---
  const nav = document.querySelector("nav");
  const getOffset = () => -(nav ? nav.getBoundingClientRect().height + 10 : 80);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const y =
        target.getBoundingClientRect().top + window.scrollY + getOffset();
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // --- Delegación de eventos para servicios ---
  const servicesSection = document.getElementById("services");
  if (servicesSection)
    servicesSection.addEventListener("click", handleServiceClick);

  // --- Lazy loading con IntersectionObserver: data-src / data-bg opcionales ---
  const lazyObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target;

      if (el.tagName.toLowerCase() === "img") {
        // Carga diferida real si existe data-src
        if (el.dataset.src) el.src = el.dataset.src;
        el.style.opacity = "1";
      } else if (el.dataset.bg) {
        el.style.backgroundImage = `url('${el.dataset.bg}')`;
        el.style.opacity = "1";
      }
      observer.unobserve(el);
    }
  });

  document
    .querySelectorAll(
      "img[data-src], .about-image[data-bg], .gallery-item[data-bg]",
    )
    .forEach((el) => lazyObserver.observe(el));

  // --- Manejo de errores para imágenes (sin bucle infinito) ---
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.onerror = null; // evita loop si placeholder falla
      img.src = "img/placeholder.jpg";
    });
  });

  // --- Reset servicios (por si llegan abiertos) ---
  setTimeout(() => {
    document
      .querySelectorAll(".service.expanded")
      .forEach((s) => s.classList.remove("expanded"));
  }, 100);

  // --- Parallax galería (suave y eficiente) ---
  const gallery = document.querySelector(".gallery-parallax");
  if (gallery) {
    const items = gallery.querySelectorAll(".gallery-item");

    // pistas para el compositor
    items.forEach((it) => (it.style.willChange = "transform, opacity"));

    const updateGalleryParallax = () => {
      const galleryRect = gallery.getBoundingClientRect();
      const half = galleryRect.width / 2;
      const centerX = galleryRect.left + half;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const d = Math.min(Math.abs(centerX - itemCenterX), half);

        const scale = 1 - (d / half) * 0.15; // >= 0.85
        const rotateY = (d / half) * 15 * (itemCenterX < centerX ? 1 : -1);
        const opacity = 1 - (d / half) * 0.4; // >= 0.6

        item.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
        item.style.opacity = opacity;
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateGalleryParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    gallery.addEventListener("scroll", onScroll, { passive: true });

    // Centrar primer item al cargar
    if (items.length > 0) {
      const first = items[0];
      gallery.scrollLeft =
        first.offsetLeft - gallery.offsetWidth / 2 + first.offsetWidth / 2;
      updateGalleryParallax();
    }

    // Recalcular al redimensionar
    window.addEventListener("resize", debounce(updateGalleryParallax, 150));
  }
});

// ---------- Navbar scroll effect con debounce (listener pasivo) ----------
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  debounce(() => {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }, 10),
  { passive: true },
);

// ---------- Mobile menu toggle + accesibilidad ----------
function toggleMenu(btn) {
  const menu = document.getElementById("nav-menu");
  if (!menu) return;
  menu.classList.toggle("active");
  const expanded = menu.classList.contains("active");
  // actualiza aria en el botón si lo pasamos desde el HTML
  if (btn && btn.setAttribute)
    btn.setAttribute("aria-expanded", String(expanded));
}

function closeMenu() {
  const menu = document.getElementById("nav-menu");
  const toggle = document.querySelector(".menu-toggle");
  if (!menu) return;
  menu.classList.remove("active");
  if (toggle) toggle.setAttribute("aria-expanded", "false");
}

// Cerrar menú móvil al hacer clic fuera
document.addEventListener("click", (event) => {
  const nav = document.getElementById("nav-menu");
  const toggle = document.querySelector(".menu-toggle");
  if (!nav || !toggle) return;

  if (
    nav.classList.contains("active") &&
    !nav.contains(event.target) &&
    !toggle.contains(event.target)
  ) {
    closeMenu();
  }
});

// Cerrar con Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ---------- Manejo click en servicios ----------
function handleServiceClick(event) {
  const serviceCard = event.target.closest(".service");
  if (!serviceCard || event.target.closest(".service-details")) return;

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

// ---------- Recalcular al hacer resize (placeholder para futuros cálculos) ----------
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // sitio para futuros recalculos si los necesitas
  }, 250);
});
