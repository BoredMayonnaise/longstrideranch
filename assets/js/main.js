/* Long Stride Ranch — progressive enhancement only.
   Every page works with this file blocked; this adds polish. */

(function () {
  'use strict';

  window.__lsrReady = true;

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Theme toggle ---------------------------------------------------- */
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.dataset.theme || (systemDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('lsr-theme', next);
      } catch (e) {
        /* private mode — the choice just won't persist */
      }
    });
  }

  /* ---- Header shadow on scroll ---------------------------------------- */
  var header = document.getElementById('site-header');
  if (header) {
    var setScrolled = function () {
      header.dataset.scrolled = window.scrollY > 8 ? 'true' : 'false';
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  /* ---- Desktop dropdowns ---------------------------------------------- */
  var groups = Array.prototype.slice.call(document.querySelectorAll('[data-nav-group]'));

  function closeGroups(except) {
    groups.forEach(function (group) {
      if (group === except) return;
      group.dataset.open = 'false';
      var trigger = group.querySelector('[data-nav-trigger]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  groups.forEach(function (group) {
    var trigger = group.querySelector('[data-nav-trigger]');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      var open = group.dataset.open === 'true';
      closeGroups(group);
      group.dataset.open = open ? 'false' : 'true';
      trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    group.addEventListener('mouseenter', function () {
      closeGroups(group);
      group.dataset.open = 'true';
      trigger.setAttribute('aria-expanded', 'true');
    });
    group.addEventListener('mouseleave', function () {
      group.dataset.open = 'false';
      trigger.setAttribute('aria-expanded', 'false');
    });
    group.addEventListener('focusout', function (event) {
      if (!group.contains(event.relatedTarget)) {
        group.dataset.open = 'false';
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('[data-nav-group]')) closeGroups(null);
  });

  /* ---- Mobile drawer --------------------------------------------------- */
  var drawer = document.getElementById('drawer');
  var openBtn = document.getElementById('nav-open');
  var closeBtn = document.getElementById('nav-close');

  function setDrawer(open) {
    if (!drawer) return;
    drawer.dataset.open = open ? 'true' : 'false';
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open && closeBtn) closeBtn.focus();
    else if (!open && openBtn) openBtn.focus();
  }

  if (openBtn) openBtn.addEventListener('click', function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    closeGroups(null);
    if (drawer && drawer.dataset.open === 'true') setDrawer(false);
  });

  /* ---- Reveal on scroll ------------------------------------------------ */
  var revealables = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var delay = Math.min(i * 70, 280);
        setTimeout(function () { entry.target.classList.add('is-visible'); }, delay);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el) { observer.observe(el); });
  }

  /* ---- Count-up on the stat band -------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        countObserver.unobserve(el);

        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.countSuffix || '';
        var duration = 1100;
        var start = null;

        var tick = function (now) {
          if (start === null) start = now;
          var progress = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });

    Array.prototype.forEach.call(counters, function (el) { countObserver.observe(el); });
  }

  /* ---- Contact form ---------------------------------------------------- */
  /* No backend yet: hand the message to the visitor's mail client so nothing
     is silently dropped. Swap this for a POST when an endpoint exists. */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) return;
      event.preventDefault();

      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var lines = [
        'Name: ' + name,
        'Email: ' + (data.get('email') || ''),
        'Phone: ' + (data.get('phone') || ''),
        'Interested in: ' + (data.get('topic') || ''),
        '',
        (data.get('message') || '').toString()
      ];

      var href = 'mailto:danielle@longstrideranch.com'
        + '?subject=' + encodeURIComponent('Website inquiry from ' + (name || 'a visitor'))
        + '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = href;

      var status = document.getElementById('form-status');
      if (status) {
        status.hidden = false;
        status.textContent = 'Opening your email app with this message ready to send. '
          + 'If nothing happens, write to danielle@longstrideranch.com directly.';
      }
    });
  }

  /* ---- Footer year fallback ------------------------------------------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
