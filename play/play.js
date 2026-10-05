/* Play page: builds the photo board, scatters the Polaroids, lets you drag them on desktop,
   filters by country and opens a photo large. Styles live in play.css. */
(function () {
  // [file name, caption, country, month taken, width, height]
  var PHOTOS = [
    ["orleans-first-sunset", "First sunset in Orléans", "France", "Jan 2026", 2252, 4000],
    ["sagrada-familia", "Sagrada Família, Barcelona", "Spain", "", 2304, 4096],
    ["brussels-stickers", "Stickers, Brussels", "Belgium", "", 2303, 4096],
    ["etretat", "Étretat", "France", "Apr 2026", 4000, 2252],
    ["me-barcelona-cathedral", "Me at Barcelona Cathedral", "Spain", "May 2026", 2096, 2442],
    ["eiffel-first-solo", "First solo trip to Paris", "France", "Mar 2026", 2252, 4000],
    ["spray-paint-madrid", "Spray paint, Madrid", "Spain", "", 2304, 4096],
    ["jeanne-darc-1", "Fêtes de Jeanne d'Arc, Orléans", "France", "Apr 2026", 3650, 5476],
    ["manneken-pis", "Manneken Pis, Brussels", "Belgium", "", 2304, 4096],
    ["cliff-monet", "The cliff Monet painted, Étretat", "France", "Apr 2026", 4000, 2252],
    ["trying-cyanotype", "Trying cyanotype", "France", "Jan 2026", 2252, 4000],
    ["bernabeu", "Santiago Bernabéu, Madrid", "Spain", "", 2303, 4096],
    ["paris-arcades", "Arcades, Paris", "France", "Mar 2026", 1179, 2096],
    ["brussels-posters", "Posters, Brussels", "Belgium", "", 3072, 4096],
    ["loire-river", "The Loire, Orléans", "France", "", 3072, 4096],
    ["barcelona-street", "Barcelona", "Spain", "", 2304, 4096],
    ["orleans-cathedral", "Orléans Cathedral", "France", "Apr 2026", 2252, 4000],
    ["f1-gallery-paris", "F1 gallery, Paris", "France", "", 1677, 2981],
    ["brussels", "Brussels", "Belgium", "", 2297, 4083],
    ["jeanne-darc-2", "Fêtes de Jeanne d'Arc, Orléans", "France", "May 2026", 3856, 5784],
    ["madhubani-tattoo", "My tattoo, designed from a Madhubani painting", "India", "Jun 2026", 2304, 4096]
  ];

  var board = document.getElementById('pl-board');
  var box = document.getElementById('pl-box');
  var boxImg = box.querySelector('.pl-box-img');
  var boxText = box.querySelector('.pl-box-text');
  var boxDate = box.querySelector('.pl-box-date');
  var desktop = window.matchMedia('(min-width: 900px)');
  var filter = 'All', seed = 7, zTop = 10, openIndex = -1;

  // small seeded random, so the layout is the same on every visit until you shuffle
  function rng(s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }

  /* ---- Build the Polaroids ---- */
  var cards = PHOTOS.map(function (p, i) {
    var fig = document.createElement('figure');
    fig.className = 'pl-card';
    fig.tabIndex = 0;
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-label', 'Open photo: ' + p[1]);
    fig.style.setProperty('--ar', p[4] + ' / ' + p[5]);
    var img = document.createElement('img');
    img.src = 'img/' + p[0] + '-s.webp';
    img.alt = p[1];
    img.loading = i < 8 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.width = p[4] > p[5] ? 640 : Math.round(640 * p[4] / p[5]);
    img.height = p[4] > p[5] ? Math.round(640 * p[5] / p[4]) : 640;
    var cap = document.createElement('figcaption');
    cap.textContent = p[1];
    if (p[3]) { var d = document.createElement('small'); d.textContent = p[3]; cap.appendChild(d); }
    fig.appendChild(img); fig.appendChild(cap);
    fig._i = i;
    board.appendChild(fig);
    return fig;
  });

  function visible() { return cards.filter(function (c) { return filter === 'All' || PHOTOS[c._i][2] === filter; }); }

  /* ---- Scatter: loose columns with a little jitter and tilt ---- */
  function layout(animate) {
    var r = rng(seed);
    cards.forEach(function (c) { c.classList.toggle('pl-out', !(filter === 'All' || PHOTOS[c._i][2] === filter)); });
    var list = visible();
    if (!desktop.matches) {
      board.style.height = '';
      list.forEach(function (c) { c.style.setProperty('--r', ((r() - 0.5) * 6).toFixed(2) + 'deg'); });
      return;
    }
    var W = board.clientWidth;
    var cardW = Math.max(160, Math.min(205, W / 6.2));
    var n = Math.max(3, Math.floor((W - 40) / (cardW * 1.08)));
    var colW = (W - 40) / n;
    var heights = []; for (var k = 0; k < n; k++) heights.push(36 + r() * 36);
    list.forEach(function (c) { c.style.setProperty('--w', cardW + 'px'); });
    list.forEach(function (c) {
      var h = c.offsetHeight;                               // real height, caption included
      var col = 0; for (var k = 1; k < n; k++) if (heights[k] < heights[col]) col = k;
      var x = 20 + col * colW + (colW - cardW) / 2 + (r() - 0.5) * colW * 0.22;
      var y = heights[col] + r() * 10;
      heights[col] = y + h + 18;
      x = Math.max(10, Math.min(W - cardW - 10, x));
      c.style.setProperty('--x', x.toFixed(1) + 'px');
      c.style.setProperty('--y', y.toFixed(1) + 'px');
      c.style.setProperty('--r', ((r() - 0.5) * 9).toFixed(2) + 'deg');
      c.style.zIndex = 1;
    });
    board.style.height = Math.ceil(Math.max.apply(null, heights) + 30) + 'px';
    if (!animate) cards.forEach(function (c) { c.style.transition = 'none'; void c.offsetWidth; c.style.transition = ''; });
  }

  /* ---- Drag on desktop; a click without moving opens the photo ---- */
  cards.forEach(function (c) {
    var sx, sy, ox, oy, moved, id = null;
    c.addEventListener('pointerdown', function (e) {
      if (!desktop.matches || e.button !== 0) return;
      id = e.pointerId; c.setPointerCapture(id); moved = false;
      sx = e.clientX; sy = e.clientY;
      ox = parseFloat(c.style.getPropertyValue('--x')) || 0; oy = parseFloat(c.style.getPropertyValue('--y')) || 0;
      c.style.zIndex = ++zTop; c.classList.add('pl-drag');
    });
    c.addEventListener('pointermove', function (e) {
      if (id !== e.pointerId) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
      var W = board.clientWidth, H = board.clientHeight;
      var nx = Math.max(-20, Math.min(W - c.offsetWidth + 20, ox + dx));
      var ny = Math.max(-20, Math.min(H - c.offsetHeight + 20, oy + dy));
      c.style.setProperty('--x', nx + 'px'); c.style.setProperty('--y', ny + 'px');
    });
    function end(e) {
      if (id !== e.pointerId) return;
      id = null; c.classList.remove('pl-drag');
      // land with a fresh little tilt
      c.style.setProperty('--r', ((Math.random() - 0.5) * 10).toFixed(2) + 'deg');
      if (!moved) open(c._i);
    }
    c.addEventListener('pointerup', end);
    c.addEventListener('pointercancel', end);
    c.addEventListener('click', function () { if (!desktop.matches) open(c._i); });
    c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(c._i); } });
  });

  /* ---- Filters and shuffle ---- */
  document.querySelectorAll('.pl-tab').forEach(function (t) {
    t.addEventListener('click', function () {
      filter = t.dataset.country;
      document.querySelectorAll('.pl-tab').forEach(function (b) { b.setAttribute('aria-pressed', b === t ? 'true' : 'false'); });
      layout(true);
    });
  });
  document.querySelector('.pl-shuffle').addEventListener('click', function () { seed = Math.floor(Math.random() * 100000) + 1; layout(true); });

  /* ---- Opened photo ---- */
  function show(i) {
    var p = PHOTOS[i]; openIndex = i;
    boxImg.src = 'img/' + p[0] + '-l.webp'; boxImg.alt = p[1];
    boxText.textContent = p[1]; boxDate.textContent = p[3];
  }
  function open(i) {
    show(i); box.hidden = false; document.body.style.overflow = 'hidden';
    box.querySelector('.pl-box-close').focus();
  }
  function close() {
    box.hidden = true; document.body.style.overflow = '';
    if (openIndex > -1) cards[openIndex].focus({ preventScroll: true });
    openIndex = -1;
  }
  function step(d) {
    var list = visible().map(function (c) { return c._i; });
    var at = list.indexOf(openIndex);
    show(list[(at + d + list.length) % list.length]);
  }
  box.querySelector('.pl-box-close').addEventListener('click', close);
  box.querySelector('.pl-prev').addEventListener('click', function () { step(-1); });
  box.querySelector('.pl-next').addEventListener('click', function () { step(1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  // swipe between photos on phones
  var tx = null;
  box.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });

  /* ---- Start ---- */
  layout(false);
  window.addEventListener('load', function () { layout(false); });
  cards.forEach(function (c, k) { c.style.setProperty('--d', (0.15 + k * 0.06).toFixed(2) + 's'); c.classList.add('pl-land'); });
  setTimeout(function () { cards.forEach(function (c) { c.classList.remove('pl-land'); }); }, 2600);
  var lastW = board.clientWidth;
  window.addEventListener('resize', function () {
    if (Math.abs(board.clientWidth - lastW) > 30) { lastW = board.clientWidth; layout(false); }
  });
  desktop.addEventListener && desktop.addEventListener('change', function () { layout(false); });
})();
