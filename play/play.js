/* Play page: a justified gallery. Photos are laid out in rows of equal height, each keeping
   its own shape, and open large on click. Styles live in play.css. */
(function () {
  // [file name, caption, width, height]
  var PHOTOS = [
    ["orleans-first-sunset", "First sunset in Orléans", 2252, 4000],
    ["sagrada-familia", "Sagrada Família, Barcelona", 2304, 4096],
    ["etretat", "Étretat", 4000, 2252],
    ["brussels-stickers", "Stickers, Brussels", 2303, 4096],
    ["eiffel-first-solo", "First solo trip to Paris", 2252, 4000],
    ["jeanne-darc-1", "Fêtes de Jeanne d'Arc, Orléans", 3650, 5476],
    ["spray-paint-madrid", "Spray paint, Madrid", 2304, 4096],
    ["loire-river", "The Loire, Orléans", 3072, 4096],
    ["manneken-pis", "Manneken Pis, Brussels", 2304, 4096],
    ["cliff-monet", "The cliff Monet painted, Étretat", 4000, 2252],
    ["trying-cyanotype", "Trying cyanotype", 2252, 4000],
    ["bernabeu", "Santiago Bernabéu, Madrid", 2303, 4096],
    ["paris-arcades", "Arcades, Paris", 1179, 2096],
    ["brussels-posters", "Posters, Brussels", 3072, 4096],
    ["barcelona-street", "Barcelona", 2304, 4096],
    ["orleans-cathedral", "Orléans Cathedral", 2252, 4000],
    ["f1-gallery-paris", "F1 gallery, Paris", 1677, 2981],
    ["brussels", "Brussels", 2297, 4083],
    ["jeanne-darc-2", "Fêtes de Jeanne d'Arc, Orléans", 3856, 5784],
    ["madhubani-tattoo", "A tattoo I designed myself, inspired by Madhubani painting", 2304, 4096]
  ];

  var gallery = document.getElementById('pl-gallery');
  var box = document.getElementById('pl-box');
  var boxImg = box.querySelector('.pl-box-img');
  var boxText = box.querySelector('.pl-box-text');
  var openIndex = -1;

  // pixel widths of the two saved sizes (small: 640px on the long side, large: 1800px)
  function widths(p) {
    var land = p[2] >= p[3];
    return land ? [640, 1800] : [Math.round(640 * p[2] / p[3]), Math.round(1800 * p[2] / p[3])];
  }

  /* ---- Build the photos once ---- */
  var figs = PHOTOS.map(function (p, i) {
    var fig = document.createElement('figure');
    fig.className = 'pl-photo';
    fig.tabIndex = 0;
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-label', 'Open photo: ' + p[1]);
    var w = widths(p);
    var img = document.createElement('img');
    img.src = 'img/' + p[0] + '-s.webp';
    img.srcset = 'img/' + p[0] + '-s.webp ' + w[0] + 'w, img/' + p[0] + '-l.webp ' + w[1] + 'w';
    img.alt = p[1];
    img.loading = i < 6 ? 'eager' : 'lazy';
    img.decoding = 'async';
    var cap = document.createElement('figcaption');
    cap.textContent = p[1];
    fig.appendChild(img); fig.appendChild(cap);
    fig.addEventListener('click', function () { open(i); });
    fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
    return fig;
  });

  /* ---- Layout ----
     The page is a sequence of blocks:
       chunk  : a few photos split into columns whose widths are worked out so every column
                ends on the same line (taller photos stay taller, nothing is cropped)
       feature: a wide photo stretched across most of the row, next to one tall photo
     Order of blocks below; numbers are positions in PHOTOS. */
  var BLOCKS = [
    { type: 'chunk',   items: [0, 1, 3, 4, 5, 6] },
    { type: 'feature', wide: 2, tall: 7, wideFirst: true },
    { type: 'chunk',   items: [8, 10, 11, 12, 13, 14] },
    { type: 'feature', wide: 9, tall: 18, wideFirst: false },
    { type: 'chunk',   items: [15, 16, 17, 19] }
  ];

  function ratio(i) { return PHOTOS[i][3] / PHOTOS[i][2]; }   // height per unit of width

  // try every way of splitting the photos into k columns and keep the one whose
  // column widths are most even, so no column ends up a sliver
  function split(items, k) {
    var best = null, n = items.length, total = Math.pow(k, n);
    for (var code = 0; code < total; code++) {
      var cols = []; for (var c = 0; c < k; c++) cols.push([]);
      var x = code;
      for (var j = 0; j < n; j++) { cols[x % k].push(items[j]); x = Math.floor(x / k); }
      if (cols.some(function (c) { return !c.length; })) continue;
      var S = cols.map(function (c) { return c.reduce(function (a, i) { return a + ratio(i); }, 0); });
      var spread = Math.max.apply(null, S) / Math.min.apply(null, S);
      // small nudge towards keeping the original order left to right
      var order = cols.reduce(function (a, c, ci) { return a + c[0] * ci; }, 0) * 1e-4;
      var score = spread - order;
      if (!best || score < best.score) best = { score: score, cols: cols, S: S };
    }
    return best;
  }

  function place(fig, i, w, h) {
    fig.style.width = w.toFixed(2) + 'px';
    fig.style.height = h.toFixed(2) + 'px';
    fig.querySelector('img').sizes = Math.ceil(w) + 'px';
  }

  function chunk(items, k, W, gap) {
    k = Math.min(k, items.length);
    var res = split(items, k);
    var cols = res.cols, S = res.S;
    // equal column heights: width_c = (H - gap*(n_c - 1)) / S_c, and the widths fill the row
    var inner = W - gap * (k - 1), sumInv = 0, extra = 0;
    cols.forEach(function (c, ci) { sumInv += 1 / S[ci]; extra += gap * (c.length - 1) / S[ci]; });
    var H = (inner + extra) / sumInv;
    var wrap = document.createElement('div');
    wrap.className = 'pl-chunk';
    cols.forEach(function (c, ci) {
      var w = (H - gap * (c.length - 1)) / S[ci];
      var col = document.createElement('div');
      col.className = 'pl-col';
      col.style.width = w.toFixed(2) + 'px';
      c.slice().sort(function (a, b) { return a - b; }).forEach(function (i) {
        place(figs[i], i, w, w * ratio(i));
        col.appendChild(figs[i]);
      });
      wrap.appendChild(col);
    });
    return wrap;
  }

  function feature(b, W, gap, narrow) {
    var row = document.createElement('div');
    row.className = 'pl-row';
    if (narrow) {                                   // phones: the wide photo gets the full width
      place(figs[b.wide], b.wide, W, W * ratio(b.wide));
      row.appendChild(figs[b.wide]);
      return row;
    }
    var aw = 1 / ratio(b.wide), at = 1 / ratio(b.tall);
    var h = (W - gap) / (aw + at);
    var order = b.wideFirst ? [b.wide, b.tall] : [b.tall, b.wide];
    order.forEach(function (i) { place(figs[i], i, h / ratio(i), h); row.appendChild(figs[i]); });
    return row;
  }

  function layout() {
    var W = gallery.clientWidth;
    if (!W) return;
    var narrow = W < 700;
    var gap = W < 520 ? 8 : 14;
    gallery.style.setProperty('--gap', gap + 'px');
    gallery.innerHTML = '';
    var carry = [];                                 // on phones the tall photo from a feature joins the next chunk
    BLOCKS.forEach(function (b) {
      if (b.type === 'feature') {
        gallery.appendChild(feature(b, W, gap, narrow));
        if (narrow) carry.push(b.tall);
      } else {
        var items = b.items.concat(carry); carry = [];
        var k = narrow ? 2 : (items.length <= 4 ? 4 : 3);
        gallery.appendChild(chunk(items, k, W, gap));
      }
    });
    if (carry.length) gallery.appendChild(chunk(carry, Math.min(2, carry.length), W, gap));
  }

  /* ---- Rise in on scroll ---- */
  function watch() {
    if (!document.documentElement.classList.contains('motion') || !('IntersectionObserver' in window)) {
      figs.forEach(function (f) { f.classList.add('pl-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var k = figs.indexOf(e.target) % 3;
          e.target.style.transitionDelay = (k * 0.07) + 's';
          e.target.classList.add('pl-in'); io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    figs.forEach(function (f) { io.observe(f); });
  }

  /* ---- Opened photo ---- */
  function show(i) {
    var p = PHOTOS[i]; openIndex = i;
    boxImg.src = 'img/' + p[0] + '-l.webp'; boxImg.alt = p[1];
    boxText.textContent = p[1];
  }
  function open(i) {
    show(i); box.hidden = false; document.body.style.overflow = 'hidden';
    box.querySelector('.pl-box-close').focus();
  }
  function close() {
    box.hidden = true; document.body.style.overflow = '';
    if (openIndex > -1) figs[openIndex].focus({ preventScroll: true });
    openIndex = -1;
  }
  function step(d) { show((openIndex + d + PHOTOS.length) % PHOTOS.length); }
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
  var tx = null;
  box.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });

  /* ---- Camera emoji: flash on hover or tap ---- */
  var cam = document.querySelector('.pl-cam');
  if (cam) {
    var snap = function () { cam.classList.remove('pl-snap'); void cam.offsetWidth; cam.classList.add('pl-snap'); };
    cam.addEventListener('mouseenter', snap);
    cam.addEventListener('touchstart', snap, { passive: true });
    cam.addEventListener('animationend', function (e) { if (e.animationName === 'pl-click') cam.classList.remove('pl-snap'); });
  }

  /* ---- Start ---- */
  layout();
  watch();
  var lastW = gallery.clientWidth;
  window.addEventListener('resize', function () {
    if (Math.abs(gallery.clientWidth - lastW) > 4) { lastW = gallery.clientWidth; layout(); }
  });
})();
