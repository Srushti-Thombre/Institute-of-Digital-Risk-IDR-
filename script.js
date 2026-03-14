(() => {
  const header = document.querySelector('.site-header');
  const form = document.getElementById('interestForm');

  // Scroll-reveal animations (respects prefers-reduced-motion via CSS).
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (revealEls.length > 0) {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReduced) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target instanceof HTMLElement) && entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
      );

      revealEls.forEach((el) => io.observe(el));
    }
  }

  // Enhance smooth-scrolling with sticky-header offset for older browsers.
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const link = target.closest('a[href^="#"]');
    if (!(link instanceof HTMLAnchorElement)) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const el = document.querySelector(href);
    if (!(el instanceof HTMLElement)) return;

    event.preventDefault();

    const headerH = header instanceof HTMLElement ? header.offsetHeight : 0;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH - 12;

    window.scrollTo({ top, behavior: 'smooth' });
  });

  if (form instanceof HTMLFormElement) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Keep UX minimal: rely on native validation.
      if (!form.reportValidity()) return;
      form.reset();
    });
  }
})();
