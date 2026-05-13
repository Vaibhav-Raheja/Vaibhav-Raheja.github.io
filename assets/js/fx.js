(function () {
  'use strict';

  /* ── Scroll reveal ─────────────────────────────────────────────── */
  function initScrollReveal() {
    if (!window.IntersectionObserver) return;

    // Mark elements to reveal
    var targets = [
      '.section__header',
      '.timeline__item',
      '.project',
      '.capability-list dt',
      '.capability-list dd',
      '.about',
      '.contact',
      '.site-footer',
    ];

    var els = document.querySelectorAll(targets.join(','));
    els.forEach(function (el) {
      el.classList.add('will-reveal');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Hero entrance ─────────────────────────────────────────────── */
  function initHeroEntrance() {
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
    initScrollReveal();
    initProjectHover();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
