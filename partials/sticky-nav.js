/* Sticky nav: once you've scrolled down a page, scrolling back up even a little brings a
   compact copy of the nav down from the top, so Home and the other links are always one
   flick away. It hides again while you scroll down or when you're back at the top. */
(function () {
  var CSS = ".sticky-nav { position: fixed; left: 0; right: 0; top: 0; z-index: 60; background: rgba(248,248,248,.94); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-bottom: 1px solid rgba(24,25,31,.08); transform: translateY(-110%); transition: transform .35s cubic-bezier(.22,1,.36,1); }\n.sticky-nav.is-on { transform: none; }\n.sticky-nav nav { padding-top: 12px !important; padding-bottom: 12px !important; }\n.sticky-nav nav > a:first-child img { height: 48px !important; }\n.sticky-nav .nav-social-btn { padding: 10px !important; }\n.sticky-nav .nav-social-btn svg { width: 20px; height: 20px; }\n@media (max-width: 640px) {\n  .sticky-nav nav { flex-direction: row !important; padding-top: 8px !important; padding-bottom: 8px !important; }\n  .sticky-nav nav > a:first-child { display: none; }\n  .sticky-nav .site-nav-links { margin: 0 auto; }\n  .sticky-nav nav > * + * { margin-top: 0 !important; }\n}\n@media (prefers-reduced-motion: reduce) { .sticky-nav { transition: none; } }";
  var nav = document.querySelector('nav');
  if (!nav) return;
  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);
  var bar = document.createElement('div');
  bar.className = 'sticky-nav';
  bar.setAttribute('aria-hidden', 'true');
  var copy = nav.cloneNode(true);
  copy.removeAttribute('id');
  copy.querySelectorAll('[id]').forEach(function (el) { el.removeAttribute('id'); });
  var logo = copy.querySelector('img');
  if (logo) logo.style.setProperty('height', '48px', 'important');
  bar.appendChild(copy);
  document.body.appendChild(bar);
  bar.querySelectorAll('a, button').forEach(function (el) { el.tabIndex = -1; });

  var lastY = window.pageYOffset, shown = false, ticking = false;
  function set(on) {
    if (on === shown) return;
    shown = on;
    bar.classList.toggle('is-on', on);
    bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    bar.querySelectorAll('a').forEach(function (el) { el.tabIndex = on ? 0 : -1; });
  }
  function update() {
    var y = window.pageYOffset, dy = y - lastY;
    if (y < 300) set(false);
    else if (dy < -6) set(true);
    else if (dy > 6) set(false);
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
})();
