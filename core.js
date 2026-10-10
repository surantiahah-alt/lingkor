/* LINGKOR: inti aplikasi.
   Isi: state bersama, utilitas, ikon, penyimpanan (localStorage dengan cadangan memori),
   favorit, toast, lembar detail (sheet), tema, dan router berbasis hash. */
(function () {
  'use strict';
  var LK = (window.LK = window.LK || {});
  var D = (LK.data = window.LINGKOR_DATA);

  /* ---------- State bersama antarhalaman ---------- */
  LK.state = {
    kamus: { q: '', bahasa: 'semua', kategori: 'semua', favOnly: false },
    penerjemah: { bahasa: 'jawa', arah: 'daerah-slang', teks: 'ora popo', hasil: null, pilih: 0, galat: '', loading: false, demo: true, autoRun: false },
    quiz: { tahap: 'mulai', i: 0, jawaban: [] }
  };

  /* ---------- Utilitas ---------- */
  LK.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  // Normalisasi untuk pencarian: huruf kecil, tanpa aksen, tanpa tanda baca.
  LK.norm = function (s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/['’`´]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  };

  LK.sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  LK.reducedMotion = function () {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  };
  LK.entry = function (id) {
    for (var i = 0; i < D.kamus.length; i++) if (D.kamus[i].id === id) return D.kamus[i];
    return null;
  };
  LK.kategoriNama = function (id) {
    for (var i = 0; i < D.kategori.length; i++) if (D.kategori[i].id === id) return D.kategori[i].nama;
    return id;
  };
  LK.badgeBahasa = function (b) {
    return '<span class="badge badge-' + b + '">' + LK.esc(D.bahasa[b].pendek) + '</span>';
  };

  /* ---------- Ikon (garis, 24px) ---------- */
  var ICONS = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    translate: '<path d="M4 8h13l-3-3"/><path d="M20 16H7l3 3"/>',
    book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2"/><path d="M8 7.5h8"/><path d="M8 11h5"/>',
    quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><path d="M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    heart: '<path d="M12 20.5s-8-4.8-9.4-10A5 5 0 0 1 12 7.2a5 5 0 0 1 9.4 3.3c-1.4 5.2-9.4 10-9.4 10z"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
    swap: '<path d="M7 4 3 8l4 4"/><path d="M3 8h14"/><path d="m17 20 4-4-4-4"/><path d="M21 16H7"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2 5.3"/><path d="M20 4v7h-7"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    sprout: '<path d="M12 21v-8"/><path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6z"/><path d="M12 15c0-3-2-5-6-5 0 3 2 5 6 5z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.8"/><path d="M18 14.3c1.8.8 3 2.6 3 4.7"/>',
    leaf: '<path d="M5 19c0-8 5-14 15-14 0 9-5 15-13 15"/><path d="M5 19c3-4 6-7 10-9"/>'
  };
  LK.icon = function (name, size) {
    size = size || 20;
    return '<svg class="ic" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONS[name] || '') + '</svg>';
  };

  /* ---------- Penyimpanan ---------- */
  var mem = {};
  LK.store = {
    get: function (k, def) {
      try {
        var v = window.localStorage.getItem(k);
        if (v !== null) return JSON.parse(v);
      } catch (e) { /* diabaikan: pakai memori */ }
      return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : def;
    },
    set: function (k, v) {
      mem[k] = v;
      try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* diabaikan */ }
    }
  };

  /* ---------- Favorit (localStorage) ---------- */
  var FAV_KEY = 'lingkor.favorit.v1';
  LK.fav = {
    list: function () {
      var v = LK.store.get(FAV_KEY, []);
      return Array.isArray(v) ? v : [];
    },
    has: function (id) { return this.list().indexOf(id) > -1; },
    count: function () { return this.list().length; },
    toggle: function (id) {
      var l = this.list();
      var i = l.indexOf(id);
      if (i > -1) l.splice(i, 1); else l.push(id);
      LK.store.set(FAV_KEY, l);
      return i === -1;
    }
  };
  LK.favBtn = function (e) {
    var on = LK.fav.has(e.id);
    return '<button type="button" class="fav' + (on ? ' on' : '') + '" data-fav-toggle="' + LK.esc(e.id) + '" aria-pressed="' + on + '" aria-label="' + (on ? 'Hapus dari favorit: ' : 'Simpan ke favorit: ') + LK.esc(e.kata) + '">' + LK.icon('heart', 20) + '</button>';
  };
  function syncFav(id) {
    var e = LK.entry(id);
    var on = LK.fav.has(id);
    document.querySelectorAll('[data-fav-toggle="' + id + '"]').forEach(function (b) {
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', (on ? 'Hapus dari favorit: ' : 'Simpan ke favorit: ') + e.kata);
    });
  }

  /* ---------- Toast dan salin ---------- */
  var toastTimer = null;
  LK.toast = function (msg, tone) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'toast show' + (tone ? ' toast-' + tone : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.className = 'toast'; }, 2600);
  };

  LK.copy = function (text) {
    function cadangan() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      ta.remove();
      return ok;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return cadangan(); });
    }
    return Promise.resolve(cadangan());
  };

  /* ---------- Lembar detail (sheet) ---------- */
  var lastFocus = null;
  LK.openSheet = function (html, label) {
    var root = document.getElementById('sheet-root');
    lastFocus = document.activeElement;
    root.innerHTML =
      '<div class="sheet-backdrop" data-sheet-close></div>' +
      '<div class="sheet" role="dialog" aria-modal="true" aria-label="' + LK.esc(label) + '" tabindex="-1">' +
      '<button type="button" class="icon-btn sheet-x" data-sheet-close aria-label="Tutup detail">' + LK.icon('x', 20) + '</button>' +
      '<div class="sheet-body">' + html + '</div></div>';
    document.body.classList.add('sheet-open');
    var s = root.querySelector('.sheet');
    if (s) s.focus();
  };
  LK.closeSheet = function () {
    var root = document.getElementById('sheet-root');
    if (!root || !root.firstChild) return;
    root.innerHTML = '';
    document.body.classList.remove('sheet-open');
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) { /* diabaikan */ } }
  };

  /* ---------- Tema ---------- */
  var THEME_KEY = 'lingkor.tema';
  function terapkanTema(v) {
    var r = document.documentElement;
    if (v === 'dark' || v === 'light') r.setAttribute('data-theme', v); else r.removeAttribute('data-theme');
  }
  function temaSaatIni() {
    var a = document.documentElement.getAttribute('data-theme');
    if (a) return a;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function perbaruiTombolTema() {
    var b = document.getElementById('theme-toggle');
    if (!b) return;
    var gelap = temaSaatIni() === 'dark';
    b.innerHTML = LK.icon(gelap ? 'sun' : 'moon', 20);
    b.setAttribute('aria-label', gelap ? 'Ganti ke tema terang' : 'Ganti ke tema gelap');
  }
  LK.initTheme = function () {
    var s = LK.store.get(THEME_KEY, null);
    if (s) terapkanTema(s);
    perbaruiTombolTema();
  };
  LK.toggleTheme = function () {
    var next = temaSaatIni() === 'dark' ? 'light' : 'dark';
    terapkanTema(next);
    LK.store.set(THEME_KEY, next);
    perbaruiTombolTema();
  };

  /* ---------- Router berbasis hash ---------- */
  var NAV = ['beranda', 'penerjemah', 'kamus', 'quiz', 'tentang'];
  LK.pages = {};
  LK.page = function (name, def) { LK.pages[name] = def; };
  LK.current = null;

  LK.render = function (awal) {
    var raw = (window.location.hash || '').replace('#', '');
    var name = NAV.indexOf(raw) > -1 ? raw : 'beranda';
    var view = document.getElementById('view');
    var prev = LK.current && LK.pages[LK.current];
    if (prev && prev.leave) prev.leave();
    LK.closeSheet();
    LK.current = name;
    var page = LK.pages[name];
    view.innerHTML = '<div class="view-enter">' + page.render() + '</div>';
    if (page.mount) page.mount(view);
    document.querySelectorAll('[data-route]').forEach(function (a) {
      if (a.getAttribute('data-route') === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
    if (!awal) {
      var h = view.querySelector('h1');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    }
  };

  LK.go = function (name) {
    var now = (window.location.hash || '').replace('#', '');
    if (now === name) LK.render(); else window.location.hash = name;
  };

  /* ---------- Penanganan klik global ---------- */
  document.addEventListener('click', function (ev) {
    var t = ev.target;
    if (!t || !t.closest) return;

    var fav = t.closest('[data-fav-toggle]');
    if (fav) {
      var id = fav.getAttribute('data-fav-toggle');
      var e = LK.entry(id);
      var nowOn = LK.fav.toggle(id);
      syncFav(id);
      LK.toast((nowOn ? 'Disimpan ke favorit: ' : 'Dihapus dari favorit: ') + e.kata);
      document.dispatchEvent(new CustomEvent('lk:fav', { detail: { id: id } }));
      return;
    }
    if (t.closest('[data-sheet-close]')) { LK.closeSheet(); return; }
    var det = t.closest('[data-detail]');
    if (det && LK.openDetail) { LK.openDetail(det.getAttribute('data-detail')); return; }
    var go = t.closest('[data-go]');
    if (go) { ev.preventDefault(); LK.closeSheet(); LK.go(go.getAttribute('data-go')); }
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { LK.closeSheet(); return; }
    if (ev.key !== 'Tab') return;
    var sheet = document.querySelector('.sheet');
    if (!sheet) return;
    var f = sheet.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (ev.shiftKey && (document.activeElement === first || document.activeElement === sheet)) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
  });
})();
