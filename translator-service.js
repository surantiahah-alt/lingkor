/* LINGKOR: layanan penerjemah.
   Prototype ini memakai provider "lokal" yang hanya mencari di data kamus (data/kamus.js).
   Tidak ada AI, tidak ada database online, dan tidak ada tebakan: kata yang tidak ada
   di kamus dilaporkan sebagai "belum ditemukan".

   Cara menghubungkan API di kemudian hari:
     LK.translator.register('api', {
       nama: 'API penerjemah',
       translate: async function (req) { ... return hasil; }
     });
     LK.translator.provider = 'api';
   `req`   = { bahasa, teks, arah }  (arah: 'daerah-slang' atau 'slang-daerah')
   `hasil` = bentuk yang sama dengan hasil provider lokal di bawah ini. */
(function () {
  'use strict';
  var LK = window.LK;
  var D = LK.data;
  var cache = {};

  function index(bahasa) {
    if (cache[bahasa]) return cache[bahasa];
    var map = new Map();
    var maxN = 1;
    D.kamus.filter(function (e) { return e.bahasa === bahasa; }).forEach(function (e) {
      [e.kata].concat(e.varian || []).forEach(function (k) {
        var key = LK.norm(k);
        if (!key) return;
        map.set(key, e);
        maxN = Math.max(maxN, key.split(' ').length);
      });
    });
    cache[bahasa] = { map: map, maxN: maxN };
    return cache[bahasa];
  }

  function akhiran(raw) {
    var m = raw.match(/[^\p{L}\p{N}]+$/u);
    return m ? m[0] : '';
  }

  function lev(a, b) {
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[b.length];
  }

  // Saran kata mirip dari bahasa yang sama (hanya untuk membantu, bukan terjemahan).
  function saran(bahasa, kata) {
    var q = LK.norm(kata);
    if (q.length < 2) return [];
    var batas = q.length <= 4 ? 1 : 2;
    var hasil = [];
    D.kamus.forEach(function (e) {
      if (e.bahasa !== bahasa) return;
      var jarak = 99;
      [e.kata].concat(e.varian || []).forEach(function (k) {
        var n = LK.norm(k);
        var d = lev(q, n);
        if (n.indexOf(q) === 0 || q.indexOf(n) === 0) d = Math.min(d, 1);
        jarak = Math.min(jarak, d);
      });
      if (jarak <= batas) hasil.push({ e: e, d: jarak });
    });
    hasil.sort(function (a, b) { return a.d - b.d; });
    return hasil.slice(0, 3).map(function (x) { return x.e; });
  }

  function maju(bahasa, teks) {
    var idx = index(bahasa);
    var raw = teks.split(/\s+/).filter(Boolean);
    var nt = raw.map(LK.norm);
    var tokens = [];
    var i = 0;
    while (i < raw.length) {
      if (!nt[i]) { tokens.push({ teks: raw[i], entry: null, abaikan: true }); i++; continue; }
      var hit = null;
      for (var n = Math.min(idx.maxN, raw.length - i); n >= 1; n--) {
        var bagian = nt.slice(i, i + n);
        if (bagian.some(function (p) { return !p; })) continue;
        var key = bagian.join(' ');
        if (idx.map.has(key)) { hit = { entry: idx.map.get(key), n: n }; break; }
      }
      if (hit) {
        tokens.push({ teks: raw.slice(i, i + hit.n).join(' '), entry: hit.entry, akhir: akhiran(raw[i + hit.n - 1]) });
        i += hit.n;
      } else {
        tokens.push({ teks: raw[i], entry: null });
        i++;
      }
    }
    var dikenali = tokens.filter(function (t) { return t.entry; });
    var belumAda = tokens.filter(function (t) { return !t.entry && !t.abaikan; }).map(function (t) { return t.teks; });
    if (!dikenali.length) {
      var s = [];
      if (belumAda.length) s = saran(bahasa, belumAda[0]);
      return { ok: false, alasan: belumAda.length ? 'tidak-ditemukan' : 'tidak-valid', input: teks, bahasa: bahasa, arah: 'daerah-slang', saran: s };
    }
    return {
      ok: true, arah: 'daerah-slang', bahasa: bahasa, input: teks, tokens: tokens,
      tunggal: (tokens.length === 1 && tokens[0].entry) ? tokens[0].entry : null,
      belumAda: belumAda
    };
  }

  function mundur(bahasa, teks) {
    var q = LK.norm(teks);
    if (!q) return { ok: false, alasan: 'tidak-valid', input: teks, bahasa: bahasa, arah: 'slang-daerah', saran: [] };
    var tepat = [], mirip = [];
    D.kamus.forEach(function (e) {
      if (e.bahasa !== bahasa) return;
      var terms = e.slang.concat(e.arti).map(LK.norm);
      if (terms.indexOf(q) > -1) tepat.push(e);
      else if (terms.some(function (t) { return t.split(' ').indexOf(q) > -1 || (q.length >= 3 && t.indexOf(q) > -1); })) mirip.push(e);
    });
    var cocok = tepat.concat(mirip);
    if (!cocok.length) return { ok: false, alasan: 'tidak-ditemukan', input: teks, bahasa: bahasa, arah: 'slang-daerah', saran: [] };
    return { ok: true, arah: 'slang-daerah', bahasa: bahasa, input: teks, cocok: cocok, tepat: tepat.length };
  }

  var lokal = {
    id: 'lokal',
    nama: 'Kamus lokal (prototype)',
    translate: function (req) {
      var teks = String(req.teks || '').trim();
      if (!teks) return Promise.resolve({ ok: false, alasan: 'kosong', input: '', bahasa: req.bahasa, arah: req.arah, saran: [] });
      var hasil = req.arah === 'slang-daerah' ? mundur(req.bahasa, teks) : maju(req.bahasa, teks);
      hasil.sumber = 'lokal';
      return Promise.resolve(hasil);
    }
  };

  LK.translator = {
    provider: 'lokal',
    providers: { lokal: lokal },
    register: function (nama, p) { this.providers[nama] = p; },
    translate: function (req) {
      var p = this.providers[this.provider] || this.providers.lokal;
      return p.translate(req);
    },
    namaProvider: function () { return (this.providers[this.provider] || lokal).nama; },

    // Menyusun teks hasil dari hasil provider: slang per kata dan arti per kata.
    susun: function (hasil, pilih) {
      pilih = pilih || 0;
      if (!hasil || !hasil.ok || hasil.arah !== 'daerah-slang') return { slang: '', arti: '' };
      var slang = hasil.tokens.map(function (t) {
        if (!t.entry) return t.teks;
        var s = (hasil.tunggal ? t.entry.slang[pilih] : t.entry.slang[0]) || t.entry.slang[0];
        return s + (t.akhir || '');
      }).join(' ');
      var arti = hasil.tokens.map(function (t) {
        return t.entry ? t.entry.arti[0] + (t.akhir || '') : t.teks;
      }).join(' ');
      return { slang: slang, arti: arti };
    }
  };
})();
