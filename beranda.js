/* LINGKOR: halaman Beranda. */
(function () {
  'use strict';
  var LK = window.LK;
  var D = LK.data;
  var esc = LK.esc;
  var DEMO = ['jw-mbois', 'su-geulis', 'mi-lamak', 'su-punten', 'jw-ambyar'];
  var idx = 0;
  var timer = null;

  function demoIsi(i) {
    var e = LK.entry(DEMO[i]);
    var b = D.bahasa[e.bahasa];
    return '<div class="bridge bridge-dark">' +
      '<div class="bridge-node"><span class="bridge-label">' + esc(b.nama) + '</span><strong>' + esc(e.kata) + '</strong></div>' +
      '<div class="bridge-line" aria-hidden="true"><i class="bridge-dot"></i></div>' +
      '<div class="bridge-node bridge-to"><span class="bridge-label">Slang Gen Z</span><strong>' + esc(e.slang[0]) + '</strong></div>' +
      '</div>' +
      '<p class="demo-arti"><span>Arti</span> ' + esc(e.arti.join(', ')) + '</p>' +
      '<p class="bubble">' + esc(e.contoh.slang) + '</p>';
  }

  function dots(i) {
    return DEMO.map(function (_, n) { return '<i class="' + (n === i ? 'on' : '') + '"></i>'; }).join('');
  }

  function tampilDemo(i) {
    var isi = document.getElementById('demo-isi');
    var d = document.getElementById('demo-dots');
    if (!isi) return;
    idx = (i + DEMO.length) % DEMO.length;
    isi.innerHTML = demoIsi(idx);
    isi.classList.remove('swap-in');
    void isi.offsetWidth;
    isi.classList.add('swap-in');
    if (d) d.innerHTML = dots(idx);
  }

  function statistik() {
    var padanan = 0;
    D.kamus.forEach(function (e) { padanan += e.slang.length; });
    return [
      { n: D.kamus.length, l: 'entri kamus' },
      { n: Object.keys(D.bahasa).length, l: 'bahasa daerah' },
      { n: padanan, l: 'padanan slang' },
      { n: D.soal.length, l: 'soal quiz' }
    ];
  }

  function bahasaPilihan() {
    return Object.keys(D.bahasa).map(function (k) {
      var b = D.bahasa[k];
      var list = D.kamus.filter(function (e) { return e.bahasa === k; });
      var cth = list.filter(function (e) { return e.populer; })[0] || list[0];
      return '<article class="card lang-card" data-b="' + k + '">' +
        '<div class="lang-code">' + esc(b.kode) + '</div>' +
        '<h3>' + esc(b.nama) + '</h3>' +
        '<p class="muted">' + esc(b.wilayah) + '</p>' +
        '<p class="lang-pair"><span>' + esc(cth.kata) + '</span><i aria-hidden="true"></i><span class="to">' + esc(cth.slang[0]) + '</span></p>' +
        '<button type="button" class="btn btn-ghost btn-sm" data-aksi="buka-bahasa" data-bahasa="' + k + '">' + list.length + ' kata ' + LK.icon('arrow', 16) + '</button>' +
        '</article>';
    }).join('');
  }

  LK.page('beranda', {
    render: function () {
      var stat = statistik().map(function (s) {
        return '<div class="stat"><strong>' + s.n + '</strong><span>' + esc(s.l) + '</span></div>';
      }).join('');

      return '' +
        '<section class="hero">' +
          '<svg class="hero-pattern" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
            '<defs><pattern id="kawung" width="64" height="64" patternUnits="userSpaceOnUse">' +
              '<g fill="none" stroke="currentColor" stroke-width="1.2">' +
                '<ellipse cx="32" cy="16" rx="11" ry="16"/><ellipse cx="32" cy="48" rx="11" ry="16"/>' +
                '<ellipse cx="16" cy="32" rx="16" ry="11"/><ellipse cx="48" cy="32" rx="16" ry="11"/>' +
              '</g><circle cx="32" cy="32" r="2.4" fill="currentColor"/><circle cx="0" cy="0" r="2.4" fill="currentColor"/><circle cx="64" cy="0" r="2.4" fill="currentColor"/><circle cx="0" cy="64" r="2.4" fill="currentColor"/><circle cx="64" cy="64" r="2.4" fill="currentColor"/>' +
            '</pattern></defs><rect width="100%" height="100%" fill="url(#kawung)"/>' +
          '</svg>' +
          '<div class="wrap hero-in">' +
            '<div class="hero-copy">' +
              '<p class="eyebrow eyebrow-light"><span class="dot"></span>Prototype inovasi budaya digital</p>' +
              '<h1>Bahasa Daerah, <span class="hero-em">Gaya Generasi.</span></h1>' +
              '<p class="hero-lead">LINGKOR adalah jembatan antara bahasa daerah dan cara anak muda berkomunikasi di media sosial. Cari arti kata daerah, temukan padanan slangnya, lalu uji pemahamanmu.</p>' +
              '<div class="hero-cta">' +
                '<a class="btn btn-cta" href="#penerjemah">Mulai Menerjemahkan ' + LK.icon('arrow', 18) + '</a>' +
                '<a class="btn btn-outline-light" href="#quiz">Main Quiz</a>' +
              '</div>' +
              '<p class="hero-note">Data kamus masih contoh prototype dan belum diverifikasi ahli bahasa.</p>' +
            '</div>' +
            '<div class="demo-card">' +
              '<p class="mono-label">Jembatan kata <span>contoh prototype</span></p>' +
              '<div id="demo-isi" class="demo-isi">' + demoIsi(0) + '</div>' +
              '<div class="demo-foot">' +
                '<div class="demo-dots" id="demo-dots" aria-hidden="true">' + dots(0) + '</div>' +
                '<div class="demo-actions">' +
                  '<button type="button" class="btn btn-sm btn-glass" data-aksi="demo-next">' + LK.icon('refresh', 16) + 'Contoh lain</button>' +
                  '<button type="button" class="btn btn-sm btn-glass" data-aksi="demo-buka">Coba di penerjemah</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</section>' +

        '<section class="section wrap">' +
          '<div class="section-head"><h2>Tiga cara mengenal bahasa daerah</h2><p>Mulai dari satu kata, sampai kamu bisa membedakan mana yang pas untuk obrolan teman dan mana yang perlu lebih sopan.</p></div>' +
          '<div class="grid-3">' +
            '<a class="card feature" href="#penerjemah">' +
              '<span class="f-icon f-blue">' + LK.icon('translate', 22) + '</span>' +
              '<h3>Penerjemah</h3>' +
              '<p>Tulis kata atau kalimat bahasa daerah, lihat padanan slang, arti, dan konteks pemakaiannya.</p>' +
              '<div class="mini-bridge" aria-hidden="true"><span>kowe</span><i></i><span>lo</span></div>' +
              '<span class="f-link">Buka Penerjemah ' + LK.icon('arrow', 16) + '</span>' +
            '</a>' +
            '<a class="card feature" href="#kamus">' +
              '<span class="f-icon f-purple">' + LK.icon('book', 22) + '</span>' +
              '<h3>Kamus</h3>' +
              '<p>Telusuri kata berdasarkan bahasa dan kategori, lalu simpan kata favoritmu.</p>' +
              '<div class="mini-chips" aria-hidden="true"><span>Sapaan</span><span>Ekspresi</span><span>Pertemanan</span></div>' +
              '<span class="f-link">Buka Kamus ' + LK.icon('arrow', 16) + '</span>' +
            '</a>' +
            '<a class="card feature" href="#quiz">' +
              '<span class="f-icon f-orange">' + LK.icon('quiz', 22) + '</span>' +
              '<h3>Quiz</h3>' +
              '<p>Uji arti kata, pilihan slang sesuai konteks, dan asal bahasa. Naikkan levelmu dari Pemula sampai Ahli Bahasa.</p>' +
              '<div class="mini-progress" aria-hidden="true"><span>Soal 3 dari ' + D.soal.length + '</span><i style="--w:' + Math.round(300 / D.soal.length) + '%"></i></div>' +
              '<span class="f-link">Main Quiz ' + LK.icon('arrow', 16) + '</span>' +
            '</a>' +
          '</div>' +
        '</section>' +

        '<section class="section section-tint">' +
          '<div class="wrap">' +
            '<div class="section-head"><h2>Bahasa Nusantara Pilihan</h2><p>Empat bahasa daerah untuk memulai. Kode di kartu adalah kode bahasa ISO 639.</p></div>' +
            '<div class="grid-4">' + bahasaPilihan() + '</div>' +
          '</div>' +
        '</section>' +

        '<section class="section wrap">' +
          '<div class="section-head"><h2>Cara Kerja LINGKOR</h2></div>' +
          '<ol class="steps">' +
            '<li><span class="step-n">1</span><h3>Pilih Bahasa</h3><p>Tentukan bahasa daerah yang ingin kamu pahami: Jawa, Sunda, Madura, atau Minangkabau.</p></li>' +
            '<li><span class="step-n">2</span><h3>Jelajahi Makna</h3><p>Cari di kamus atau tulis di penerjemah untuk melihat arti, konteks, dan tingkat keformalan.</p></li>' +
            '<li><span class="step-n">3</span><h3>Pelajari Slang</h3><p>Bandingkan dengan padanan slang anak muda, lalu uji pemahamanmu lewat quiz.</p></li>' +
          '</ol>' +
        '</section>' +

        '<section class="section wrap">' +
          '<div class="stats-box">' +
            '<div class="stats-head"><h2>Isi prototype saat ini</h2><span class="tag-contoh">Contoh Prototype</span></div>' +
            '<div class="stats">' + stat + '</div>' +
            '<p class="muted small">Angka ini menghitung data contoh yang ada di prototype. Bukan jumlah pengguna dan bukan hasil verifikasi ahli bahasa.</p>' +
          '</div>' +
        '</section>';
    },

    mount: function (root) {
      idx = 0;
      if (!LK.reducedMotion()) {
        timer = setInterval(function () { tampilDemo(idx + 1); }, 5200);
      }
      root.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-aksi]');
        if (!b) return;
        var a = b.getAttribute('data-aksi');
        if (a === 'demo-next') {
          if (timer) { clearInterval(timer); timer = null; }
          tampilDemo(idx + 1);
        } else if (a === 'demo-buka') {
          var e = LK.entry(DEMO[idx]);
          var s = LK.state.penerjemah;
          s.bahasa = e.bahasa; s.arah = 'daerah-slang'; s.teks = e.kata; s.hasil = null; s.pilih = 0; s.galat = ''; s.demo = false; s.autoRun = true;
          LK.go('penerjemah');
        } else if (a === 'buka-bahasa') {
          var k = LK.state.kamus;
          k.bahasa = b.getAttribute('data-bahasa'); k.q = ''; k.kategori = 'semua'; k.favOnly = false;
          LK.go('kamus');
        }
      });
    },

    leave: function () {
      if (timer) { clearInterval(timer); timer = null; }
    }
  });
})();
