/* LINGKOR: halaman Penerjemah.
   Halaman ini hanya berbicara dengan LK.translator (js/translator-service.js),
   jadi mengganti provider lokal dengan API tidak perlu mengubah kode UI di sini. */
(function () {
  'use strict';
  var LK = window.LK;
  var D = LK.data;
  var esc = LK.esc;
  var MAX = 200;
  var token = 0; // naik setiap kali ada permintaan baru atau pembatalan, agar hasil lama diabaikan

  function S() { return LK.state.penerjemah; }
  function maju() { return S().arah === 'daerah-slang'; }

  function contohKata() {
    var s = S();
    var list = D.bahasa[s.bahasa].contoh.slice();
    if (maju()) return list;
    return list.map(function (k) {
      var e = D.kamus.filter(function (x) { return x.bahasa === s.bahasa && x.kata === k; })[0];
      return e ? e.slang[0] : null;
    }).filter(Boolean);
  }

  /* ---------- Formulir ---------- */
  function formHtml() {
    var s = S();
    var b = D.bahasa[s.bahasa];
    var fwd = maju();
    var radios = Object.keys(D.bahasa).map(function (k) {
      return '<label class="chip-radio" data-b="' + k + '"><input type="radio" name="bahasa" value="' + k + '"' + (k === s.bahasa ? ' checked' : '') + '><span>' + esc(D.bahasa[k].pendek) + '</span></label>';
    }).join('');
    var chips = contohKata();
    if (fwd) chips.push(b.kalimat);
    var chipHtml = chips.map(function (v) {
      return '<button type="button" class="chip" data-aksi="contoh" data-v="' + esc(v) + '">' + esc(v) + '</button>';
    }).join('');
    var label = fwd ? 'Kata atau kalimat ' + b.nama : 'Kata slang atau bahasa Indonesia';
    var ph = 'Contoh: ' + (fwd ? b.kalimat : chips[0]);

    return '' +
      '<fieldset class="field"><legend>Pilih bahasa daerah</legend><div class="chip-row">' + radios + '</div></fieldset>' +
      '<div class="dirbar">' +
        '<span class="dir-label">' + esc(fwd ? b.nama : 'Slang / Indonesia') + '</span>' +
        '<button type="button" class="btn btn-ghost btn-sm" data-aksi="tukar" aria-label="Tukar arah terjemahan">' + LK.icon('swap', 18) + 'Tukar</button>' +
        '<span class="dir-label dir-to">' + esc(fwd ? 'Slang Gen Z' : b.nama) + '</span>' +
      '</div>' +
      '<div class="field">' +
        '<label for="tr-input">' + esc(label) + '</label>' +
        '<textarea id="tr-input" class="input" rows="3" maxlength="' + MAX + '" placeholder="' + esc(ph) + '" spellcheck="false" autocapitalize="off" aria-describedby="tr-galat"' + (s.galat ? ' aria-invalid="true"' : '') + '>' + esc(s.teks) + '</textarea>' +
        '<div class="field-foot"><span id="tr-galat" class="galat" role="alert">' + esc(s.galat) + '</span><span class="count" id="tr-count">' + s.teks.length + '/' + MAX + '</span></div>' +
      '</div>' +
      '<div class="tr-actions">' +
        '<button type="button" class="btn btn-cta" id="tr-go" data-aksi="terjemah">Terjemahkan</button>' +
        '<button type="button" class="btn btn-ghost" data-aksi="hapus">' + LK.icon('x', 18) + 'Hapus</button>' +
      '</div>' +
      '<div class="try"><span class="mini">Coba kata ini</span><div class="chip-row">' + chipHtml + '</div></div>';
  }

  /* ---------- Hasil ---------- */
  function metaAtas() {
    var s = S();
    return '<div class="result-top">' +
      '<span class="mono-label">Sumber: ' + esc(LK.translator.namaProvider()) + '</span>' +
      (s.demo ? '<span class="pill pill-info">Contoh awal</span>' : '') +
      '</div>';
  }

  function faktaEntri(e) {
    return '<dl class="facts">' +
      '<div><dt>Arti dalam bahasa Indonesia</dt><dd>' + esc(e.arti.join(' / ')) + '</dd></div>' +
      '<div><dt>Konteks penggunaan</dt><dd>' + esc(e.konteks) + '</dd></div>' +
      '<div><dt>Tingkat keformalan</dt><dd><span class="pill pill-' + e.formalitas.toLowerCase() + '">' + esc(e.formalitas) + '</span> ' + esc(D.formalitas[e.formalitas]) + '</dd></div>' +
      '</dl>' +
      '<div class="contoh"><span class="mini">Contoh kalimat</span>' +
        '<p><span class="lang-tag">' + esc(D.bahasa[e.bahasa].pendek) + '</span>' + esc(e.contoh.daerah) + '</p>' +
        '<p><span class="lang-tag lang-tag-slang">Slang</span>' + esc(e.contoh.slang) + '</p>' +
      '</div>';
  }

  function aksiSalin(extra) {
    return '<div class="actions">' +
      '<button type="button" class="btn btn-primary btn-sm" data-aksi="salin">' + LK.icon('copy', 16) + 'Salin hasil</button>' +
      (extra || '') + '</div>';
  }

  function catatan() {
    return '<p class="note">' + esc(D.statusData) + '. Pemakaian slang bergantung pada situasi, komunitas, dan daerah.</p>';
  }

  function kartuTunggal(r) {
    var s = S();
    var e = r.tunggal;
    var b = D.bahasa[e.bahasa];
    var slang = e.slang[s.pilih] || e.slang[0];
    var alt = e.slang.map(function (x, i) {
      return '<button type="button" class="chip chip-sm" aria-pressed="' + (i === s.pilih) + '" data-aksi="pilih" data-i="' + i + '">' + esc(x) + '</button>';
    }).join('');
    return '<article class="card result" data-b="' + e.bahasa + '">' + metaAtas() +
      '<div class="bridge">' +
        '<div class="bridge-node"><span class="bridge-label">' + esc(b.nama) + '</span><strong>' + esc(e.kata) + '</strong></div>' +
        '<div class="bridge-line" aria-hidden="true"><i class="bridge-dot"></i></div>' +
        '<div class="bridge-node bridge-to"><span class="bridge-label">Slang Gen Z</span><strong>' + esc(slang) + '</strong></div>' +
      '</div>' +
      '<div class="alt"><span class="mini">Padanan slang</span><div class="chip-row">' + alt + '</div></div>' +
      faktaEntri(e) +
      aksiSalin(LK.favBtn(e) + '<button type="button" class="btn btn-ghost btn-sm" data-detail="' + esc(e.id) + '">Lihat detail</button>') +
      catatan() + '</article>';
  }

  function kartuKalimat(r) {
    var susun = LK.translator.susun(r);
    var teks = r.tokens.map(function (t) {
      if (t.entry) return '<span class="hl" title="Dari: ' + esc(t.teks) + '">' + esc(t.entry.slang[0]) + esc(t.akhir || '') + '</span>';
      if (t.abaikan) return esc(t.teks);
      return '<span class="hl-miss" title="Belum ada di kamus contoh">' + esc(t.teks) + '</span>';
    }).join(' ');
    var uniq = [];
    r.tokens.forEach(function (t) { if (t.entry && uniq.indexOf(t.entry) === -1) uniq.push(t.entry); });
    var rincian = uniq.map(function (e) {
      return '<details class="rinci"><summary><strong>' + esc(e.kata) + '</strong><span class="arrow" aria-hidden="true">' + LK.icon('arrow', 14) + '</span><span class="rinci-slang">' + esc(e.slang.join(', ')) + '</span></summary>' + faktaEntri(e) + '</details>';
    }).join('');
    var legend = '<p class="legend"><span class="hl">kata</span> diterjemahkan dari kamus' +
      (r.belumAda.length ? ' <span class="hl-miss">kata</span> belum ada di kamus contoh, ditampilkan apa adanya' : '') + '</p>';
    var peringatan = r.belumAda.length
      ? '<p class="warn">' + r.belumAda.length + ' kata belum ada di kamus contoh: ' + r.belumAda.map(function (x) { return '<b>' + esc(x) + '</b>'; }).join(', ') + '. Kata itu tidak kami tebak.</p>'
      : '';
    return '<article class="card result" data-b="' + r.bahasa + '">' + metaAtas() +
      '<span class="mini">Hasil slang (per kata)</span>' +
      '<p class="slang-sentence">' + teks + '</p>' + legend +
      '<span class="mini">Susunan arti (per kata)</span>' +
      '<p class="arti-sentence">' + esc(susun.arti) + '</p>' + peringatan +
      '<p class="note">Terjemahan dilakukan kata demi kata dari kamus contoh. Susunan kalimat belum disesuaikan.</p>' +
      '<span class="mini">Rincian kata</span><div class="rinci-list">' + rincian + '</div>' +
      aksiSalin() + catatan() + '</article>';
  }

  function kartuMundur(r) {
    var items = r.cocok.slice(0, 5).map(function (e, i) {
      var b = D.bahasa[e.bahasa];
      return '<div class="rev-item">' +
        '<div class="rev-main"><span class="pill ' + (i < r.tepat ? 'pill-good' : 'pill-info') + '">' + (i < r.tepat ? 'Cocok' : 'Mirip') + '</span>' +
        '<strong class="rev-kata">' + esc(e.kata) + '</strong><span class="muted">' + esc(b.nama) + '</span></div>' +
        '<p><span class="mini">Arti</span> ' + esc(e.arti.join(' / ')) + '</p>' +
        '<p><span class="mini">Slang</span> ' + esc(e.slang.join(', ')) + '</p>' +
        '<p class="contoh-1">"' + esc(e.contoh.daerah) + '" berarti "' + esc(e.contoh.slang) + '"</p>' +
        '<div class="actions">' + LK.favBtn(e) + '<button type="button" class="btn btn-ghost btn-sm" data-detail="' + esc(e.id) + '">Lihat detail</button></div>' +
        '</div>';
    }).join('');
    return '<article class="card result">' + metaAtas() +
      '<span class="mini">Kata ' + esc(D.bahasa[r.bahasa].nama) + ' untuk "' + esc(r.input) + '"</span>' +
      '<div class="rev-list">' + items + '</div>' +
      aksiSalin() + catatan() + '</article>';
  }

  function kartuTidak(r) {
    var s = S();
    var b = D.bahasa[s.bahasa];
    var judul, isi;
    if (r.alasan === 'galat') {
      judul = 'Terjemahan belum bisa diproses';
      isi = 'Ada kendala saat memproses teksmu. Coba lagi sebentar lagi.';
    } else if (r.alasan === 'tidak-valid') {
      judul = 'Teksnya belum bisa dibaca';
      isi = 'Teks yang kamu tulis belum berisi huruf atau angka. Coba tulis satu kata dulu.';
    } else if (r.arah === 'slang-daerah') {
      judul = 'Belum ada padanan di kamus contoh';
      isi = 'Kami belum punya kata ' + b.nama + ' untuk "' + r.input + '". Kami tidak menebak supaya kamu tidak salah paham. Coba tulis dengan kata lain, misalnya "keren" atau "makasih".';
    } else {
      judul = 'Kata ini belum ada di kamus contoh';
      isi = 'Kami belum menemukan "' + r.input + '" di kamus ' + b.nama + '. Kami tidak menebak terjemahannya supaya kamu tidak salah paham. Kamus ini masih contoh prototype dan akan bertambah.';
    }
    var sar = (r.saran || []).map(function (e) {
      return '<button type="button" class="chip" data-aksi="contoh" data-v="' + esc(e.kata) + '">' + esc(e.kata) + '</button>';
    }).join('');
    return '<article class="card result result-empty">' +
      '<span class="empty-icon">' + LK.icon('search', 26) + '</span>' +
      '<h2>' + esc(judul) + '</h2><p>' + esc(isi) + '</p>' +
      (sar ? '<div class="alt"><span class="mini">Mungkin maksudmu</span><div class="chip-row">' + sar + '</div></div>' : '') +
      '<div class="actions"><button type="button" class="btn btn-primary btn-sm" data-aksi="buka-kamus">Jelajahi kamus ' + esc(b.pendek) + ' ' + LK.icon('arrow', 16) + '</button></div>' +
      '</article>';
  }

  function hasilHtml() {
    var s = S();
    if (s.loading) {
      return '<article class="card result skeleton" aria-busy="true"><p class="mono-label">Mencari di ' + esc(LK.translator.namaProvider().toLowerCase()) + '</p><div class="sk sk-1"></div><div class="sk sk-2"></div><div class="sk sk-3"></div></article>';
    }
    var r = s.hasil;
    if (!r) {
      return '<article class="card result result-empty"><span class="empty-icon">' + LK.icon('translate', 26) + '</span>' +
        '<h2>Hasil terjemahan muncul di sini</h2><p>Pilih bahasa, tulis kata atau kalimat, lalu tekan Terjemahkan. Kamu juga bisa mencoba salah satu contoh kata.</p></article>';
    }
    if (!r.ok) return kartuTidak(r);
    if (r.arah === 'slang-daerah') return kartuMundur(r);
    return r.tunggal ? kartuTunggal(r) : kartuKalimat(r);
  }

  function teksSalin() {
    var s = S();
    var r = s.hasil;
    if (!r || !r.ok) return '';
    if (r.arah === 'slang-daerah') return r.cocok[0].kata;
    return LK.translator.susun(r, s.pilih).slang;
  }

  /* ---------- Render sebagian ---------- */
  function elForm() { return document.getElementById('tr-form'); }
  function elHasil() { return document.getElementById('tr-hasil'); }
  function syncTeks() {
    var ta = document.getElementById('tr-input');
    if (ta) S().teks = ta.value;
  }
  function renderForm() { var f = elForm(); if (f) f.innerHTML = formHtml(); }
  function renderHasil() { var h = elHasil(); if (h) h.innerHTML = hasilHtml(); }

  function setGalat(pesan) {
    var s = S();
    s.galat = pesan;
    var g = document.getElementById('tr-galat');
    var ta = document.getElementById('tr-input');
    if (g) g.textContent = pesan;
    if (ta) { if (pesan) ta.setAttribute('aria-invalid', 'true'); else ta.removeAttribute('aria-invalid'); }
  }

  /* ---------- Aksi ---------- */
  function batalkan() {
    token++;
    S().loading = false;
    var btn = document.getElementById('tr-go');
    if (btn) { btn.disabled = false; btn.textContent = 'Terjemahkan'; }
  }

  function jalankan() {
    var s = S();
    if (s.loading) return Promise.resolve();
    syncTeks();
    var ta = document.getElementById('tr-input');
    if (!s.teks.trim()) {
      setGalat('Tulis dulu kata atau kalimatnya, ya.');
      s.hasil = null;
      renderHasil();
      if (ta) ta.focus();
      return Promise.resolve();
    }
    setGalat('');
    s.loading = true;
    s.demo = false;
    var mine = ++token;
    var btn = document.getElementById('tr-go');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spin" aria-hidden="true"></span>Mencari...'; }
    renderHasil();
    var req = { bahasa: s.bahasa, teks: s.teks, arah: s.arah };
    var jeda = LK.sleep(300); // jeda singkat agar umpan balik terlihat; provider API nanti punya jeda sendiri
    var panggil;
    try { panggil = Promise.resolve(LK.translator.translate(req)); } catch (e) { panggil = Promise.reject(e); }
    return panggil.then(function (r) { return r; }, function () { return { ok: false, alasan: 'galat', input: s.teks, bahasa: s.bahasa, arah: s.arah, saran: [] }; })
      .then(function (r) { return jeda.then(function () { return r; }); })
      .then(function (r) {
        if (mine !== token) return; // permintaan ini sudah dibatalkan atau diganti
        s.hasil = r;
        s.pilih = 0;
        s.loading = false;
        if (LK.current !== 'penerjemah') return;
        renderHasil();
        var b2 = document.getElementById('tr-go');
        if (b2) { b2.disabled = false; b2.textContent = 'Terjemahkan'; }
        var h = elHasil();
        if (h && h.scrollIntoView) h.scrollIntoView({ behavior: LK.reducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
      });
  }

  function tukar() {
    var s = S();
    batalkan();
    syncTeks();
    var r = s.hasil;
    var baru = null;
    if (r && r.ok) {
      if (r.arah === 'slang-daerah') baru = r.cocok[0].kata;
      else if (r.tunggal) baru = LK.translator.susun(r, s.pilih).slang;
    }
    s.arah = maju() ? 'slang-daerah' : 'daerah-slang';
    s.hasil = null; s.galat = ''; s.pilih = 0; s.demo = false;
    s.teks = baru || '';
    renderForm();
    renderHasil();
    if (baru) jalankan(); else { var ta = document.getElementById('tr-input'); if (ta) ta.focus(); }
  }

  function hapus() {
    var s = S();
    batalkan();
    s.teks = ''; s.hasil = null; s.galat = ''; s.demo = false; s.pilih = 0;
    var ta = document.getElementById('tr-input');
    if (ta) { ta.value = ''; ta.removeAttribute('aria-invalid'); ta.focus(); }
    var c = document.getElementById('tr-count');
    if (c) c.textContent = '0/' + MAX;
    setGalat('');
    renderHasil();
  }

  function salin(btn) {
    var teks = teksSalin();
    if (!teks) return;
    var asli = btn.innerHTML;
    LK.copy(teks).then(function (ok) {
      if (ok) {
        LK.toast('Berhasil disalin: ' + teks, 'ok');
        btn.classList.add('done');
        btn.innerHTML = LK.icon('check', 16) + 'Tersalin';
        setTimeout(function () {
          if (btn.isConnected) { btn.innerHTML = asli; btn.classList.remove('done'); }
        }, 1800);
      } else {
        LK.toast('Penyalinan otomatis tidak didukung di sini. Tekan lama hasilnya, lalu pilih Salin.', 'warn');
      }
    });
  }

  LK.page('penerjemah', {
    render: function () {
      return '' +
        '<section class="page-head wrap">' +
          '<p class="eyebrow">Penerjemah</p>' +
          '<h1>Ubah Bahasa Daerah Jadi Bahasa Gen Z</h1>' +
          '<p class="lead">Tulis kata atau kalimat, lalu lihat padanan slang, arti, dan konteks pemakaiannya. Hasil berasal dari kamus contoh, bukan dari AI.</p>' +
        '</section>' +
        '<section class="wrap tr-grid">' +
          '<div class="card tr-panel" id="tr-form">' + formHtml() + '</div>' +
          '<div class="tr-hasil" id="tr-hasil" aria-live="polite">' + hasilHtml() + '</div>' +
        '</section>';
    },

    mount: function (root) {
      var s = S();
      root.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-aksi]');
        if (!b || !root.contains(b)) return;
        var a = b.getAttribute('data-aksi');
        if (a === 'terjemah') jalankan();
        else if (a === 'tukar') tukar();
        else if (a === 'hapus') hapus();
        else if (a === 'salin') salin(b);
        else if (a === 'pilih') { s.pilih = parseInt(b.getAttribute('data-i'), 10) || 0; renderHasil(); }
        else if (a === 'contoh') {
          batalkan();
          var ta = document.getElementById('tr-input');
          s.teks = b.getAttribute('data-v');
          if (ta) ta.value = s.teks;
          var c = document.getElementById('tr-count');
          if (c) c.textContent = s.teks.length + '/' + MAX;
          setGalat('');
          jalankan();
        } else if (a === 'buka-kamus') {
          var k = LK.state.kamus;
          k.bahasa = s.bahasa; k.q = ''; k.kategori = 'semua'; k.favOnly = false;
          LK.go('kamus');
        }
      });

      root.addEventListener('change', function (ev) {
        if (ev.target.name !== 'bahasa') return;
        batalkan();
        syncTeks();
        s.bahasa = ev.target.value;
        s.hasil = null; s.galat = ''; s.pilih = 0; s.demo = false;
        renderForm();
        renderHasil();
        var on = root.querySelector('input[name="bahasa"]:checked');
        if (on) on.focus();
      });

      root.addEventListener('input', function (ev) {
        if (ev.target.id !== 'tr-input') return;
        s.teks = ev.target.value;
        var c = document.getElementById('tr-count');
        if (c) c.textContent = s.teks.length + '/' + MAX;
        if (s.galat) setGalat('');
      });

      root.addEventListener('keydown', function (ev) {
        if (ev.target.id === 'tr-input' && ev.key === 'Enter' && !ev.shiftKey) {
          ev.preventDefault();
          jalankan();
        }
      });

      if (s.autoRun) {
        s.autoRun = false;
        jalankan();
      } else if (!s.hasil && s.demo && s.teks) {
        var teksAwal = s.teks;
        LK.translator.translate({ bahasa: s.bahasa, teks: teksAwal, arah: s.arah }).then(function (r) {
          if (LK.current === 'penerjemah' && !s.hasil && s.teks === teksAwal && s.demo) { s.hasil = r; renderHasil(); }
        });
      }
    },

    leave: function () {
      token++;
      S().loading = false;
    }
  });
})();
