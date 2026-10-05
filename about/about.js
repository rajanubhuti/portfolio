/* About page: reveal sections as they scroll into view. */
(function () {
  var els = document.querySelectorAll('[data-rv]');
  if (!document.documentElement.classList.contains('motion') || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('rv-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  els.forEach(function (el) { io.observe(el); });
})();

/* How I work: tabs, with arrow keys moving between them. */
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.ab-tabs [role="tab"]'));
  if (!tabs.length) return;
  function select(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on ? 'true' : 'false');
      x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) t.focus();
    t.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); select(tabs[(i + 1) % tabs.length], true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select(tabs[(i - 1 + tabs.length) % tabs.length], true); }
    });
  });
})();

/* Skills: number the chips in each row so they can pop in one after another. */
(function () {
  document.querySelectorAll('.ab-chips').forEach(function (ul) {
    Array.prototype.forEach.call(ul.children, function (li, i) { li.style.setProperty('--i', i); });
  });
})();

