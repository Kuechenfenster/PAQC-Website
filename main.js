/* PAQ-Consultancy — site interactions */

(() => {
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.getElementById('nav-links');

  /* --- nav backdrop on scroll --- */
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- mobile menu --- */
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- scroll reveal --- */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in'));
  }

  /* --- contact form → mailto (static site, no backend) --- */
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = `Enquiry from ${data.get('name') || 'website visitor'}${data.get('sector') ? ' — ' + data.get('sector') : ''}`;
      const body = [
        `Name: ${data.get('name') || ''}`,
        `Company: ${data.get('company') || ''}`,
        `Email: ${data.get('email') || ''}`,
        `Area of interest: ${data.get('sector') || ''}`,
        '',
        data.get('message') || '',
      ].join('\n');
      const note = form.querySelector('[data-form-note]');
      if (note) note.hidden = false;
      window.location.href =
        `mailto:info@paqc.biz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
