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
