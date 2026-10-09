/* Homepage project cards: quick details toggle, the takeover countdown and the TMS camera animation.
   Styles live in partials/project-cards.css. Animations only run while their card is on screen,
   and show a still frame for people who prefer reduced motion. */
(function () {
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canWatch = 'IntersectionObserver' in window;

  function whenVisible(el, start, stop) {
    if (!canWatch) { start(); return; }
    var on = false;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !on) { on = true; start(); }
        else if (!e.isIntersecting && on) { on = false; stop(); }
      });
    }, { threshold: 0.4 }).observe(el);
  }

  /* ---------- Quick details ---------- */
  document.querySelectorAll('.pc-more').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.pc-card');
      var open = card.classList.toggle('pc-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.querySelector('.pc-lbl').textContent = open ? 'Hide details' : 'Quick details';
    });
  });

  /* ---------- Countdown: red alert buzz, then 60 to 0 sliding from amber to red ---------- */
  (function () {
    var card = document.querySelector('.pc-count');
    if (!card) return;
    var num = card.querySelector('.pc-cd-num');
    var glow = card.querySelector('.pc-cd-glow');
    // three soft stops per end of the gradient: light, base and accent
    var AMBER = [[253, 231, 204], [251, 211, 161], [247, 165, 74]];
    var RED   = [[255, 214, 204], [246, 160, 150], [229, 72, 77]];
    var BUZZ = 1700, FADE = 500, COUNT = 9000;
    var raf = null, t0 = 0, phase = '';

    function paint(k) {
      ['--c3', '--c1', '--c2'].forEach(function (name, j) {
        var c = AMBER[j].map(function (v, i) { return Math.round(v + (RED[j][i] - v) * k); });
        card.style.setProperty(name, 'rgb(' + c.join(',') + ')');
      });
    }
    function buzz() {
      phase = 'buzz';
      card.classList.remove('pc-buzz'); void card.offsetWidth; card.classList.add('pc-buzz');
      paint(1);
      num.textContent = '0';
    }
    function frame(now) {
      var t = now - t0;
      if (t < BUZZ) {
        if (phase !== 'buzz') buzz();
      } else if (t < BUZZ + FADE) {
        paint(1 - (t - BUZZ) / FADE);
        if (phase !== 'fade') {
          phase = 'fade'; card.classList.remove('pc-buzz');
          num.textContent = '60';
        }
      } else if (t < BUZZ + FADE + COUNT) {
        phase = 'count';
        var p = (t - BUZZ - FADE) / COUNT;
        paint(Math.pow(p, 1.7));   // stays amber longer, reddens near the end
        num.textContent = String(Math.max(0, Math.ceil(60 * (1 - p))));
        var b = 0.9 + 0.1 * Math.sin(t / 600);
        glow.style.transform = 'scale(' + b.toFixed(3) + ')';
      } else {
        t0 = now; phase = '';                                      // back to the buzz
      }
      raf = requestAnimationFrame(frame);
    }
    if (still) { paint(0.3); num.textContent = '60'; return; }
    paint(0); num.textContent = '60';
    whenVisible(card,
      function () { t0 = performance.now(); phase = ''; raf = requestAnimationFrame(frame); },
      function () { cancelAnimationFrame(raf); card.classList.remove('pc-buzz'); });
  })();

  /* ---------- TMS: the camera follows a message being typed and answered ---------- */
  (function () {
    var card = document.querySelector('.pc-tms');
    if (!card) return;
    var stage = card.querySelector('.pc-stage');
    var W = 2396, H = 1654;
    var q = function (c) { return card.querySelector(c); };
    var bubble = q('.pc-bubble'), ring = q('.pc-ring'), ai = q('.pc-ai'), ticket = q('.pc-ticket');
    var cover = q('.pc-cover'), typed = q('.pc-typed'), send = q('.pc-send');
    var MSG = 'My VPN keeps on disconnecting on plant network';
    var ZT = 4.2;                               // zoom while typing
    var TYPE_START = 669 + (W / ZT) / 2 - 40;   // opens on the start of the message
    var cam = { x: W / 2, y: H / 2, z: 1 };
    var timers = [], typing = null, running = false;

    function place(ms) {
      var w = card.clientWidth, h = card.clientHeight;
      var k = (w / W) * cam.z;
      var tx = Math.min(0, Math.max(w - W * k, w / 2 - cam.x * k));
      var ty = Math.min(0, Math.max(h - H * k, h / 2 - cam.y * k));
      stage.style.transition = ms ? 'transform ' + ms + 'ms cubic-bezier(.65,0,.35,1)' : 'none';
      stage.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + k + ')';
    }
    function look(x, y, z, ms) { cam = { x: x, y: y, z: z }; place(ms); }
    function show(el, v) { el.classList.toggle('pc-in', v); }
    function at(t, fn) { timers.push(setTimeout(fn, t)); }
    function clear() { timers.forEach(clearTimeout); timers = []; clearInterval(typing); }
    function reset() {
      [bubble, ring, ai, ticket].forEach(function (el) { show(el, false); });
      ring.classList.remove('pc-thinking'); cover.classList.remove('pc-on'); send.classList.remove('pc-on');
      typed.textContent = ''; typed.classList.remove('pc-on');
      look(W / 2, H / 2, 1, 0);
    }
    function run() {
      clear(); reset();
      at(900,   function () { look(TYPE_START, 1578, ZT, 1200); });
      at(2100,  function () {
        cover.classList.add('pc-on'); typed.classList.add('pc-on');
        var i = 0;
        typing = setInterval(function () {
          typed.textContent = MSG.slice(0, ++i);
          var x = Math.max(TYPE_START, 669 + typed.scrollWidth - (W / ZT) * 0.17);
          if (x !== cam.x) look(x, 1578, ZT, 260);
          if (i >= MSG.length) clearInterval(typing);
        }, 48);
      });
      at(4700,  function () { send.classList.add('pc-on'); });
      at(5000,  function () { typed.textContent = ''; typed.classList.remove('pc-on'); cover.classList.remove('pc-on'); look(1990, 320, 2.2, 1000); });
      at(5600,  function () { show(bubble, true); });
      at(6700,  function () { look(780, 650, 1.7, 1100); });
      at(7200,  function () { show(ring, true); ring.classList.add('pc-thinking'); });
      at(8300,  function () { ring.classList.remove('pc-thinking'); show(ai, true); });
      at(9300,  function () { show(ticket, true); });
      at(10400, function () { look(1085, 797, 2.4, 900); });
      at(12000, function () { look(W / 2, H / 2, 1, 1200); });
      at(15000, function () { if (running) run(); });
    }

    if (window.ResizeObserver) new ResizeObserver(function () { place(0); }).observe(card);
    if (still) {
      [bubble, ring, ai, ticket].forEach(function (el) { el.style.transition = 'none'; show(el, true); });
      look(W / 2, H / 2, 1, 0);
      return;
    }
    reset();
    whenVisible(card,
      function () { running = true; run(); },
      function () { running = false; clear(); reset(); });
  })();

  /* LumiTrack card: the "common feedback noticed" prompt drops in, waits, and repeats while the card is on screen. */
  (function () {
    var card = document.querySelector('.pc-lumi');
    if (!card) return;
    var t = [];
    function clear() { t.forEach(clearTimeout); t = []; }
    function cycle() {
      t.push(setTimeout(function () { card.classList.add('pc-in'); }, 700));
      t.push(setTimeout(function () { card.classList.remove('pc-in'); }, 4700));
      t.push(setTimeout(cycle, 5600));
    }
    whenVisible(card, function () { clear(); cycle(); }, function () { clear(); card.classList.remove('pc-in'); });
  })();
})();
