(function () {
  'use strict';

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ── Hero entrance ─────────────────────────────────────────────── */
  function initHeroEntrance() {
    if (prefersReducedMotion()) return;

    var lines = document.querySelectorAll('.hero-title__line');
    var lede  = document.querySelector('.hero__lede');
    var actions = document.querySelector('.hero__actions');
    var portrait = document.querySelector('.hero__portrait');

    lines.forEach(function (line, i) {
      line.style.opacity = '0';
      line.style.transform = 'translateY(32px)';
      line.style.transition = 'opacity 700ms var(--ease-out), transform 700ms var(--ease-out)';
      line.style.transitionDelay = (80 + i * 120) + 'ms';
    });

    if (lede) {
      lede.style.opacity = '0';
      lede.style.transform = 'translateY(16px)';
      lede.style.transition = 'opacity 600ms var(--ease-out), transform 600ms var(--ease-out)';
      lede.style.transitionDelay = '480ms';
    }

    if (actions) {
      actions.style.opacity = '0';
      actions.style.transform = 'translateY(12px)';
      actions.style.transition = 'opacity 600ms var(--ease-out), transform 600ms var(--ease-out)';
      actions.style.transitionDelay = '600ms';
    }

    if (portrait) {
      portrait.style.opacity = '0';
      portrait.style.transform = 'translateX(20px) scale(0.97)';
      portrait.style.transition = 'opacity 800ms var(--ease-out), transform 800ms var(--ease-out)';
      portrait.style.transitionDelay = '200ms';
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        lines.forEach(function (line) {
          line.style.opacity = '1';
          line.style.transform = 'none';
        });
        if (lede)    { lede.style.opacity = '1';    lede.style.transform = 'none'; }
        if (actions) { actions.style.opacity = '1'; actions.style.transform = 'none'; }
        if (portrait){ portrait.style.opacity = '1'; portrait.style.transform = 'none'; }
      });
    });
  }

  /* ── Project card magnetic hover ──────────────────────────────── */
  function initProjectHover() {
    if (prefersReducedMotion()) return;

    document.querySelectorAll('.project__media').forEach(function (fig) {
      fig.addEventListener('mousemove', function (e) {
        var rect = fig.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
        var y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
        fig.style.transform = 'translateY(-3px) rotateX(' + (-y) + 'deg) rotateY(' + x + 'deg)';
        fig.style.transition = 'transform 80ms linear';
      });

      fig.addEventListener('mouseleave', function () {
        fig.style.transform = '';
        fig.style.transition = 'transform 500ms var(--ease-out)';
      });
    });
  }

  /* ── Boot ──────────────────────────────────────────────────────── */
  function init() {
    initHeroEntrance();
    initProjectHover();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
