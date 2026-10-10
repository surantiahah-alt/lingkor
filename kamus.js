/* LINGKOR: halaman Kamus, kartu kata, dan lembar detail kata. */
(function () {
  'use strict';
  var LK = window.LK;
  var D = LK.data;
  var esc = LK.esc;
  var favHandler = null;

  function F() { return LK.state.kamus; }
  function aktif() {
    var f = F();
    return !!(LK.norm(f.q) || f.bahasa !== 'semua' || f.kategori !== 'semua' || f.favOnly);
  }

  function hay(e) {
    if (!e._hay) e._hay = LK.norm([e.kata].concat(e.varian || [], e.arti, e.slang).join(' '));
    return e._hay;
  }

  function peringkat(e, q) {
    if (!q) return 0;
    var k = LK.norm(e.kata);
    if (k === q) return 0;
    if (k.indexOf(q) === 0) return 1;
    if (k.indexOf(q) > -1) return 2;
    return 3;
  }

  function disaring() {
    var f = F();
    var q = LK.norm(f.q);
    var qt = q ? q.split(' ') : [];
    var list = D.kamus.filter(function (e) {
      if (f.bahasa !== 'semua' && e.bahasa !== f.bahasa) return false;
      if (f.kategori !== 'semua' && e.kategori !== f.kategori) return false;
      if (f.favOnly && !LK.fav.has(e.id)) return false;
      if (qt.length) {
        var h = hay(e);
        return qt.every(function (t) { return h.indexOf(t) > -1; });
      }
      return true;
    });
    list.sort(function (a, b) {
      return peringkat(a, q) - peringkat(b, q) || a.kata.localeCompare(b.kata, 'id');
    });
    return list;
  }

  /* ---------- Potongan tampilan ---------- */
  function kartu(e) {
    var b = D.bahasa[e.bahasa];
    return '<article class="card word-card" data-b="' + e.bahasa + '">' +
      '<header class="wc-head"><div><h3 class="wc-kata">' + esc(e.kata) + '</h3><p class="wc-arti">' + esc(e.arti.join(', ')) + '</p></div>' + LK.favBtn(e) + '</header>' +
      '<div class="slang-chips" aria-label="Padanan slang">' + e.slang.map(function (s) { return '<span class="slang">' + esc(s) + '</span>'; }).join('') + '</div>' +
      '<dl class="wc-meta">' +
        '<div><dt>Asal bahasa</dt><dd>' + LK.badgeBahasa(e.bahasa) + ' <span class="muted">' + esc(b.wilayah) + '</span></dd></div>' +
        '<div><dt>Kategori</dt><dd>' + esc(LK.kategoriNama(e.kategori)) + '</dd></div>' +
      '</dl>' +
      '<p class="wc-contoh"><span class="mini">Contoh penggunaan</span>"' + esc(e.contoh.slang) + '"</p>' +
      '<div class="wc-foot"><button type="button" class="btn btn-ghost btn-sm" data-detail="' + esc(e.id) + '">Lihat detail</button><span class="tag-contoh">Contoh prototype</span></div>' +
      '</article>';
  }

  function miniKartu(e) {
    return '<button type="button" class="mini-card" data-b="' + e.bahasa + '" data-detail="' + esc(e.id) + '">' +
      '<span class="mc-top">' + LK.badgeBahasa(e.bahasa) + '</span>' +
      '<strong>' + esc(e.kata) + '</strong>' +
      '<span class="mc-arti">' + esc(e.arti[0]) + '</span>' +
      '<span class="mc-slang">' + esc(e.slang[0]) + '</span>' +
      '</button>';
  }

  function fitur() {
    var pop = D.kamus.filter(function (e) { return e.populer; });
    var baru = D.kamus.filter(function (e) { return e.baru; });
    return '' +
      '<div class="feat-block"><div class="feat-head"><h2>Kata Populer</h2><span class="tag-contoh">Contoh prototype</span></div>' +
        '<div class="h-scroll">' + pop.map(miniKartu).join('') + '</div></div>' +
      '<div class="feat-block"><div class="feat-head"><h2>Kata Terbaru</h2><span class="tag-contoh">Contoh prototype</span></div>' +
        '<div class="h-scroll">' + baru.map(miniKartu).join('') + '</div></div>' +
      '<p class="muted small">Penanda populer dan terbaru masih contoh, bukan data penggunaan nyata.</p>';
  }

  function chipBahasa() {
    var f = F();
    var semua = '<button type="button" class="chip" aria-pressed="' + (f.bahasa === 'semua') + '" data-aksi="f-bahasa" data-v="semua">Semua <span class="chip-n">' + D.kamus.length + '</span></button>';
    return semua + Object.keys(D.bahasa).map(function (k) {
      var n = D.kamus.filter(function (e) { return e.bahasa === k; }).length;
      return '<button type="button" class="chip" data-b="' + k + '" aria-pressed="' + (f.bahasa === k) + '" data-aksi="f-bahasa" data-v="' + k + '">' + esc(D.bahasa[k].pendek) + ' <span class="chip-n">' + n + '</span></button>';
    }).join('');
  }

  function chipKategori() {
    var f = F();
    var semua = '<button type="button" class="chip" aria-pressed="' + (f.kategori === 'semua') + '" data-aksi="f-kategori" data-v="semua">Semua</button>';
    return semua + D.kategori.map(function (k) {
      return '<button type="button" class="chip" aria-pressed="' + (f.kategori === k.id) + '" data-aksi="f-kategori" data-v="' + k.id + '">' + esc(k.nama) + '</button>';
    }).join('');
  }

  function chipFav() {
    var f = F();
    return '<button type="button" class="chip chip-fav" aria-pressed="' + f.favOnly + '" data-aksi="f-fav">' + LK.icon('heart', 16) + 'Favorit <span class="chip-n">' + LK.fav.count() + '</span></button>' +
      '<button type="button" class="btn btn-ghost btn-sm" data-aksi="reset">Reset filter</button>';
  }

  function kosong() {
    var f = F();
    var q = f.q.trim();
    var judul, isi;
    if (f.favOnly && !LK.fav.count()) {
      judul = 'Belum ada kata favorit';
      isi = 'Tekan ikon hati pada kartu kata untuk menyimpannya di sini.';
    } else if (q) {
      judul = 'Kata "' + q + '" belum tersedia';
      isi = 'Kata itu belum ada di kamus contoh. Periksa ejaannya, coba kata lain, atau ubah filter bahasa dan kategori.';
    } else {
      judul = 'Tidak ada kata yang cocok';
      isi = 'Tidak ada kata yang sesuai dengan kombinasi filter ini. Coba ubah atau reset filter.';
    }
    return '<div class="card empty-state"><span class="empty-icon">' + LK.icon('search', 26) + '</span><h3>' + esc(judul) + '</h3><p>' + esc(isi) + '</p>' +
      '<button type="button" class="btn btn-primary btn-sm" data-aksi="reset">Reset filter</button></div>';
  }

  function hasil() {
    var list = disaring();
    return '<div class="res-head"><h2>' + (aktif() ? 'Hasil pencarian' : 'Semua Kata') + '</h2>' +
      '<p class="count" role="status">' + list.length + ' dari ' + D.kamus.length + ' kata</p></div>' +
      (list.length ? '<div class="word-grid">' + list.map(kartu).join('') + '</div>' : kosong());
  }

  /* ---------- Lembar detail ---------- */
  function detailHtml(e) {
    var b = D.bahasa[e.bahasa];
    return '<div class="detail" data-b="' + e.bahasa + '">' +
      '<div class="detail-top">' + LK.badgeBahasa(e.bahasa) + '<span class="pill pill-info">' + esc(LK.kategoriNama(e.kategori)) + '</span></div>' +
      '<h2 class="detail-kata">' + esc(e.kata) + '</h2>' +
      '<p class="detail-arti">' + esc(e.arti.join(' / ')) + '</p>' +
      '<div class="bridge">' +
        '<div class="bridge-node"><span class="bridge-label">' + esc(b.nama) + '</span><strong>' + esc(e.kata) + '</strong></div>' +
        '<div class="bridge-line" aria-hidden="true"><i class="bridge-dot"></i></div>' +
        '<div class="bridge-node bridge-to"><span class="bridge-label">Padanan slang</span><strong>' + esc(e.slang[0]) + '</strong></div>' +
      '</div>' +
      '<div class="alt"><span class="mini">Semua padanan</span><div class="slang-chips">' + e.slang.map(function (s) { return '<span class="slang">' + esc(s) + '</span>'; }).join('') + '</div></div>' +
      '<dl class="facts">' +
        '<div><dt>Asal bahasa</dt><dd>' + esc(b.nama) + ', ' + esc(b.wilayah) + '</dd></div>' +
        '<div><dt>Konteks penggunaan</dt><dd>' + esc(e.konteks) + '</dd></div>' +
        '<div><dt>Tingkat keformalan</dt><dd><span class="pill pill-' + e.formalitas.toLowerCase() + '">' + esc(e.formalitas) + '</span> ' + esc(D.formalitas[e.formalitas]) + '</dd></div>' +
      '</dl>' +
      '<div class="contoh"><span class="mini">Contoh kalimat</span>' +
        '<p><span class="lang-tag">' + esc(b.pendek) + '</span>' + esc(e.contoh.daerah) + '</p>' +
        '<p><span class="lang-tag lang-tag-slang">Slang</span>' + esc(e.contoh.slang) + '</p>' +
      '</div>' +
      '<p class="note">' + esc(D.statusData) + '. Pemakaian slang bergantung pada situasi, komunitas, dan daerah.</p>' +
      '<div class="actions">' + LK.favBtn(e) +
        '<button type="button" class="btn btn-primary btn-sm" data-sheet-aksi="coba" data-id="' + esc(e.id) + '">' + LK.icon('translate', 16) + 'Coba di Penerjemah</button>' +
        '<button type="button" class="btn btn-ghost btn-sm" data-sheet-aksi="salin" data-id="' + esc(e.id) + '">' + LK.icon('copy', 16) + 'Salin slang</button>' +
      '</div></div>';
  }

  LK.openDetail = function (id) {
    var e = LK.entry(id);
    if (e) LK.openSheet(detailHtml(e), 'Detail kata ' + e.kata);
  };

  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-sheet-aksi]');
    if (!b) return;
    var e = LK.entry(b.getAttribute('data-id'));
    if (!e) return;
    if (b.getAttribute('data-sheet-aksi') === 'coba') {
      var s = LK.state.penerjemah;
      s.bahasa = e.bahasa; s.arah = 'daerah-slang'; s.teks = e.kata; s.hasil = null; s.pilih = 0; s.galat = ''; s.demo = false; s.autoRun = true;
      LK.closeSheet();
      LK.go('penerjemah');
    } else {
      LK.copy(e.slang[0]).then(function (ok) {
        if (ok) LK.toast('Berhasil disalin: ' + e.slang[0], 'ok');
        else LK.toast('Penyalinan otomatis tidak didukung di sini.', 'warn');
      });
    }
  });

  /* ---------- Halaman ---------- */
  function perbarui() {
    var h = document.getElementById('kamus-hasil');
    var ft = document.getElementById('kamus-featured');
    var x = document.getElementById('kamus-x');
    if (h) h.innerHTML = hasil();
    if (ft) ft.hidden = aktif();
    if (x) x.hidden = !F().q;
    var cb = document.getElementById('f-bahasa'); if (cb) cb.innerHTML = chipBahasa();
    var ck = document.getElementById('f-kategori'); if (ck) ck.innerHTML = chipKategori();
    var cf = document.getElementById('f-foot'); if (cf) cf.innerHTML = chipFav();
  }

  LK.page('kamus', {
    render: function () {
      var f = F();
      return '' +
        '<section class="page-head wrap">' +
          '<p class="eyebrow">Kamus</p>' +
          '<h1>Jelajahi Kamus Nusantara</h1>' +
          '<p class="lead">Cari kata daerah beserta padanan slangnya. <span class="tag-contoh">Data contoh prototype</span> belum diverifikasi ahli bahasa.</p>' +
        '</section>' +
        '<section class="wrap kamus">' +
          '<div class="card toolbar">' +
            '<div class="search">' +
              '<span class="s-ic">' + LK.icon('search', 20) + '</span>' +
              '<input id="kamus-q" type="search" class="input" placeholder="Cari kata, arti, atau slang..." aria-label="Cari kata" autocomplete="off" spellcheck="false" value="' + esc(f.q) + '">' +
              '<button type="button" class="s-x" id="kamus-x" data-aksi="hapus-q" aria-label="Hapus pencarian"' + (f.q ? '' : ' hidden') + '>' + LK.icon('x', 18) + '</button>' +
            '</div>' +
            '<div class="filter-group"><span class="mini">Bahasa daerah</span><div class="chip-row scroll" id="f-bahasa">' + chipBahasa() + '</div></div>' +
            '<div class="filter-group"><span class="mini">Kategori</span><div class="chip-row scroll" id="f-kategori">' + chipKategori() + '</div></div>' +
            '<div class="filter-foot" id="f-foot">' + chipFav() + '</div>' +
          '</div>' +
          '<div id="kamus-featured"' + (aktif() ? ' hidden' : '') + '>' + fitur() + '</div>' +
          '<div id="kamus-hasil">' + hasil() + '</div>' +
        '</section>';
    },

    mount: function (root) {
      var f = F();
      root.addEventListener('input', function (ev) {
        if (ev.target.id !== 'kamus-q') return;
        f.q = ev.target.value;
        perbarui();
      });
      root.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-aksi]');
        if (!b || !root.contains(b)) return;
        var a = b.getAttribute('data-aksi');
        if (a === 'f-bahasa') f.bahasa = b.getAttribute('data-v');
        else if (a === 'f-kategori') f.kategori = b.getAttribute('data-v');
        else if (a === 'f-fav') f.favOnly = !f.favOnly;
        else if (a === 'hapus-q') { f.q = ''; var q = document.getElementById('kamus-q'); if (q) { q.value = ''; q.focus(); } }
        else if (a === 'reset') {
          f.q = ''; f.bahasa = 'semua'; f.kategori = 'semua'; f.favOnly = false;
          var qi = document.getElementById('kamus-q'); if (qi) qi.value = '';
        } else return;
        perbarui();
      });
      favHandler = function () {
        if (LK.current !== 'kamus') return;
        var cf = document.getElementById('f-foot');
        if (cf) cf.innerHTML = chipFav();
        if (F().favOnly) perbarui();
      };
      document.addEventListener('lk:fav', favHandler);
    },

    leave: function () {
      if (favHandler) { document.removeEventListener('lk:fav', favHandler); favHandler = null; }
    }
  });
})();
