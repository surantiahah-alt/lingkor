/* LINGKOR: titik masuk aplikasi. */
(function () {
  'use strict';
  var LK = window.LK;

  // Bangun navigasi atas (laptop) dan tab bawah (HP) dari satu daftar.
  var MENU = [
    { r: 'beranda', t: 'Beranda', i: 'home' },
    { r: 'penerjemah', t: 'Penerjemah', i: 'translate' },
    { r: 'kamus', t: 'Kamus', i: 'book' },
    { r: 'quiz', t: 'Quiz', i: 'quiz' },
    { r: 'tentang', t: 'Tentang', i: 'info' }
  ];
  var atas = document.getElementById('nav-top');
  var bawah = document.getElementById('tabbar');
  if (atas) atas.innerHTML = MENU.map(function (m) {
    return '<a href="#' + m.r + '" data-route="' + m.r + '">' + LK.icon(m.i, 18) + '<span>' + m.t + '</span></a>';
  }).join('');
  if (bawah) bawah.innerHTML = MENU.map(function (m) {
    return '<a href="#' + m.r + '" data-route="' + m.r + '"><span class="ic-wrap">' + LK.icon(m.i, 22) + '</span><span>' + m.t + '</span></a>';
  }).join('');

  LK.initTheme();

  var tema = document.getElementById('theme-toggle');
  if (tema) tema.addEventListener('click', LK.toggleTheme);

  var lompat = document.getElementById('skip-link');
  if (lompat) {
    lompat.addEventListener('click', function () {
      var v = document.getElementById('view');
      if (v) v.focus();
    });
  }

  window.addEventListener('hashchange', function () { LK.render(false); });

  // Kesalahan tak terduga: beri tahu pengguna dengan ramah, jangan diam saja.
  window.addEventListener('error', function () {
    LK.toast('Terjadi kendala tak terduga. Coba muat ulang halaman.', 'warn');
  });

  LK.render(true);
})();
