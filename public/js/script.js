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
    window.AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }
};

if ("requestIdleCallback" in window) {
  requestIdleCallback(initAOS, { timeout: 2000 });
} else {
  window.addEventListener("load", initAOS, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const navbar = document.getElementById("navbar");
  const menu = document.getElementById("nav-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const servicesSection = document.getElementById("services");
  const gallery = document.querySelector(".gallery-parallax");

  // ---------- Navbar scroll effect ----------
  const updateNavbarState = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  };

  updateNavbarState();

  window.addEventListener("scroll", debounce(updateNavbarState, 10), {
    passive: true,
  });

  // ---------- Mobile menu ----------
  const setMenuState = (isOpen) => {
    if (!menu || !menuToggle) return;

    menu.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú",
    );
  };

  const closeMenu = () => setMenuState(false);

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menu?.classList.contains("active");
      setMenuState(!isOpen);
    });
  }

  document.addEventListener("click", (event) => {
    if (!menu || !menuToggle) return;

    const clickInsideMenu = menu.contains(event.target);
    const clickOnToggle = menuToggle.contains(event.target);

    if (
      menu.classList.contains("active") &&
      !clickInsideMenu &&
      !clickOnToggle
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // ---------- Smooth scroll para anchors (respeta navbar) ----------
  const getOffset = () => -(nav ? nav.getBoundingClientRect().height + 10 : 80);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const y =
        target.getBoundingClientRect().top + window.scrollY + getOffset();

      window.scrollTo({ top: y, behavior: "smooth" });
      closeMenu();
    });
  });

  // ---------- Manejo de errores para imágenes ----------
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.onerror = null;
      img.classList.add("is-broken");
      img.setAttribute("aria-hidden", "true");
    });
  });

  // ---------- Servicios expandibles ----------
  const closeService = (service) => {
    if (!service) return;

    const panel = service.querySelector(".service-details");
    const button = service.querySelector(".expand-btn");
    const title =
      service.querySelector("h3")?.textContent?.trim() || "servicio";

    service.classList.remove("expanded");

    if (panel) {
      panel.style.maxHeight = "0px";
      panel.setAttribute("aria-hidden", "true");
    }

    if (button) {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute(
        "aria-label",
        `Expandir información sobre ${title.toLowerCase()}`,
      );
    }
  };

  const openService = (service) => {
    if (!service) return;

    const panel = service.querySelector(".service-details");
    const button = service.querySelector(".expand-btn");
    const title =
      service.querySelector("h3")?.textContent?.trim() || "servicio";

    service.classList.add("expanded");

    if (panel) {
      panel.setAttribute("aria-hidden", "false");
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }

    if (button) {
      button.setAttribute("aria-expanded", "true");
      button.setAttribute(
        "aria-label",
        `Contraer información sobre ${title.toLowerCase()}`,
      );
    }
  };

  const closeAllServices = (except = null) => {
    document.querySelectorAll(".service.expanded").forEach((service) => {
      if (service !== except) closeService(service);
    });
  };

  const handleServiceToggle = (serviceCard) => {
    if (!serviceCard) return;

    const isExpanded = serviceCard.classList.contains("expanded");

    closeAllServices(serviceCard);

    if (isExpanded) {
      closeService(serviceCard);
      return;
    }

    openService(serviceCard);

    if (window.innerWidth > 768) {
      requestAnimationFrame(() => {
        const yOffset = -100;
        const y =
          serviceCard.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      });
    }
  };

  if (servicesSection) {
    servicesSection.addEventListener("click", (event) => {
      const serviceCard = event.target.closest(".service");
      if (!serviceCard) return;

      if (event.target.closest(".service-details")) return;

      event.preventDefault();
      event.stopPropagation();

      handleServiceToggle(serviceCard);
    });
  }

  // Recalcular altura si cambia el viewport con una card abierta
  const syncExpandedPanels = () => {
    document.querySelectorAll(".service.expanded").forEach((service) => {
      const panel = service.querySelector(".service-details");
      if (!panel) return;
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
  };

  // ---------- Galería parallax ----------
  if (gallery) {
    const items = gallery.querySelectorAll(".gallery-item");

    items.forEach((item) => {
      item.style.willChange = "transform, opacity";
    });

    const updateGalleryParallax = () => {
      const galleryRect = gallery.getBoundingClientRect();
      const half = galleryRect.width / 2;
      const centerX = galleryRect.left + half;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const distance = Math.min(Math.abs(centerX - itemCenterX), half || 1);

        const scale = 1 - (distance / (half || 1)) * 0.15;
        const rotateY =
          (distance / (half || 1)) * 15 * (itemCenterX < centerX ? 1 : -1);
        const opacity = 1 - (distance / (half || 1)) * 0.4;

        item.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
        item.style.opacity = opacity;
      });
    };

    let ticking = false;

    const onGalleryScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        updateGalleryParallax();
        ticking = false;
      });
    };

    gallery.addEventListener("scroll", onGalleryScroll, { passive: true });

    if (items.length > 0) {
      const first = items[0];
      gallery.scrollLeft =
        first.offsetLeft - gallery.offsetWidth / 2 + first.offsetWidth / 2;
      updateGalleryParallax();
    }

    window.addEventListener(
      "resize",
      debounce(() => {
        updateGalleryParallax();
        syncExpandedPanels();
      }, 150),
    );
  } else {
    window.addEventListener("resize", debounce(syncExpandedPanels, 150));
  }
});
