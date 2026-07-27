(function initWhyHilook() {
  const section = document.getElementById('why-hilook');
  if (!section) return;

  const stage = section.querySelector('#stage');
  const silk  = section.querySelector('.silk-bg');
  const shine = section.querySelector('.silk-shine');

  // Distance from center-logo at which charms drop
  const PROX_RADIUS = 260; // px

  let raf = 0;
  let pending = null;

  function onMove(e) {
    pending = e;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const evt = pending; pending = null;
      const rect = section.getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;

      // Silk ripple: update CSS vars driving the gradients
      const mxPct = (x / rect.width) * 100;
      const myPct = (y / rect.height) * 100;
      silk.style.setProperty('--mx', mxPct + '%');
      silk.style.setProperty('--my', myPct + '%');
      shine.style.background =
        `radial-gradient(240px 340px at ${x}px ${y}px, rgba(255,255,255,.45), transparent 70%)`;

      // Proximity to center logo
      const logo = stage.querySelector('.center-logo').getBoundingClientRect();
      const cx = logo.left + logo.width / 2 - rect.left;
      const cy = logo.top  + logo.height / 2 - rect.top;
      const dist = Math.hypot(x - cx, y - cy);

      stage.classList.toggle('is-active', dist < PROX_RADIUS);
    });
  }

  function onLeave() {
    stage.classList.remove('is-active');
    silk.style.setProperty('--mx', '50%');
    silk.style.setProperty('--my', '50%');
  }

  section.addEventListener('mousemove', onMove, { passive: true });
  section.addEventListener('mouseleave', onLeave);

  // Touch: tap the center to trigger the drop
  stage.addEventListener('click', () => {
    stage.classList.add('is-active');
    setTimeout(() => stage.classList.remove('is-active'), 2500);
  });
})();
