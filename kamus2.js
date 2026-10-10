/* LINGKOR: data kamus contoh.
   Semua entri di bawah ini adalah CONTOH PROTOTYPE dan belum diverifikasi ahli bahasa.
   Cara menambah kata: salin satu objek entri, ubah isinya, dan pastikan `id` unik.
   Kolom `varian` dipakai agar pencarian dan penerjemah mengenali ejaan lain. */
(function () {
  'use strict';
  var D = (window.LINGKOR_DATA = window.LINGKOR_DATA || {});

  D.statusData = 'Contoh prototype, belum diverifikasi ahli bahasa';

  D.bahasa = {
    jawa: {
      id: 'jawa', nama: 'Bahasa Jawa', pendek: 'Jawa', kode: 'jv',
      wilayah: 'Jawa Tengah, DI Yogyakarta, Jawa Timur',
      contoh: ['aku', 'ora popo', 'matur nuwun', 'mbois'],
      kalimat: 'Kowe wes mangan?'
    },
    sunda: {
      id: 'sunda', nama: 'Bahasa Sunda', pendek: 'Sunda', kode: 'su',
      wilayah: 'Jawa Barat dan Banten',
      contoh: ['punten', 'hatur nuhun', 'geulis', 'teu nanaon'],
      kalimat: 'Hatur nuhun, teu nanaon'
    },
    madura: {
      id: 'madura', nama: 'Bahasa Madura', pendek: 'Madura', kode: 'mad',
      wilayah: 'Pulau Madura dan pesisir timur Jawa Timur',
      contoh: ['sakalangkong', 'mara', 'taretan'],
      kalimat: 'Sakalangkong, taretan'
    },
    minang: {
      id: 'minang', nama: 'Bahasa Minangkabau', pendek: 'Minangkabau', kode: 'min',
      wilayah: 'Sumatera Barat',
      contoh: ['apo kaba', 'lamak', 'uda', 'tarimo kasih'],
      kalimat: 'Apo kaba, Uda?'
    }
  };

  D.kategori = [
    { id: 'sapaan', nama: 'Sapaan' },
    { id: 'aktivitas', nama: 'Aktivitas Sehari-hari' },
    { id: 'ekspresi', nama: 'Ekspresi' },
    { id: 'pertemanan', nama: 'Pertemanan' },
    { id: 'populer', nama: 'Ungkapan Populer' }
  ];

  D.formalitas = {
    Santai: 'Cocok untuk obrolan akrab dengan teman sebaya.',
    Netral: 'Aman dipakai dalam obrolan umum.',
    Sopan: 'Kata daerahnya sopan. Padanan slang terdengar lebih santai, jadi hati-hati dengan lawan bicara yang dihormati.'
  };

  D.kamus = [
    /* ---------- Bahasa Jawa ---------- */
    {
      id: 'jw-aku', bahasa: 'jawa', kata: 'aku', varian: [],
      arti: ['saya', 'aku'], slang: ['gue', 'gw', 'aku'],
      kategori: 'sapaan', formalitas: 'Santai',
      konteks: 'Dalam ngoko, "aku" dipakai untuk diri sendiri kepada teman sebaya. Padanan "gue" identik dengan gaya Jakarta; di banyak daerah anak muda tetap memakai "aku". Pilih sesuai lawan bicara dan lingkunganmu.',
      contoh: { daerah: 'Aku lagi ning kampus.', slang: 'Gue lagi di kampus nih.' },
      populer: false, baru: false
    },
    {
      id: 'jw-kowe', bahasa: 'jawa', kata: 'kowe', varian: [],
      arti: ['kamu'], slang: ['lo', 'lu', 'kamu'],
      kategori: 'sapaan', formalitas: 'Santai',
      konteks: 'Ngoko untuk lawan bicara yang akrab atau lebih muda. Kepada orang yang lebih tua, penutur Jawa memakai "panjenengan", jadi "lo" atau "lu" bisa terdengar kasar.',
      contoh: { daerah: 'Kowe lagi ngopo?', slang: 'Lo lagi ngapain?' },
      populer: false, baru: false
    },
    {
      id: 'jw-mangan', bahasa: 'jawa', kata: 'mangan', varian: [],
      arti: ['makan'], slang: ['makan', 'sikat', 'gas makan'],
      kategori: 'aktivitas', formalitas: 'Santai',
      konteks: 'Ngoko untuk "makan"; bentuk yang lebih halus adalah "dhahar" atau "nedha". Tidak ada padanan slang tunggal: "makan" tetap dipakai, sedangkan "sikat" dan "gas makan" memberi nuansa bersemangat.',
      contoh: { daerah: 'Kowe wes mangan?', slang: 'Lo udah makan?' },
      populer: false, baru: false
    },
    {
      id: 'jw-arep', bahasa: 'jawa', kata: 'arep', varian: [],
      arti: ['mau', 'akan'], slang: ['mau', 'pengen', 'bakal'],
      kategori: 'aktivitas', formalitas: 'Santai',
      konteks: 'Penanda niat atau rencana dalam ngoko. "Mau" netral, "pengen" menekankan keinginan, "bakal" lebih ke rencana yang akan terjadi.',
      contoh: { daerah: 'Aku arep mangan bakso.', slang: 'Gue mau makan bakso nih.' },
      populer: false, baru: false
    },
    {
      id: 'jw-wes', bahasa: 'jawa', kata: 'wes', varian: [],
      arti: ['sudah'], slang: ['udah', 'dah'],
      kategori: 'ekspresi', formalitas: 'Santai',
      konteks: 'Penanda bahwa sesuatu telah selesai. "Udah" dan "dah" sangat umum di chat. Dalam kalimat tertentu "wes" juga berarti "sudah, cukup" untuk menghentikan sesuatu.',
      contoh: { daerah: 'Tugasku wes rampung.', slang: 'Tugas gue udah kelar.' },
      populer: false, baru: false
    },
    {
      id: 'jw-nyambut-gawe', bahasa: 'jawa', kata: 'nyambut gawe', varian: ['nyambut-gawe'],
      arti: ['bekerja', 'kerja'], slang: ['cari cuan', 'nge-grind', 'ngantor'],
      kategori: 'aktivitas', formalitas: 'Netral',
      konteks: 'Makna dasarnya "bekerja". Padanan slang menambah nuansa: "cari cuan" menekankan penghasilan, "nge-grind" menekankan kerja keras terus-menerus, "ngantor" hanya pas untuk kerja di kantor.',
      contoh: { daerah: 'Sesuk aku nyambut gawe.', slang: 'Besok gue cari cuan dulu.' },
      populer: false, baru: false
    },
    {
      id: 'jw-mlaku-mlaku', bahasa: 'jawa', kata: 'mlaku-mlaku', varian: ['mlaku mlaku'],
      arti: ['jalan-jalan', 'berjalan santai'], slang: ['healing', 'jalan-jalan', 'refreshing'],
      kategori: 'aktivitas', formalitas: 'Santai',
      konteks: 'Berjalan-jalan tanpa tujuan berat. "Healing" di media sosial sudah bergeser menjadi liburan atau jeda untuk menyegarkan diri, padahal arti awalnya berkaitan dengan penyembuhan.',
      contoh: { daerah: 'Ayo mlaku-mlaku sore iki.', slang: 'Yuk healing sore ini.' },
      populer: true, baru: false
    },
    {
      id: 'jw-ora-popo', bahasa: 'jawa', kata: 'ora popo', varian: ['ora apa-apa'],
      arti: ['tidak apa-apa'], slang: ['gapapa', 'santuy', 'no problem'],
      kategori: 'ekspresi', formalitas: 'Santai',
      konteks: 'Dipakai untuk menenangkan lawan bicara atau menerima permintaan maaf. "Santuy" berasal dari "santai" dan cocok untuk suasana ringan. Untuk masalah serius, "gapapa" terdengar lebih tulus.',
      contoh: { daerah: 'Ora popo, santai wae.', slang: 'Gapapa, santuy aja.' },
      populer: true, baru: false
    },
    {
      id: 'jw-mbois', bahasa: 'jawa', kata: 'mbois', varian: [],
      arti: ['keren', 'hebat'], slang: ['keren abis', 'kece', 'slay'],
      kategori: 'populer', formalitas: 'Santai',
      konteks: 'Pujian untuk penampilan, barang, atau kemampuan seseorang. "Slay" berasal dari bahasa gaul berbahasa Inggris yang ramai di media sosial; "kece" sudah lebih lama dipakai di Indonesia.',
      contoh: { daerah: 'Motormu mbois tenan!', slang: 'Motor lo kece abis!' },
      populer: true, baru: false
    },
    {
      id: 'jw-ambyar', bahasa: 'jawa', kata: 'ambyar', varian: [],
      arti: ['hancur', 'patah hati'], slang: ['galau', 'hancur lebur', 'sad'],
      kategori: 'populer', formalitas: 'Santai',
      konteks: 'Awalnya berarti pecah atau buyar, kini identik dengan perasaan patah hati dan dikenal luas lewat lagu campursari. "Galau" lebih umum, "hancur lebur" terdengar lebih dramatis.',
      contoh: { daerah: 'Atiku ambyar.', slang: 'Hati gue hancur lebur.' },
      populer: true, baru: false
    },
    {
      id: 'jw-sedulur', bahasa: 'jawa', kata: 'sedulur', varian: [],
      arti: ['saudara', 'teman akrab'], slang: ['bestie', 'sobat', 'bro'],
      kategori: 'pertemanan', formalitas: 'Santai',
      konteks: 'Bisa berarti saudara kandung atau kerabat, dan juga dipakai untuk teman yang sudah dianggap keluarga. Padanan slang di sini hanya pas untuk makna teman akrab.',
      contoh: { daerah: 'Aku dolan karo sedulurku.', slang: 'Gue main bareng bestie gue.' },
      populer: false, baru: false
    },
    {
      id: 'jw-matur-nuwun', bahasa: 'jawa', kata: 'matur nuwun', varian: ['matur nuwun'],
      arti: ['terima kasih'], slang: ['makasih', 'thanks', 'thx'],
      kategori: 'ekspresi', formalitas: 'Sopan',
      konteks: 'Bentuk krama (halus) untuk berterima kasih. Padanan slang terdengar lebih santai, jadi kurang cocok untuk orang yang dihormati atau situasi resmi.',
      contoh: { daerah: 'Matur nuwun, Mas.', slang: 'Makasih ya, Mas.' },
      populer: false, baru: true
    },

    /* ---------- Bahasa Sunda ---------- */
    {
      id: 'su-abdi', bahasa: 'sunda', kata: 'abdi', varian: [],
      arti: ['saya'], slang: ['gue', 'aku'],
      kategori: 'sapaan', formalitas: 'Sopan',
      konteks: 'Kata ganti orang pertama yang halus dan sopan. "Kuring" terasa lebih akrab. "Gue" atau "aku" menghilangkan nuansa hormatnya.',
      contoh: { daerah: 'Abdi ti Bandung.', slang: 'Gue dari Bandung nih.' },
      populer: false, baru: false
    },
    {
      id: 'su-anjeun', bahasa: 'sunda', kata: 'anjeun', varian: [],
      arti: ['kamu', 'Anda'], slang: ['kamu', 'lo'],
      kategori: 'sapaan', formalitas: 'Sopan',
      konteks: 'Kata ganti orang kedua yang halus. Padanan "lo" bernuansa akrab dan bisa terasa kasar kepada orang yang lebih tua.',
      contoh: { daerah: 'Anjeun badé ka mana?', slang: 'Kamu mau ke mana nih?' },
      populer: false, baru: false
    },
    {
      id: 'su-punten', bahasa: 'sunda', kata: 'punten', varian: [],
      arti: ['permisi', 'maaf'], slang: ['misi', 'sorry', 'maaf ya'],
      kategori: 'sapaan', formalitas: 'Sopan',
      konteks: 'Dipakai saat lewat di depan orang, memasuki rumah, atau meminta maaf untuk hal kecil. "Misi" dan "sorry" lebih ringan. Untuk situasi formal, "permisi" tetap lebih tepat.',
      contoh: { daerah: 'Punten, abdi badé lewat.', slang: 'Misi ya, gue mau lewat.' },
      populer: true, baru: false
    },
    {
      id: 'su-hatur-nuhun', bahasa: 'sunda', kata: 'hatur nuhun', varian: [],
      arti: ['terima kasih'], slang: ['makasih', 'thanks', 'thank you'],
      kategori: 'ekspresi', formalitas: 'Sopan',
      konteks: 'Ungkapan terima kasih yang sopan. "Nuhun" adalah bentuk singkat yang lebih akrab.',
      contoh: { daerah: 'Hatur nuhun pisan, Kang.', slang: 'Makasih banget, Kang.' },
      populer: false, baru: false
    },
    {
      id: 'su-mangga', bahasa: 'sunda', kata: 'mangga', varian: [],
      arti: ['silakan'], slang: ['yuk', 'gas', 'silakan'],
      kategori: 'sapaan', formalitas: 'Netral',
      konteks: 'Mempersilakan seseorang. Dalam percakapan santai padanannya "yuk" atau "gas", tetapi nuansa ramah-hormatnya berkurang.',
      contoh: { daerah: 'Mangga, calik di dieu.', slang: 'Yuk, duduk sini.' },
      populer: false, baru: false
    },
    {
      id: 'su-kumaha', bahasa: 'sunda', kata: 'kumaha', varian: [],
      arti: ['bagaimana'], slang: ['gimana', 'gmn'],
      kategori: 'ekspresi', formalitas: 'Santai',
      konteks: 'Kata tanya "bagaimana". "Gimana" dan "gmn" sangat umum di chat.',
      contoh: { daerah: 'Kumaha kabarna?', slang: 'Gimana kabarnya?' },
      populer: false, baru: false
    },
    {
      id: 'su-geulis', bahasa: 'sunda', kata: 'geulis', varian: [],
      arti: ['cantik'], slang: ['cakep', 'glowing', 'cantik banget'],
      kategori: 'populer', formalitas: 'Netral',
      konteks: 'Pujian untuk kecantikan, biasanya untuk perempuan. "Glowing" lebih mengarah ke kulit atau penampilan yang tampak segar.',
      contoh: { daerah: 'Geulis pisan kebayana.', slang: 'Kebayanya cakep banget.' },
      populer: true, baru: false
    },
    {
      id: 'su-teu-nanaon', bahasa: 'sunda', kata: 'teu nanaon', varian: [],
      arti: ['tidak apa-apa'], slang: ['gapapa', 'santuy', 'aman'],
      kategori: 'ekspresi', formalitas: 'Netral',
      konteks: 'Dipakai untuk menenangkan atau menolak dengan halus. "Santuy" lebih santai dan kurang pas untuk situasi serius.',
      contoh: { daerah: 'Teu nanaon, nuhun.', slang: 'Gapapa, makasih ya.' },
      populer: false, baru: false
    },
    {
      id: 'su-cape', bahasa: 'sunda', kata: 'cape', varian: [],
      arti: ['lelah'], slang: ['capek', 'tepar', 'burnout'],
      kategori: 'ekspresi', formalitas: 'Santai',
      konteks: 'Dipakai untuk lelah fisik maupun mental. "Tepar" menunjukkan lelah sampai tidak berdaya. "Burnout" sebaiknya untuk kelelahan yang berkepanjangan.',
      contoh: { daerah: 'Kuring cape pisan poé ieu.', slang: 'Gue tepar banget hari ini.' },
      populer: false, baru: true
    },
    {
      id: 'su-baraya', bahasa: 'sunda', kata: 'baraya', varian: [],
      arti: ['saudara', 'kerabat'], slang: ['bestie', 'squad', 'gengs'],
      kategori: 'pertemanan', formalitas: 'Netral',
      konteks: 'Berarti saudara atau kerabat, dan sering dipakai untuk menyebut sesama anggota komunitas. "Squad" atau "bestie" hanya pas jika konteksnya pertemanan akrab.',
      contoh: { daerah: 'Baraya kuring daratang ti Garut.', slang: 'Squad gue datang dari Garut.' },
      populer: false, baru: false
    },

    /* ---------- Bahasa Madura (ejaan disederhanakan) ---------- */
    {
      id: 'ma-kaule', bahasa: 'madura', kata: 'kaule', varian: ['kaula'],
      arti: ['saya'], slang: ['gue', 'aku'],
      kategori: 'sapaan', formalitas: 'Sopan',
      konteks: 'Kata ganti orang pertama yang halus. Ejaan dan pengucapan bisa berbeda antardaerah (kaule, kaula).',
      contoh: { daerah: 'Kaule dari Sumenep.', slang: 'Gue dari Sumenep.' },
      populer: false, baru: false
    },
    {
      id: 'ma-taretan', bahasa: 'madura', kata: 'taretan', varian: [],
      arti: ['saudara', 'teman'], slang: ['bestie', 'sobat', 'bro'],
      kategori: 'pertemanan', formalitas: 'Netral',
      konteks: 'Berarti saudara, juga dipakai untuk menyapa orang yang dianggap dekat. Padanan slang hanya pas untuk konteks teman akrab.',
      contoh: { daerah: 'Sampeyan taretan kaule.', slang: 'Lo itu bestie gue.' },
      populer: false, baru: false
    },
    {
      id: 'ma-mara', bahasa: 'madura', kata: 'mara', varian: [],
      arti: ['ayo', 'mari'], slang: ['yuk', 'gas', 'ayo'],
      kategori: 'ekspresi', formalitas: 'Santai',
      konteks: 'Ajakan untuk melakukan sesuatu bersama. "Yuk" umum dan ramah; "gas" bernuansa lebih bersemangat.',
      contoh: { daerah: 'Mara, ka pasar.', slang: 'Yuk, ke pasar.' },
      populer: false, baru: true
    },
    {
      id: 'ma-sakalangkong', bahasa: 'madura', kata: 'sakalangkong', varian: ['mator sakalangkong'],
      arti: ['terima kasih'], slang: ['makasih', 'thanks'],
      kategori: 'ekspresi', formalitas: 'Sopan',
      konteks: 'Ucapan terima kasih yang sopan, biasanya "mator sakalangkong". Padanan slang lebih ringan sehingga kurang cocok untuk situasi resmi.',
      contoh: { daerah: 'Mator sakalangkong, Pak.', slang: 'Makasih banyak, Pak.' },
      populer: false, baru: false
    },
    {
      id: 'ma-saporana', bahasa: 'madura', kata: 'saporana', varian: ['sapora'],
      arti: ['maaf'], slang: ['sorry', 'maaf ya'],
      kategori: 'ekspresi', formalitas: 'Sopan',
      konteks: 'Permintaan maaf yang sopan. "Sorry" terdengar lebih ringan; untuk kesalahan serius, pilih "maaf" yang lengkap.',
      contoh: { daerah: 'Saporana, kaule salah.', slang: 'Sorry ya, gue salah.' },
      populer: false, baru: true
    },
    {
      id: 'ma-arapa', bahasa: 'madura', kata: 'arapa', varian: [],
      arti: ['kenapa', 'mengapa'], slang: ['kenapa', 'napa', 'why'],
      kategori: 'ekspresi', formalitas: 'Santai',
      konteks: 'Kata tanya untuk menanyakan sebab. "Kenapa" umum; "napa" lebih singkat dan akrab.',
      contoh: { daerah: 'Arapa?', slang: 'Kenapa tuh?' },
      populer: false, baru: false
    },

    /* ---------- Bahasa Minangkabau ---------- */
    {
      id: 'mi-ambo', bahasa: 'minang', kata: 'ambo', varian: [],
      arti: ['saya'], slang: ['gue', 'aku'],
      kategori: 'sapaan', formalitas: 'Netral',
      konteks: 'Kata ganti orang pertama yang netral dan sopan. "Gue" atau "aku" mengubah nuansa daerahnya.',
      contoh: { daerah: 'Ambo dari Padang.', slang: 'Gue dari Padang nih.' },
      populer: false, baru: false
    },
    {
      id: 'mi-awak', bahasa: 'minang', kata: 'awak', varian: [],
      arti: ['saya', 'badan'], slang: ['gue', 'aku'],
      kategori: 'sapaan', formalitas: 'Santai',
      konteks: 'Dalam obrolan akrab bisa berarti "saya", dan juga berarti badan. Konteks kalimat menentukan maknanya.',
      contoh: { daerah: 'Awak pai dulu ya.', slang: 'Gue cabut dulu ya.' },
      populer: false, baru: false
    },
    {
      id: 'mi-uda', bahasa: 'minang', kata: 'uda', varian: [],
      arti: ['kakak laki-laki'], slang: ['bang', 'bro', 'kak'],
      kategori: 'sapaan', formalitas: 'Netral',
      konteks: 'Sapaan hormat sekaligus akrab untuk kakak laki-laki atau laki-laki yang lebih tua. "Bang" dan "bro" lebih umum di media sosial.',
      contoh: { daerah: 'Uda, lamo indak basuo.', slang: 'Bang, lama banget nggak ketemu.' },
      populer: false, baru: false
    },
    {
      id: 'mi-uni', bahasa: 'minang', kata: 'uni', varian: [],
      arti: ['kakak perempuan'], slang: ['kak', 'sis', 'mbak'],
      kategori: 'sapaan', formalitas: 'Netral',
      konteks: 'Sapaan untuk kakak perempuan atau perempuan yang lebih tua. "Sis" dipakai di media sosial, sedangkan "kak" lebih netral.',
      contoh: { daerah: 'Tarimo kasih banyak, Uni.', slang: 'Makasih banyak ya, Kak.' },
      populer: false, baru: false
    },
    {
      id: 'mi-apo-kaba', bahasa: 'minang', kata: 'apo kaba', varian: [],
      arti: ['apa kabar'], slang: ['gimana kabar', "what's up", 'apa kabar guys'],
      kategori: 'sapaan', formalitas: 'Santai',
      konteks: 'Sapaan untuk menanyakan kabar. "Gimana kabar" umum; "what\'s up" bergaya campuran bahasa Inggris dan lebih santai.',
      contoh: { daerah: 'Apo kaba, Uda?', slang: 'Gimana kabar, Bang?' },
      populer: false, baru: true
    },
    {
      id: 'mi-lamak', bahasa: 'minang', kata: 'lamak', varian: ['lamak bana'],
      arti: ['enak'], slang: ['enak banget', 'mantul', 'juara'],
      kategori: 'populer', formalitas: 'Santai',
      konteks: 'Dipakai untuk rasa makanan atau pengalaman yang menyenangkan, biasanya ditambah "bana" (sekali). "Mantul" adalah singkatan "mantap betul".',
      contoh: { daerah: 'Randang ko lamak bana.', slang: 'Rendangnya enak banget.' },
      populer: true, baru: false
    },
    {
      id: 'mi-tarimo-kasih', bahasa: 'minang', kata: 'tarimo kasih', varian: [],
      arti: ['terima kasih'], slang: ['makasih', 'thanks'],
      kategori: 'ekspresi', formalitas: 'Sopan',
      konteks: 'Ucapan terima kasih yang sopan. Padanan slang terdengar lebih santai.',
      contoh: { daerah: 'Tarimo kasih banyak, Uni.', slang: 'Makasih banyak ya, Kak.' },
      populer: false, baru: false
    },
    {
      id: 'mi-indak', bahasa: 'minang', kata: 'indak', varian: [],
      arti: ['tidak'], slang: ['nggak', 'gak', 'ga'],
      kategori: 'ekspresi', formalitas: 'Netral',
      konteks: 'Kata negasi. "Nggak" dan "gak" umum dalam percakapan santai dan chat.',
      contoh: { daerah: 'Indak, ambo alun makan.', slang: 'Nggak, gue belum makan.' },
      populer: false, baru: false
    },
    {
      id: 'mi-dunsanak', bahasa: 'minang', kata: 'dunsanak', varian: [],
      arti: ['saudara', 'kerabat'], slang: ['squad', 'bestie', 'keluarga'],
      kategori: 'pertemanan', formalitas: 'Netral',
      konteks: 'Berarti saudara atau kerabat, dan juga dipakai untuk sesama perantau atau komunitas. "Squad" atau "keluarga" hanya cocok untuk konteks tertentu.',
      contoh: { daerah: 'Dunsanak ambo ado di Bukittinggi.', slang: 'Keluarga gue ada di Bukittinggi.' },
      populer: false, baru: true
    }
  ];
})();
