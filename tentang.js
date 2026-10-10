/* LINGKOR: halaman Tentang. */
(function () {
  'use strict';
  var LK = window.LK;
  var D = LK.data;
  var esc = LK.esc;

  var TUJUAN = [
    { ikon: 'people', judul: 'Mendekatkan bahasa daerah dengan generasi muda', isi: 'Bahasa daerah disajikan lewat gaya yang akrab dengan anak muda, sehingga terasa dekat dan tidak kuno.' },
    { ikon: 'layers', judul: 'Memahami hubungan tiga ragam bahasa', isi: 'Pengguna melihat bagaimana bahasa daerah, bahasa Indonesia, dan slang digital saling terhubung dalam satu kata.' },
    { ikon: 'book', judul: 'Mendorong dokumentasi kosakata daerah', isi: 'Setiap kata dicatat bersama arti, konteks, dan contoh kalimat agar bisa dikembangkan menjadi korpus.' },
    { ikon: 'leaf', judul: 'Mendukung pelestarian budaya lewat teknologi', isi: 'Teknologi digital dipakai sebagai wadah belajar dan merawat kekayaan bahasa Nusantara.' }
  ];

  LK.page('tentang', {
    render: function () {
      var tujuan = TUJUAN.map(function (t) {
        return '<li class="card goal"><span class="f-icon f-purple">' + LK.icon(t.ikon, 22) + '</span><div><h3>' + esc(t.judul) + '</h3><p>' + esc(t.isi) + '</p></div></li>';
      }).join('');

      return '' +
        '<section class="page-head wrap">' +
          '<p class="eyebrow">Tentang</p>' +
          '<h1>Tentang LINGKOR</h1>' +
          '<p class="lead">LINGKOR singkatan dari Linguistik Korpus Nusantara. Platform ini menghubungkan bahasa daerah Indonesia dengan bahasa slang yang dipakai generasi muda di media sosial.</p>' +
        '</section>' +

        '<section class="wrap section-tight">' +
          '<h2 class="h2-sm">Tujuan LINGKOR</h2>' +
          '<ul class="goals">' + tujuan + '</ul>' +
        '</section>' +

        '<section class="wrap section-tight">' +
          '<div class="callout">' +
            '<h2 class="h2-sm">Tentang slang</h2>' +
            '<p>Slang adalah ragam bahasa yang pemakaiannya bergantung pada konteks, komunitas, dan perkembangan zaman. Kata yang populer hari ini bisa terdengar usang beberapa tahun lagi, dan satu kata bisa bermakna lain di komunitas yang berbeda.</p>' +
            '<p><strong>Tidak semua kata bahasa daerah mempunyai padanan slang yang tepat.</strong> Karena itu LINGKOR menampilkan beberapa pilihan padanan beserta konteksnya, dan menyatakan "belum ditemukan" ketika sebuah kata memang belum ada di data.</p>' +
          '</div>' +
        '</section>' +

        '<section class="wrap section-tight about-two">' +
          '<div class="card">' +
            '<h2 class="h2-sm">Status prototype</h2>' +
            '<ul class="plain">' +
              '<li>Saat ini ada ' + D.kamus.length + ' entri contoh dalam ' + Object.keys(D.bahasa).length + ' bahasa daerah dan ' + D.soal.length + ' soal quiz.</li>' +
              '<li>Seluruh entri adalah contoh prototype dan belum diverifikasi ahli bahasa.</li>' +
              '<li>Penerjemah hanya mencari di kamus lokal. Tidak ada AI atau database online yang terhubung.</li>' +
              '<li>Korpus yang utuh membutuhkan kontribusi penutur asli dan verifikasi ahli bahasa.</li>' +
            '</ul>' +
          '</div>' +
          '<div class="card">' +
            '<h2 class="h2-sm">Untuk pengembang</h2>' +
            '<p>Data, logika, dan tampilan dipisahkan agar mudah dikembangkan. Provider penerjemah bisa diganti API tanpa mengubah halaman.</p>' +
            '<pre class="code" tabindex="0">data/kamus.js        entri kamus\ndata/soal.js         soal dan level quiz\njs/core.js           router, ikon, favorit\njs/translator-service.js\n                     provider penerjemah\njs/pages/*.js        halaman (UI)\ncss/styles.css       gaya dan tema</pre>' +
          '</div>' +
        '</section>';
    }
  });
})();
