/* LINGKOR: data soal quiz.
   Kunci jawaban ada di properti `benar` (indeks pilihan, mulai dari 0) dan tidak diacak,
   sehingga penilaian selalu sama setiap quiz dimainkan.
   `catatan` berisi alasan singkat untuk tiap pilihan; pilihan yang benar dikosongkan. */
(function () {
  'use strict';
  var D = (window.LINGKOR_DATA = window.LINGKOR_DATA || {});

  D.levels = [
    { id: 'pemula', nama: 'Pemula', min: 0, ikon: 'sprout',
      pesan: 'Perjalanan baru dimulai. Buka Kamus, baca beberapa kata, lalu coba lagi. Skormu pasti naik.' },
    { id: 'penjelajah', nama: 'Penjelajah', min: 5, ikon: 'compass',
      pesan: 'Kamu sudah mulai membaca peta bahasa Nusantara. Sedikit lagi menuju Ahli Bahasa.' },
    { id: 'ahli', nama: 'Ahli Bahasa', min: 9, ikon: 'star',
      pesan: 'Luar biasa! Kamu memahami kata daerah sekaligus gaya slang generasi muda.' }
  ];

  D.soal = [
    {
      id: 'q1', jenis: 'arti',
      tanya: 'Dalam Bahasa Jawa, "mangan" berarti...',
      pilihan: ['Minum', 'Makan', 'Tidur', 'Mandi'], benar: 1,
      penjelasan: '"Mangan" adalah bentuk ngoko untuk "makan". Bentuk yang lebih halus adalah "dhahar" atau "nedha".',
      catatan: ['"Minum" dalam Bahasa Jawa adalah "ngombe".', '', '"Tidur" dalam Bahasa Jawa adalah "turu".', '"Mandi" dalam Bahasa Jawa adalah "adus".']
    },
    {
      id: 'q2', jenis: 'arti',
      tanya: 'Orang Sunda mengucap "punten" ketika...',
      pilihan: ['ingin permisi atau meminta maaf', 'berpamitan pulang', 'mengucapkan terima kasih', 'mengajak makan bersama'], benar: 0,
      penjelasan: '"Punten" dipakai untuk permisi, misalnya saat lewat di depan orang, dan juga untuk meminta maaf hal kecil.',
      catatan: ['', 'Berpamitan memakai ungkapan lain; "punten" bukan salam perpisahan.', 'Terima kasih dalam Bahasa Sunda adalah "hatur nuhun".', '"Punten" tidak dipakai untuk mengajak makan.']
    },
    {
      id: 'q3', jenis: 'arti',
      tanya: '"Sakalangkong" dalam Bahasa Madura dipakai untuk mengucapkan...',
      pilihan: ['Selamat pagi', 'Terima kasih', 'Permisi', 'Selamat tinggal'], benar: 1,
      penjelasan: '"Sakalangkong", biasanya dalam bentuk "mator sakalangkong", adalah ucapan terima kasih yang sopan.',
      catatan: ['"Sakalangkong" bukan salam menurut waktu.', '', 'Kata ini tidak dipakai untuk meminta jalan.', 'Kata ini bukan ungkapan berpisah.']
    },
    {
      id: 'q4', jenis: 'arti',
      tanya: '"Lamak" dalam Bahasa Minangkabau berarti...',
      pilihan: ['Pedas', 'Mahal', 'Enak', 'Jauh'], benar: 2,
      penjelasan: '"Lamak" berarti enak, misalnya "lamak bana" untuk "enak sekali".',
      catatan: ['"Lamak" menggambarkan rasa yang enak, bukan tingkat pedas.', '"Lamak" tidak berkaitan dengan harga.', '', '"Lamak" bukan keterangan jarak.']
    },
    {
      id: 'q5', jenis: 'slang',
      tanya: 'Temanmu minta maaf karena terlambat. Kamu menjawab "ora popo". Padanan slang yang paling pas?',
      pilihan: ['Gapapa, santuy aja', 'Gas, sekarang juga', 'Cuan banget', 'Baper nih'], benar: 0,
      penjelasan: '"Ora popo" berarti tidak apa-apa. "Gapapa" dan "santuy" menyampaikan nuansa menenangkan yang sama.',
      catatan: ['', '"Gas" berarti ajakan bersemangat untuk berangkat atau mulai, bukan menenangkan.', '"Cuan" berarti keuntungan, tidak ada hubungannya dengan memaafkan.', '"Baper" berarti terbawa perasaan; maknanya berbeda dari "tidak apa-apa".']
    },
    {
      id: 'q6', jenis: 'slang',
      tanya: 'Kamu ingin mengucap "hatur nuhun" di chat dengan gaya anak muda. Pilihan yang paling dekat?',
      pilihan: ['Gabut', 'Makasih banget', 'Mager', 'Cabut dulu'], benar: 1,
      penjelasan: '"Hatur nuhun" berarti terima kasih, dan "makasih banget" adalah versi santainya.',
      catatan: ['"Gabut" berarti tidak ada kegiatan, bukan ungkapan terima kasih.', '', '"Mager" berarti malas gerak.', '"Cabut" berarti pergi atau pamit.']
    },
    {
      id: 'q7', jenis: 'slang',
      tanya: 'Sepatu temanmu bagus. Kamu bilang "Mbois tenan!". Padanan slang yang cocok?',
      pilihan: ['Keren abis!', 'Mager banget', 'Receh banget', 'Bucin parah'], benar: 0,
      penjelasan: '"Mbois" berarti keren atau hebat, sehingga "keren abis" atau "kece" adalah padanan yang paling dekat.',
      catatan: ['', '"Mager" berarti malas gerak.', '"Receh" berarti remeh atau lelucon yang garing.', '"Bucin" berarti terlalu tergila-gila pada pasangan.']
    },
    {
      id: 'q8', jenis: 'slang',
      tanya: 'Setelah putus cinta, kamu merasa "ambyar". Padanan slang yang paling dekat?',
      pilihan: ['Santuy', 'Mantul', 'Galau', 'Gaskeun'], benar: 2,
      penjelasan: '"Ambyar" menggambarkan hati yang hancur. "Galau" adalah padanan slang yang paling umum.',
      catatan: ['"Santuy" berarti santai, maknanya berlawanan dengan patah hati.', '"Mantul" berarti mantap betul, nuansanya positif.', '', '"Gaskeun" berarti ajakan untuk segera berangkat atau mulai.']
    },
    {
      id: 'q9', jenis: 'asal',
      tanya: 'Sapaan "Uda" untuk kakak laki-laki berasal dari bahasa...',
      pilihan: ['Jawa', 'Sunda', 'Madura', 'Minangkabau'], benar: 3,
      penjelasan: '"Uda" adalah sapaan untuk kakak laki-laki dalam Bahasa Minangkabau. Pasangannya "Uni" untuk kakak perempuan.',
      catatan: ['Penutur Jawa lebih umum memakai "mas" untuk kakak laki-laki.', 'Penutur Sunda lebih umum memakai "kang" atau "aa".', 'Bukan sapaan khas Madura.', '']
    },
    {
      id: 'q10', jenis: 'asal',
      tanya: 'Kata "geulis" yang berarti cantik berasal dari bahasa...',
      pilihan: ['Jawa', 'Sunda', 'Madura', 'Minangkabau'], benar: 1,
      penjelasan: '"Geulis" adalah kata Bahasa Sunda untuk cantik, misalnya "geulis pisan".',
      catatan: ['Dalam Bahasa Jawa, cantik adalah "ayu".', '', 'Ini bukan kata Madura.', 'Ini bukan kata Minangkabau.']
    },
    {
      id: 'q11', jenis: 'asal',
      tanya: 'Kata "taretan" yang berarti saudara atau teman berasal dari bahasa...',
      pilihan: ['Jawa', 'Sunda', 'Madura', 'Minangkabau'], benar: 2,
      penjelasan: '"Taretan" adalah kata Bahasa Madura untuk saudara, juga dipakai untuk menyapa orang yang dekat.',
      catatan: ['Dalam Bahasa Jawa, saudara adalah "sedulur".', 'Dalam Bahasa Sunda, saudara adalah "baraya".', '', 'Dalam Bahasa Minangkabau, saudara adalah "dunsanak".']
    },
    {
      id: 'q12', jenis: 'asal',
      tanya: 'Kata "kowe" yang berarti kamu berasal dari bahasa...',
      pilihan: ['Jawa', 'Sunda', 'Madura', 'Minangkabau'], benar: 0,
      penjelasan: '"Kowe" adalah kata ganti orang kedua ngoko dalam Bahasa Jawa.',
      catatan: ['', 'Penutur Sunda memakai "anjeun" atau "maneh".', 'Ini bukan kata ganti Madura.', 'Ini bukan kata ganti Minangkabau.']
    }
  ];
})();
