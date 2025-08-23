// Inicializar AOS cuando se carga el DOM
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("active");
}

function closeMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.remove("active");
}

// Smooth scroll para enlaces anchor
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Toggle service details - FUNCIÓN PRINCIPAL CORREGIDA
function toggleService(serviceElement) {
  // Verificar que el elemento es válido
  if (!serviceElement || !serviceElement.classList) {
    console.error("Invalid service element");
    return;
  }
  
  const isCurrentlyExpanded = serviceElement.classList.contains("expanded");
  
  // Debug: mostrar qué servicio se está clickeando
  const serviceName = serviceElement.querySelector("h3")?.textContent || "Unknown";
  console.log("Clicking service:", serviceName, "Currently expanded:", isCurrentlyExpanded);
  
  // PRIMERO: Cerrar TODOS los servicios
  const allServices = document.querySelectorAll(".service");
  allServices.forEach((service) => {
    if (service.classList.contains("expanded")) {
      console.log("Closing service:", service.querySelector("h3")?.textContent);
      service.classList.remove("expanded");
    }
  });
  
  // SEGUNDO: Solo expandir el clickeado si no estaba expandido
  if (!isCurrentlyExpanded) {
    console.log("Expanding service:", serviceName);
    serviceElement.classList.add("expanded");
    
    // Scroll suave hacia el elemento en dispositivos grandes
    if (window.innerWidth > 768) {
      setTimeout(() => {
        serviceElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest"
        });
      }, 300);
    }
    
    // Track del evento
    trackServiceExpansion(serviceName);
  }
}

// FUNCIÓN ALTERNATIVA CON EVENT DELEGATION (más robusta)
document.addEventListener("DOMContentLoaded", function() {
  // Event delegation para evitar conflictos con múltiples listeners
  const servicesSection = document.getElementById("services");
  
  if (servicesSection) {
    // Remover cualquier listener previo para evitar duplicados
    servicesSection.removeEventListener("click", handleServiceClick);
    servicesSection.addEventListener("click", handleServiceClick);
  }
});

function handleServiceClick(event) {
  // Buscar el elemento .service más cercano
  const serviceCard = event.target.closest(".service");
  
  if (serviceCard && !event.target.closest(".service-details")) {
    // Prevenir que se ejecute el onclick del HTML también
    event.preventDefault();
    event.stopPropagation();
    
    const isCurrentlyExpanded = serviceCard.classList.contains("expanded");
    const serviceName = serviceCard.querySelector("h3")?.textContent || "Unknown";
    
    console.log("Event delegation - Clicking service:", serviceName);
    
    // Cerrar todas las tarjetas
    document.querySelectorAll(".service.expanded").forEach((service) => {
      service.classList.remove("expanded");
    });
    
    // Expandir solo la clickeada si no estaba expandida
    if (!isCurrentlyExpanded) {
      serviceCard.classList.add("expanded");
      trackServiceExpansion(serviceName);
      
      // Scroll suave en dispositivos grandes
      if (window.innerWidth > 768) {
        setTimeout(() => {
          serviceCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 300);
      }
    }
  }
}

// Parallax effect mejorado para galería
document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery-parallax");
  if (gallery) {
    let isScrolling = false;

    gallery.addEventListener("scroll", () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const items = gallery.querySelectorAll(".gallery-item");
          const galleryRect = gallery.getBoundingClientRect();
          const centerX = galleryRect.left + galleryRect.width / 2;

          items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(centerX - itemCenterX);
            const maxDistance = galleryRect.width / 2;

            // Calcular escala y rotación basada en la distancia del centro
            const scale = Math.max(0.85, 1 - (distance / maxDistance) * 0.3);
            const rotateY = (distance / maxDistance) * 15;
            const opacity = Math.max(0.6, 1 - (distance / maxDistance) * 0.4);

            item.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
            item.style.opacity = opacity;
          });
          isScrolling = false;
        });
      }
      isScrolling = true;
    });

    // Inicializar el efecto al cargar
    gallery.dispatchEvent(new Event("scroll"));
  }
});

// Lazy loading para imágenes
document.addEventListener("DOMContentLoaded", function () {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "1";
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll(".gallery-item, .about-image").forEach((img) => {
    imageObserver.observe(img);
  });
});

// Preload critical images
document.addEventListener("DOMContentLoaded", function () {
  const criticalImages = ["img/hero-bg.jpg", "img/about-image.jpg"];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
});

// Detectar si el usuario prefiere motion reducido
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Reducir animaciones para usuarios que prefieren menos movimiento
  document.documentElement.style.setProperty("--animation-duration", "0.1s");
}

// Analytics y tracking (placeholder para implementar)
function trackServiceExpansion(serviceName) {
  // Aquí se podría implementar tracking con Google Analytics
  console.log("Service expanded:", serviceName);
  
  // Ejemplo de tracking con Google Analytics (descomenta si usas GA4)
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', 'service_expand', {
  //     'event_category': 'Services',
  //     'event_label': serviceName,
  //     'value': 1
  //   });
  // }
}

// REMOVIDO: El listener duplicado de servicios que causaba el problema
// Antes tenías esto que duplicaba los eventos:
// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll(".service").forEach((service, index) => {
//     service.addEventListener("click", () => {
//       const serviceName = service.querySelector("h3").textContent;
//       trackServiceExpansion(serviceName);
//     });
//   });
// });

// Cerrar menú móvil al hacer clic fuera
document.addEventListener("click", function (event) {
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

// Optimización de rendimiento: debounce para scroll
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplicar debounce al scroll del navbar
const debouncedScroll = debounce(() => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}, 10);

window.addEventListener("scroll", debouncedScroll);

// Manejo de errores para imágenes
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('img, [style*="background-image"]');

  images.forEach((img) => {
    img.addEventListener("error", function () {
      console.log("Error loading image:", this.src || "background-image");
      // Aquí podrías poner una imagen placeholder
      // img.style.backgroundImage = "url('img/placeholder.jpg')";
    });
  });
});

// Función de debug para verificar el estado de los servicios
function debugServices() {
  console.log("=== DEBUG SERVICES ===");
  const services = document.querySelectorAll(".service");
  services.forEach((service, index) => {
    const title = service.querySelector("h3")?.textContent || `Service ${index}`;
    const isExpanded = service.classList.contains("expanded");
    console.log(`${title}: ${isExpanded ? "EXPANDED" : "collapsed"}`);
  });
  console.log("=====================");
}

// Función para resetear todos los servicios (útil para debug)
function resetServices() {
  document.querySelectorAll(".service.expanded").forEach((service) => {
    service.classList.remove("expanded");
  });
  console.log("All services reset to collapsed state");
}

// Inicialización final - asegurar estado limpio
document.addEventListener("DOMContentLoaded", function () {
  // Asegurar que todos los servicios empiecen colapsados
  setTimeout(() => {
    resetServices();
    console.log("Services initialized - all collapsed");
  }, 100);
  
  // Debug: mostrar cuántos servicios se encontraron
  const serviceCount = document.querySelectorAll(".service").length;
  console.log(`Found ${serviceCount} service cards`);
});

// Manejo de resize para recalcular alturas expandidas
let resizeTimeout;
window.addEventListener("resize", function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Recalcular cualquier servicio expandido después del resize
    const expandedServices = document.querySelectorAll(".service.expanded");
    if (expandedServices.length > 0) {
      console.log(`Recalculating ${expandedServices.length} expanded services after resize`);
    }
  }, 250);
});