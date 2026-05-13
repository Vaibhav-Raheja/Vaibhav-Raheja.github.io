(function () {
  'use strict';

  function h(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        const value = attrs[key];
        if (value === undefined || value === null) return;
        if (key === 'class') el.className = value;
        else if (key === 'text') el.textContent = value;
        else if (key === 'html') el.innerHTML = value;
        else el.setAttribute(key, value);
      });
    }
    if (children !== undefined && children !== null) {
      (Array.isArray(children) ? children : [children]).forEach(function (child) {
        if (child === undefined || child === null) return;
        el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
      });
    }
    return el;
  }

  function pad2(number) {
    return number < 10 ? '0' + number : String(number);
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      // Theme still changes for the current page if storage is unavailable.
    }
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();
    if (stored === 'dark' || stored === 'light') return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }

  function applyTheme(theme) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);

    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const isDark = nextTheme === 'dark';
    toggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
    toggle.setAttribute('aria-label', isDark ? 'Use light mode' : 'Use dark mode');
    const label = toggle.querySelector('.theme-toggle__text');
    if (label) label.textContent = isDark ? 'Light' : 'Dark';
  }

  function initTheme() {
    applyTheme(getPreferredTheme());

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        setStoredTheme(next);
      });
    }

    if (window.matchMedia) {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = function () {
        if (!getStoredTheme()) applyTheme(media.matches ? 'dark' : 'light');
      };
      if (media.addEventListener) media.addEventListener('change', onChange);
      else if (media.addListener) media.addListener(onChange);
    }
  }

  function splitHeroTitleIntoWords() {
    const title = document.getElementById('hero-title');
    if (!title || title.dataset.wordsSplit === 'true') return;

    const lines = title.querySelectorAll('.hero-title__line');
    let wordIndex = 0;

    lines.forEach(function (line) {
      const cursor = line.querySelector('.hero-cursor');
      if (cursor) cursor.remove();

      const words = line.textContent.trim().split(/\s+/).filter(Boolean);
      line.innerHTML = '';

      words.forEach(function (word, i) {
        const span = document.createElement('span');
        span.className = 'hero-title__word';
        span.style.setProperty('--word-index', wordIndex);
        span.textContent = word + (i < words.length - 1 ? ' ' : '');
        line.appendChild(span);
        wordIndex += 1;
      });

      if (cursor) line.appendChild(cursor);
    });

    title.dataset.wordsSplit = 'true';
  }

  function renderHero() {
    const personal = portfolioData.personal;
    const contact = portfolioData.contact;

    splitHeroTitleIntoWords();

    const lede = document.getElementById('hero-lede');
    if (lede) lede.textContent = personal.heroLede;

    const actions = document.getElementById('hero-actions');
    if (actions) {
      actions.innerHTML = '';
      actions.appendChild(h('a', { href: '#work', class: 'button button--primary' }, 'View selected work'));
      actions.appendChild(h('a', { href: contact.resume, class: 'button', target: '_blank', rel: 'noopener' }, 'Resume'));
      actions.appendChild(h('a', { href: contact.github, class: 'button', target: '_blank', rel: 'noopener' }, 'GitHub'));
      actions.appendChild(h('a', { href: 'mailto:' + contact.email, class: 'button' }, 'Email'));
    }

  }

  function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const intro = document.getElementById('work-intro');
    if (intro) intro.textContent = portfolioData.personal.workIntro;

    container.innerHTML = '';
    const total = portfolioData.featuredProjects.length;

    portfolioData.featuredProjects.forEach(function (project, index) {
      const notesId = 'notes-' + project.id;

      const meta = h('div', { class: 'project__meta' }, [
        h('span', { text: project.year }),
        h('span', { text: project.category }),
        h('span', { text: project.role })
      ]);

      const facts = h('ul', { class: 'fact-row', 'aria-label': 'Project facts' },
        project.facts.map(function (fact) {
          return h('li', { text: fact });
        })
      );

      const stack = h('p', { class: 'project__stack' }, [
        h('span', { text: 'Stack: ' }),
        document.createTextNode(project.stack.join(' / '))
      ]);

      const actions = h('div', { class: 'project__actions' });
      const toggle = h('button', {
        class: 'text-button',
        type: 'button',
        'aria-expanded': 'false',
        'aria-controls': notesId,
        'data-toggle': notesId
      }, 'Open engineering notes');
      actions.appendChild(toggle);

      if (project.links && project.links.length) {
        project.links.forEach(function (link) {
          actions.appendChild(h('a', {
            href: link.url,
            class: 'project__link',
            target: '_blank',
            rel: 'noopener'
          }, link.label));
        });
      }

      const mediaAttrs = {
        class: project.gif ? 'project__media project__media--gif' : 'project__media',
        'data-project-media': project.id
      };
      if (project.gif) {
        mediaAttrs.tabindex = '0';
        mediaAttrs['aria-label'] = 'Preview animation for ' + project.title;
      }

      let mediaEl;
      if (project.video) {
        const vid = document.createElement('video');
        vid.autoplay = true;
        vid.loop = true;
        vid.muted = true;
        vid.setAttribute('playsinline', '');
        vid.setAttribute('width', '1200');
        vid.setAttribute('height', '675');
        if (project.image) vid.poster = project.image;
        const src = document.createElement('source');
        src.src = project.video;
        src.type = 'video/mp4';
        vid.appendChild(src);
        mediaEl = vid;
      } else {
        const imageAttrs = {
          src: project.image,
          alt: project.imageAlt || project.title,
          loading: index === 0 ? 'eager' : 'lazy',
          width: '1200',
          height: '675',
          'data-still': project.image
        };
        if (project.gif) imageAttrs['data-gif'] = project.gif;
        mediaEl = h('img', imageAttrs);
      }

      const mediaChildren = [
        mediaEl,
        project.gif ? h('span', { class: 'project__preview-label', text: 'Preview GIF' }) : null,
        h('figcaption', { text: project.category + ' / ' + project.year })
      ];

      const article = h('article', { class: 'project', id: project.id, 'data-project-id': project.id }, [
        h('div', { class: 'project__number', text: pad2(index + 1) + ' / ' + pad2(total) }),
        h('div', { class: 'project__body' }, [
          meta,
          h('h3', {}, [
            h('a', { href: '#' + notesId, 'data-open-notes': notesId }, project.title)
          ]),
          h('p', { class: 'project__outcome', text: project.outcome }),
          h('p', { class: 'project__summary', text: project.summary }),
          facts,
          stack,
          actions,
          buildEngineeringNotes(project, notesId)
        ]),
        h('figure', mediaAttrs, mediaChildren)
      ]);

      container.appendChild(article);
    });
  }

  function buildEngineeringNotes(project, id) {
    const notes = project.notes;
    const panel = h('div', {
      class: 'notes',
      id: id,
      'data-open': 'false'
    });

    function block(label, content) {
      panel.appendChild(h('section', { class: 'notes__block' }, [
        h('h4', { text: label }),
        content
      ]));
    }

    block('Problem', h('p', { text: notes.problem }));
    block('Constraints', h('ul', {}, notes.constraints.map(function (item) {
      return h('li', { text: item });
    })));
    block('My role', h('p', { text: notes.role }));
    block('System approach', h('p', { text: notes.approach }));
    block('Tradeoffs', h('ul', {}, notes.tradeoffs.map(function (item) {
      return h('li', { text: item });
    })));
    block('Outcome', h('ul', {}, notes.outcome.map(function (item) {
      return h('li', { text: item });
    })));

    return panel;
  }

  function renderExperience() {
    const container = document.getElementById('experience-container');
    if (!container) return;

    container.innerHTML = '';
    portfolioData.experience.forEach(function (item, index) {
      const detailsId = 'experience-' + index;
      const body = h('div', { class: 'timeline__body' }, [
        h('h3', {}, [
          document.createTextNode(item.role),
          item.current ? h('span', { class: 'current-label', text: 'Current' }) : null
        ]),
        h('p', { class: 'timeline__company', text: item.company + ' / ' + item.location }),
        h('p', { class: 'timeline__summary', text: item.summary })
      ]);

      if (item.details && item.details.length) {
        body.appendChild(h('button', {
          class: 'text-button text-button--small',
          type: 'button',
          'aria-expanded': 'false',
          'aria-controls': detailsId,
          'data-toggle': detailsId
        }, 'Show responsibility'));
        body.appendChild(h('ul', {
          class: 'timeline__details',
          id: detailsId,
          'data-open': 'false'
        }, item.details.map(function (detail) {
          return h('li', { text: detail });
        })));
      }

      container.appendChild(h('article', { class: 'timeline__item' }, [
        h('p', { class: 'timeline__period', text: item.period }),
        body
      ]));
    });
  }

  function renderCapabilities() {
    const container = document.getElementById('capabilities-container');
    if (!container) return;

    container.innerHTML = '';
    portfolioData.capabilities.forEach(function (capability) {
      container.appendChild(h('div', { class: 'capability' }, [
        h('dt', { text: capability.title }),
        h('dd', { text: capability.items })
      ]));
    });
  }

  function renderAbout() {
    const container = document.getElementById('about-container');
    if (!container) return;

    container.innerHTML = '';
    container.appendChild(h('figure', { class: 'about__photo' }, [
      h('img', {
        src: portfolioData.personal.photo,
        alt: 'Portrait of Vaibhav Raheja',
        loading: 'lazy',
        width: '640',
        height: '800'
      })
    ]));

    container.appendChild(h('div', { class: 'about__copy' },
      portfolioData.personal.about.map(function (paragraph) {
        return h('p', { text: paragraph });
      })
    ));
  }

  function renderLabs() {
    const container = document.getElementById('labs-container');
    if (!container || !portfolioData.sideProjects) return;

    container.innerHTML = '';
    portfolioData.sideProjects.forEach(function (project) {
      const stack = h('ul', { class: 'lab-card__stack' },
        project.stack.map(function (tech) {
          return h('li', { text: tech });
        })
      );

      const children = [
        h('div', { class: 'lab-card__meta' }, [
          h('span', { text: project.year }),
          h('span', { 'aria-hidden': 'true', text: '/' }),
          h('span', { text: project.category })
        ]),
        h('h3', { class: 'lab-card__title', text: project.title }),
        h('p', { class: 'lab-card__desc', text: project.description }),
        stack
      ];

      if (project.link) {
        children.push(h('a', {
          class: 'lab-card__link',
          href: project.link,
          target: '_blank',
          rel: 'noopener'
        }, 'GitHub →'));
      }

      container.appendChild(h('article', { class: 'lab-card', id: 'lab-' + project.id }, children));
    });
  }

  function renderContact() {
    const contact = portfolioData.contact;

    const intro = document.getElementById('contact-intro');
    if (intro) {
      intro.textContent = 'Email is the fastest path. I am interested in robotics roles and collaborations involving autonomy, perception, field deployment, and hardware-software integration.';
    }

    const links = document.getElementById('contact-links');
    if (links) {
      links.innerHTML = '';
      links.appendChild(h('a', { href: 'mailto:' + contact.email }, contact.email));
      links.appendChild(h('a', { href: contact.linkedin, target: '_blank', rel: 'noopener' }, 'LinkedIn'));
      links.appendChild(h('a', { href: contact.github, target: '_blank', rel: 'noopener' }, 'GitHub'));
      links.appendChild(h('a', { href: contact.resume, target: '_blank', rel: 'noopener' }, 'Resume'));
    }

    const year = document.getElementById('footer-year');
    if (year) year.textContent = new Date().getFullYear();

    const meta = document.getElementById('footer-meta');
    if (meta) meta.textContent = '';
  }

  function initToggles() {
    document.addEventListener('click', function (event) {
      const toggle = event.target.closest('[data-toggle]');
      if (!toggle) {
        const noteLink = event.target.closest('[data-open-notes]');
        if (!noteLink) return;
        event.preventDefault();
        openPanel(noteLink.getAttribute('data-open-notes'));
        return;
      }

      const id = toggle.getAttribute('data-toggle');
      const panel = document.getElementById(id);
      if (!panel) return;

      const open = panel.getAttribute('data-open') === 'true';
      setPanelState(panel, toggle, !open);
    });
  }

  function openPanel(id) {
    const panel = document.getElementById(id);
    const toggle = document.querySelector('[data-toggle="' + id + '"]');
    if (!panel) return;
    setPanelState(panel, toggle, true);
    panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function setPanelState(panel, toggle, open) {
    panel.setAttribute('data-open', open ? 'true' : 'false');
    const project = panel.closest('.project');
    if (project && panel.classList.contains('notes')) {
      if (open) setProjectPreview(project, true);
      else setProjectPreview(project, false);
    }
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (toggle.classList.contains('text-button--small')) {
      toggle.textContent = open ? 'Hide responsibility' : 'Show responsibility';
    } else {
      toggle.textContent = open ? 'Close engineering notes' : 'Open engineering notes';
    }
  }

  function setProjectPreview(project, active) {
    if (!project || prefersReducedMotion()) return;
    const media = project.querySelector('.project__media');
    const image = project.querySelector('.project__media img[data-gif]');
    if (!media || !image) return;

    if (active) {
      image.src = image.getAttribute('data-gif');
      media.setAttribute('data-previewing', 'true');
      return;
    }

    const notesOpen = project.querySelector('.notes[data-open="true"]');
    const isInteracting = media.matches(':hover') || media.matches(':focus-within');
    if (!notesOpen && !isInteracting) {
      image.src = image.getAttribute('data-still');
      media.removeAttribute('data-previewing');
    }
  }

  function initProjectMedia() {
    document.querySelectorAll('.project').forEach(function (project) {
      const media = project.querySelector('.project__media--gif');
      if (!media) return;

      media.addEventListener('pointerenter', function () {
        setProjectPreview(project, true);
      });
      media.addEventListener('pointerleave', function () {
        setProjectPreview(project, false);
      });
      media.addEventListener('focusin', function () {
        setProjectPreview(project, true);
      });
      media.addEventListener('focusout', function () {
        window.setTimeout(function () {
          setProjectPreview(project, false);
        }, 0);
      });
    });
  }

  function initRevealMotion() {
    const targets = Array.prototype.slice.call(document.querySelectorAll(
      '.hero, .section, .project, .timeline__item, .capability, .about, .contact'
    ));

    document.documentElement.classList.add('motion-ready');
    targets.forEach(function (target, index) {
      target.classList.add('reveal-target');
      target.style.setProperty('--reveal-index', index % 8);
      if (target.id === 'contact' || target.classList.contains('contact')) {
        target.classList.add('is-visible');
      }
    });

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach(function (target) { target.classList.add('is-visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px 12% 0px',
      threshold: 0.05
    });

    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const update = function () {
      header.setAttribute('data-scrolled', window.scrollY > 10 ? 'true' : 'false');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initActiveNav() {
    if (!('IntersectionObserver' in window)) return;

    const links = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
    const sections = Array.prototype.slice.call(document.querySelectorAll('#work, #experience, #systems, #about, #labs, #contact'));
    if (!links.length || !sections.length) return;

    function setActive(id) {
      links.forEach(function (link) {
        if (link.getAttribute('data-nav') === id) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, {
      rootMargin: '-35% 0px -55% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    renderHero();
    renderProjects();
    renderExperience();
    renderCapabilities();
    renderAbout();
    renderLabs();
    renderContact();
    initToggles();
    initProjectMedia();
    initRevealMotion();
    initHeader();
    initActiveNav();
  });
})();
