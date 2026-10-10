/* LINGKOR: halaman Quiz.
   Soal dan kunci jawaban dibaca dari data/soal.js. Urutan soal dan pilihan tidak diacak. */
(function () {
  'use strict';
  var LK = window.LK;
  var D = LK.data;
  var esc = LK.esc;
  var BEST = 'lingkor.quiz.terbaik';
  var JENIS = { arti: 'Arti kata', slang: 'Slang sesuai konteks', asal: 'Asal bahasa' };
  var HURUF = ['A', 'B', 'C', 'D'];

  function Q() { return LK.state.quiz; }
  function skor() {
    var q = Q();
    return D.soal.reduce(function (n, s, i) { return n + (q.jawaban[i] === s.benar ? 1 : 0); }, 0);
  }
  function levelUntuk(n) {
    var lv = D.levels[0];
    D.levels.forEach(function (l) { if (n >= l.min) lv = l; });
    return lv;
  }
  function root() { return document.getElementById('quiz-root'); }

  /* ---------- Tampilan ---------- */
  function mulaiHtml() {
    var terbaik = LK.store.get(BEST, null);
    var lv = D.levels.map(function (l, i) {
      var maks = i < D.levels.length - 1 ? D.levels[i + 1].min - 1 : D.soal.length;
      return '<li class="lv-item lv-' + l.id + '"><span class="lv-ic">' + LK.icon(l.ikon, 22) + '</span><div><strong>' + esc(l.nama) + '</strong><span class="muted">Skor ' + l.min + ' sampai ' + maks + '</span></div></li>';
    }).join('');
    return '<div class="card quiz-card">' +
      '<div class="quiz-intro">' +
        '<h2>Siap menguji bahasamu?</h2>' +
        '<p>' + D.soal.length + ' soal pilihan ganda: arti kata daerah, slang yang sesuai konteks, dan asal bahasa. Setiap soal punya empat pilihan dan penjelasan singkat setelah kamu menjawab.</p>' +
        '<ul class="lv-list">' + lv + '</ul>' +
        (terbaik !== null ? '<p class="best">Skor terbaikmu: <strong>' + terbaik + '/' + D.soal.length + '</strong></p>' : '') +
        '<button type="button" class="btn btn-cta" data-aksi="mulai">Mulai Tantangan ' + LK.icon('arrow', 18) + '</button>' +
      '</div></div>';
  }

  function soalHtml() {
    var q = Q();
    var s = D.soal[q.i];
    var dipilih = q.jawaban[q.i];
    var sudah = dipilih !== undefined;
    var total = D.soal.length;
    var opsi = s.pilihan.map(function (p, n) {
      var kelas = 'opt';
      var tanda = '';
      if (sudah) {
        if (n === s.benar) { kelas += ' opt-benar'; tanda = LK.icon('check', 18); }
        else if (n === dipilih) { kelas += ' opt-salah'; tanda = LK.icon('x', 18); }
        else kelas += ' opt-diam';
      }
      return '<li><button type="button" class="' + kelas + '" data-aksi="pilih" data-n="' + n + '"' + (sudah ? ' aria-disabled="true"' : '') + '>' +
        '<span class="opt-l">' + HURUF[n] + '</span><span class="opt-t">' + esc(p) + '</span><span class="opt-m">' + tanda + '</span></button></li>';
    }).join('');

    var umpan = '';
    if (sudah) {
      var benar = dipilih === s.benar;
      umpan = '<div class="feedback ' + (benar ? 'fb-benar' : 'fb-salah') + '" role="status">' +
        '<strong>' + (benar ? 'Benar!' : 'Kurang tepat') + '</strong>' +
        (benar ? '' : '<p>Pilihanmu: "' + esc(s.pilihan[dipilih]) + '". ' + esc(s.catatan[dipilih]) + '</p>') +
        '<p>' + (benar ? '' : 'Jawaban yang benar: "' + esc(s.pilihan[s.benar]) + '". ') + esc(s.penjelasan) + '</p>' +
        '</div>' +
        '<button type="button" class="btn btn-primary" data-aksi="lanjut">' + (q.i === total - 1 ? 'Lihat Hasil' : 'Soal Berikutnya') + ' ' + LK.icon('arrow', 18) + '</button>';
    }

    return '<div class="card quiz-card">' +
      '<div class="quiz-top"><span class="quiz-n">Soal ' + (q.i + 1) + ' dari ' + total + '</span><span class="pill pill-info">' + esc(JENIS[s.jenis]) + '</span></div>' +
      '<div class="progress" role="progressbar" aria-label="Kemajuan quiz" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + (q.i + (sudah ? 1 : 0)) + '"><i style="--w:' + (((q.i + (sudah ? 1 : 0)) / total) * 100) + '%"></i></div>' +
      '<h2 class="quiz-tanya" tabindex="-1" id="quiz-tanya">' + esc(s.tanya) + '</h2>' +
      '<ol class="opts" aria-label="Pilihan jawaban">' + opsi + '</ol>' + umpan +
      '</div>';
  }

  function hasilHtml() {
    var q = Q();
    var n = skor();
    var total = D.soal.length;
    var lv = levelUntuk(n);
    var persen = Math.round((n / total) * 100);
    var tangga = D.levels.map(function (l) {
      return '<li class="lv-item lv-' + l.id + (l.id === lv.id ? ' on' : '') + '"><span class="lv-ic">' + LK.icon(l.ikon, 22) + '</span><div><strong>' + esc(l.nama) + '</strong></div></li>';
    }).join('');
    var tinjau = D.soal.map(function (s, i) {
      var ok = q.jawaban[i] === s.benar;
      return '<li class="rv ' + (ok ? 'rv-ok' : 'rv-no') + '"><span class="rv-m">' + LK.icon(ok ? 'check' : 'x', 16) + '</span><div><p>' + esc(s.tanya) + '</p>' +
        '<p class="muted">Jawaban benar: ' + esc(s.pilihan[s.benar]) + (ok ? '' : '. Pilihanmu: ' + esc(s.pilihan[q.jawaban[i]])) + '</p></div></li>';
    }).join('');
    return '<div class="card quiz-card quiz-hasil">' +
      '<p class="mono-label">Hasil akhir</p>' +
      '<div class="score-row">' +
        '<div class="score-ring" style="--p:' + persen + '"><div><strong>' + n + '</strong><span>dari ' + total + '</span></div></div>' +
        '<div><h2 id="quiz-tanya" tabindex="-1">Level kamu: ' + esc(lv.nama) + '</h2>' +
        '<p><strong>' + n + ' jawaban benar</strong> dari ' + total + ' soal (' + persen + '%).</p></div>' +
      '</div>' +
      '<p class="pesan">' + esc(lv.pesan) + '</p>' +
      '<ul class="lv-list lv-row">' + tangga + '</ul>' +
      '<div class="actions">' +
        '<button type="button" class="btn btn-cta" data-aksi="ulang">' + LK.icon('refresh', 18) + 'Ulangi Quiz</button>' +
        '<a class="btn btn-ghost" href="#kamus">Buka Kamus</a>' +
      '</div>' +
      '<details class="tinjau"><summary>Lihat jawaban per soal</summary><ol class="rv-list">' + tinjau + '</ol></details>' +
      '</div>';
  }

  function tampil(fokus) {
    var el = root();
    if (!el) return;
    var q = Q();
    el.innerHTML = q.tahap === 'mulai' ? mulaiHtml() : (q.tahap === 'hasil' ? hasilHtml() : soalHtml());
    if (fokus) {
      var t = el.querySelector(fokus);
      if (t) { if (fokus === '#quiz-tanya') t.focus({ preventScroll: true }); else t.focus(); }
    }
  }

  /* ---------- Aksi ---------- */
  function mulai() {
    var q = Q();
    q.tahap = 'soal'; q.i = 0; q.jawaban = [];
    tampil('#quiz-tanya');
    window.scrollTo(0, 0);
  }

  function pilih(n) {
    var q = Q();
    if (q.jawaban[q.i] !== undefined) return;
    q.jawaban[q.i] = n;
    tampil('[data-aksi="lanjut"]');
  }

  function lanjut() {
    var q = Q();
    if (q.jawaban[q.i] === undefined) return;
    if (q.i < D.soal.length - 1) {
      q.i++;
      tampil('#quiz-tanya');
    } else {
      q.tahap = 'hasil';
      var n = skor();
      var lama = LK.store.get(BEST, null);
      if (lama === null || n > lama) LK.store.set(BEST, n);
      tampil('#quiz-tanya');
    }
    window.scrollTo(0, 0);
  }

  LK.page('quiz', {
    render: function () {
      return '' +
        '<section class="page-head wrap">' +
          '<p class="eyebrow">Quiz</p>' +
          '<h1>Tantangan Bahasa Nusantara</h1>' +
          '<p class="lead">Uji pemahamanmu tentang kata daerah dan padanan slangnya, lalu lihat level yang kamu capai.</p>' +
        '</section>' +
        '<section class="wrap quiz-wrap"><div id="quiz-root"></div></section>';
    },

    mount: function (rootEl) {
      tampil(null);
      rootEl.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-aksi]');
        if (!b || !rootEl.contains(b)) return;
        var a = b.getAttribute('data-aksi');
        if (a === 'mulai' || a === 'ulang') mulai();
        else if (a === 'pilih') pilih(parseInt(b.getAttribute('data-n'), 10));
        else if (a === 'lanjut') lanjut();
      });
    }
  });
})();
