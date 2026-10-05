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

  /* ---- Justified rows ---- */
  function layout() {
    var W = gallery.clientWidth;
    if (!W) return;
    var target = W < 520 ? 150 : W < 900 ? 220 : 300;   // row height to aim for
    var gap = W < 520 ? 6 : 12;
    gallery.style.setProperty('--gap', gap + 'px');
    gallery.innerHTML = '';
    var row = [], sum = 0;
    function flush(last) {
      if (!row.length) return;
      var free = W - gap * (row.length - 1);
      var h = last ? Math.min(target, free / sum) : free / sum;   // the last row keeps its natural height
      var div = document.createElement('div');
      div.className = 'pl-row';
      row.forEach(function (i) {
        var p = PHOTOS[i], f = figs[i];
        var w = Math.floor(h * p[2] / p[3]);
        f.style.width = w + 'px';
        f.style.height = Math.round(h) + 'px';
        f.querySelector('img').sizes = w + 'px';
        div.appendChild(f);
      });
      gallery.appendChild(div);
      row = []; sum = 0;
    }
    PHOTOS.forEach(function (p, i) {
      row.push(i); sum += p[2] / p[3];
      if (sum * target + gap * (row.length - 1) >= W) flush(false);
    });
    flush(true);
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
          var row = e.target.parentNode, k = Array.prototype.indexOf.call(row.children, e.target);
          e.target.style.transitionDelay = (k * 0.06) + 's';
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

  /* ---- Start ---- */
  layout();
  watch();
  var lastW = gallery.clientWidth;
  window.addEventListener('resize', function () {
    if (Math.abs(gallery.clientWidth - lastW) > 4) { lastW = gallery.clientWidth; layout(); }
  });
})();
