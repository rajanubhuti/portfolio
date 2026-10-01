/* Homepage scroll reveals. Elements marked data-rv rise into place the first time they
   come into view. Styles live in partials/home.css. */
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('motion')) return;
  var els = document.querySelectorAll('[data-rv]');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('rv-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
  // never leave anything hidden: show whatever is still waiting after a while
  setTimeout(function () {
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('rv-in');
    });
  }, 2500);
})();
