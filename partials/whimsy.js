/* Plays the small animations in partials/whimsy.css.
   Hover (or tap on phones) replays an element's animation from the start.
   data-play-on="load" plays once on page load; data-play-on="view" plays once when scrolled into view. */
(function () {
  function play(el) {
    el.classList.remove('is-playing');
    void el.offsetWidth; // restart the animation
    el.classList.add('is-playing');
  }
  function init() {
    var els = document.querySelectorAll('[data-play]');
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { play(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.8 }) : null;
    els.forEach(function (el) {
      el.addEventListener('mouseenter', function () { if (!el.classList.contains('is-playing')) play(el); });
      el.addEventListener('touchstart', function () { play(el); }, { passive: true });
      el.addEventListener('animationend', function () { el.classList.remove('is-playing'); });
      var on = el.getAttribute('data-play-on');
      if (on === 'load') setTimeout(function () { play(el); }, 600);
      if (on === 'view') { io ? io.observe(el) : play(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
