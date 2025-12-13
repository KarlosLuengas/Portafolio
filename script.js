// ========================================
// SCROLL ANIMATIONS
// ======================================== 

/**
 * Observa los elementos y agrega la clase 'active' cuando aparecen en el viewport
 */
function scrollReveal() {
  const reveals = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(element => {
    observer.observe(element);
  });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', scrollReveal);

// ========================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ======================================== 

/**
 * Cierra el menú móvil al hacer clic en un enlace
 */
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true
        });
      }
    });
  });
});
