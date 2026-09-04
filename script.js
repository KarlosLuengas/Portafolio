// ========================================
// NAVEGACIÓN
// ========================================

// Cerrar menú móvil al hacer clic en un enlace
document.addEventListener('DOMContentLoaded', function () {
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

// ========================================
// CARRUSEL DE CLIENTES
// Un cliente por diapositiva. Se mueve con scroll horizontal + scroll-snap
// porque cada diapositiva contiene un carrusel de Bootstrap y Bootstrap no
// admite carruseles anidados. Los puntos se generan según las diapositivas
// que haya, así que basta con añadir <article class="clientes__slide"> nuevos.
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-clientes-carrusel]').forEach(carrusel => {
    const pista = carrusel.querySelector('.clientes__pista');
    const puntos = carrusel.querySelector('[data-clientes-puntos]');
    const slides = Array.from(carrusel.querySelectorAll('.clientes__slide'));
    const prev = carrusel.querySelector('[data-clientes-ir="prev"]');
    const next = carrusel.querySelector('[data-clientes-ir="next"]');

    if (!pista || slides.length === 0) return;

    const indiceActual = () => Math.round(pista.scrollLeft / pista.clientWidth);

    const irA = i => {
      const destino = Math.min(Math.max(i, 0), slides.length - 1);
      pista.scrollTo({ left: destino * pista.clientWidth, behavior: 'smooth' });
    };

    // Un punto por diapositiva
    const botones = slides.map((slide, i) => {
      const punto = document.createElement('button');
      punto.type = 'button';
      punto.className = 'clientes__punto';
      punto.setAttribute('aria-label', 'Ver cliente ' + (i + 1));
      punto.addEventListener('click', () => irA(i));
      puntos.appendChild(punto);
      return punto;
    });

    const sincronizar = () => {
      const activo = indiceActual();
      botones.forEach((punto, i) => {
        punto.setAttribute('aria-current', i === activo ? 'true' : 'false');
      });
      prev.disabled = activo === 0;
      next.disabled = activo === slides.length - 1;
    };

    prev.addEventListener('click', () => irA(indiceActual() - 1));
    next.addEventListener('click', () => irA(indiceActual() + 1));

    // El scroll dispara muchos eventos: se espera a que se detenga
    let temporizador;
    pista.addEventListener('scroll', () => {
      clearTimeout(temporizador);
      temporizador = setTimeout(sincronizar, 80);
    });

    window.addEventListener('resize', () => {
      clearTimeout(temporizador);
      temporizador = setTimeout(sincronizar, 150);
    });

    sincronizar();
  });
});
