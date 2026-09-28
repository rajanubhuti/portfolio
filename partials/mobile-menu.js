/* Mobile menu: on phones the nav links collapse behind a burger button.
   Reads the links from the existing nav, so the homepage and header.js stay the single source.
   Styles live in partials/mobile-menu.css. */
(function () {
  function init() {
    var nav = document.querySelector('nav');
    var links = nav && nav.querySelector('.site-nav-links');
    if (!links) return;

    // Burger button
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mm-burger';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'mm-overlay');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);
    nav.classList.add('mm-ready');

    // Overlay
    var overlay = document.createElement('div');
    overlay.id = 'mm-overlay';
    overlay.className = 'mm-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    var hello = document.createElement('p');
    hello.className = 'mm-hello';
    hello.textContent = 'Where to? ✨';
    overlay.appendChild(hello);

    var list = document.createElement('div');
    list.className = 'mm-links';
    var here = location.href.replace(/[#?].*$/, '').replace(/index\.html$/, '');
    Array.prototype.forEach.call(links.querySelectorAll('a'), function (a) {
      var c = document.createElement('a');
      c.href = a.href;
      c.textContent = a.textContent.trim();
      if (a.target) { c.target = a.target; c.rel = a.rel; }
      if (c.href.replace(/index\.html$/, '') === here) c.className = 'is-current';
      list.appendChild(c);
    });
    overlay.appendChild(list);

    // Social links, copied from the nav's social buttons
    var social = document.createElement('div');
    social.className = 'mm-social';
    Array.prototype.forEach.call(nav.querySelectorAll('a[aria-label]'), function (a) {
      var svg = a.querySelector('svg');
      if (!svg) return;
      var c = document.createElement('a');
      c.href = a.href;
      c.setAttribute('aria-label', a.getAttribute('aria-label'));
      if (a.target) { c.target = a.target; c.rel = a.rel; }
      c.appendChild(svg.cloneNode(true));
      social.appendChild(c);
    });
    overlay.appendChild(social);
    // The site font is set on <main>, which the overlay sits outside of
    overlay.style.fontFamily = getComputedStyle(nav).fontFamily;
    document.body.appendChild(overlay);

    var root = document.documentElement;
    function setOpen(open) {
      if (open) {
        var r = btn.getBoundingClientRect();
        overlay.style.setProperty('--mm-x', (r.left + r.width / 2) + 'px');
        overlay.style.setProperty('--mm-y', (r.top + r.height / 2) + 'px');
      }
      root.classList.toggle('mm-open', open);
      document.body.classList.toggle('mm-lock', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    function isOpen() { return root.classList.contains('mm-open'); }

    btn.addEventListener('click', function () { setOpen(!isOpen()); });
    list.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) { setOpen(false); btn.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 640 && isOpen()) setOpen(false); });
    // Coming back with the browser's back button should show the page, not the open menu
    window.addEventListener('pageshow', function () { if (isOpen()) setOpen(false); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
