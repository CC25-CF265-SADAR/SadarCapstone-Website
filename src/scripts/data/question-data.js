export const questions = [
  {
    id: 1,
    type: 'mcq',
    question:
      "Kamu mendapat pesan SMS dari nomor pengirim JNT-Express berbunyi: 'Paket Anda tidak dapat dikirim karena data alamat tidak lengkap. Harap konfirmasi data Anda melalui link berikut dalam 2 jam: http://jne-delivery.id/update'. Kamu memang sedang menunggu kiriman online dari e-commerce, tapi tidak tahu paket mana yang dimaksud. Apa langkah paling aman yang sebaiknya kamu lakukan?",
    options: [
      'Klik tautan dan segera isi data agar pengiriman tidak gagal',
      'Balas pesan tersebut untuk meminta penjelasan lebih lanjut',
      'Hubungi langsung pihak JNE melalui nomor di website resminya',
      'Kirim ulang alamat lengkap melalui tautan yang diberikan untuk memastikan',
    ],
    answer: 'Hubungi langsung pihak JNE melalui nomor di website resminya',
    multiple: false,
  },
  {
    id: 2,
    type: 'dragdrop',
    question:
      'Andi menerima panggilan telepon dari nomor yang mengaku sebagai petugas bank. Suara di telepon meyakinkan dan terdengar resmi. Petugas bank (suara): "Pak Andi, ada transaksi mencurigakan di kartu kredit Bapak senilai Rp10 juta. Mohon segera verifikasi dengan menyebutkan nomor OTP yang dikirim via SMS ke ponsel Bapak." Beberapa detik kemudian, Andi menerima SMS berisi: "Kode OTP Anda adalah 482953. Jangan berikan kode ini ke siapapun termasuk petugas bank." Apa yang anda lakukan dalam situasi seperti ini',
    options: [
      {
        text: 'Memberikan nomor OTP kepada penelepon karena mereka mengaku petugas bank',
        category: 'Berisiko',
      },
      {
        text: 'Memastikan nomor telepon yang menelepon sesuai dengan nomor resmi bank',
        category: 'Aman',
      },
      {
        text: 'Menghubungi call center bank langsung melalui nomor resmi di situs bank',
        category: 'Aman',
      },
      {
        text: 'Tidak mengiyakan dan segera memutus telepon tanpa memberikan info',
        category: 'Aman',
      },
      { text: 'Melaporkan kejadian ini ke pihak bank dan pihak berwenang', category: 'Aman' },
      {
        text: 'Menjawab telepon dengan membacakan kode OTP untuk konfirmasi',
        category: 'Berisiko',
      },
      {
        text: 'Mencari info lebih lanjut tentang modus penipuan melalui internet',
        category: 'Aman',
      },
    ],
    dropZones: ['Aman', 'Berisiko'],
  },
  {
    id: 3,
    type: 'mcq',
    question:
      "Anda sedang santai menggunakan ponsel, tiba-tiba masuk sebuah SMS/WhatsApp dari nomor tak dikenal. Pesan tersebut berisi 'Selamat! Nomor Anda terpilih sebagai pemenang undian senilai Rp 50.000.000. Untuk klaim hadiah, silakan klik tautan berikut: [tautan-hadiah-palsu].com dan isi data diri Anda. Batas klaim 1x24 jam. Info: 0812-xxxx-xxxx'. Bagaimana Anda seharusnya menanggapi SMS tersebut?",
    options: [
      'Segera mengklik tautan dan mengisi data diri agar tidak kehilangan hadiah',
      'Menghubungi nomor yang tertera untuk memastikan kebenaran undian',
      'Mengabaikan dan menghapus SMS tersebut karena hadiahnya sangat tidak wajar dan patut dicurigai',
      'Meneruskan SMS tersebut ke teman-teman agar mereka juga bisa mendapatkan hadiah',
    ],
    answer:
      'Mengabaikan dan menghapus SMS tersebut karena hadiahnya sangat tidak wajar dan patut dicurigai',
    multiple: false,
  },
  {
    id: 4,
    type: 'mcq',
    question:
      "Anda menerima pesan WhatsApp dari nomor yang memakai foto profil teman dekat Anda, sebut saja Budi, namun nomornya baru. Isi pesannya adalah 'Bro/Sist, ini aku Budi, nomor lamaku hilang. Gawat nih, aku lagi di jalan, dompetku kecopetan, semua hilang. Bisa tolong pinjamkan uang dulu Rp 750.000 buat pulang? Mendesak banget nih! Tolong transfer ke rekening [Nomor Rekening Asing] a.n. [Nama Asing]. Nanti malam aku ganti pas sampai rumah. Please ya, penting banget!'. Anda membaca pesan ini dan merasa kasihan, tapi juga sedikit ragu. Apa tindakan paling bijak yang akan Anda lakukan dalam situasi ini?",
    options: [
      'Langsung transfer, kasihan teman sedang susah',
      "Membalas, 'Oke, tapi transfer ke rekeningmu yang biasa saja ya?'",
      'Mencoba menelepon nomor lama Budi atau bertanya pada kenalan lain mengenai Budi',
      'Menelepon nomor tersebut untuk memastikan apakah benar itu Budi',
    ],
    answer: 'Mencoba menelepon nomor lama Budi atau bertanya pada kenalan lain mengenai Budi',
    multiple: false,
  },
  {
    id: 5,
    type: 'dragdrop',
    question:
      "Kamu menerima email resmi bergaya kampus dari admin@univ-id.ac.co, meminta login ke portal mahasiswa untuk 'pembaruan jadwal KRS'. Dalam email ada tautan ke portal-univ-id.co. Seret tindakan-tindakan berikut ke kolom yang sesuai",
    options: [
      {
        text: 'Mengabaikan perbedaan kecil pada domain karena isi email terlihat profesional',
        category: 'Berisiko',
      },
      {
        text: 'Mengecek alamat situs resmi kampus dari brosur atau sumber resmi kampus',
        category: 'Aman',
      },
      {
        text: 'Melaporkan email mencurigakan ke bagian TI atau helpdesk universitas',
        category: 'Aman',
      },
      {
        text: 'Login langsung ke situs dari link email yang tampilannya mirip portal asli',
        category: 'Berisiko',
      },
    ],
    dropZones: ['Aman', 'Berisiko'],
  },
  {
    id: 6,
    type: 'mcq',
    question:
      'Anda membuka laptop di rumah dan mencoba mengakses situs resmi internet banking Bank Mandiri dengan mengetik langsung: https://www.bankmandiri.co.id/livin Namun, yang muncul di browser adalah tampilan website Livin’ yang sedikit berbeda dari biasanya. Alamat web yang muncul adalah https://www.bankmandiri.co.id.livin.id-confirm-verification.top. Ikon gembok tidak terlihat dan browser tidak menandai situs sebagai aman. Namun, tampilan situs tampak meyakinkan dan meminta Anda memasukkan user ID dan PIN. Apa yang seharusnya Anda lakukan dalam situasi ini?',
    options: [
      'Segera login saja karena tampilannya seperti biasa',
      'Refresh halaman, mungkin masalah jaringan',
      'Tutup halaman tersebut dan periksa kembali alamat situs. Jangan masukkan data apa pun',
      'Login lalu langsung ganti password setelahnya',
    ],
    answer: 'Tutup halaman tersebut dan periksa kembali alamat situs. Jangan masukkan data apa pun',
    multiple: false,
  },
  {
    id: 7,
    type: 'mcq',
    question:
      'Kamu menerima email dari seseorang yang mengaku sebagai HRD dari perusahaan impianmu. Isinya mengatakan bahwa kamu lolos tahap awal rekrutmen dan diminta untuk melengkapi data pribadi serta mengunggah scan KTP dan foto selfie dengan KTP. Email tersebut terlihat resmi, tapi dikirim dari alamat Gmail umum, bukan domain perusahaan. Apa tindakan paling tepat yang harus kamu ambil?',
    options: [
      'Langsung kirim data karena takut kehilangan kesempatan kerja',
      'Balas email dan minta nomor WA HRD untuk memastikan',
      'Kirim foto KTP dan selfie sesuai permintaan karena banyak lowongan memang seperti itu',
      'Tahan dulu dan cek kebenaran email ke situs resmi atau akun media sosial perusahaan',
    ],
    answer: 'Tahan dulu dan cek kebenaran email ke situs resmi atau akun media sosial perusahaan',
    multiple: false,
  },
  {
    id: 8,
    type: 'dragdrop',
    question:
      'Posisikan diri anda ketika anda ingin membeli barang yang ukurannya cukup besar dan berat secara online, tentunya anda akan mencari barang yang anda butuhkan pada platform yang anda percaya. Setelah anda menemukan barang yang anda cari, anda disajikan berbagai macam barang serupa dengan spesifikasi yang sama maupun berbeda, yang ditawarkan dengan harga yang bervariasi. Selanjutnya anda memesan barang tersebut yang sekiranya memenuhi semua kebutuhan dan preferensi anda, lalu anda melanjutkan dengan memilih metode pembayaran yang disediakan pada platform jual-beli tersebut. Namun, beberapa saat setelah anda memesan barang tersebut, penjual menghubungi anda melalui chat, mengirimkan foto barang yang telah dikemas dan meminta untuk berbicara langsung kepada anda untuk membahas mengenai pengiriman. Anda menyetujui hal tersebut dan berkomunikasi langsung dengan penjual melalui telepon. Penjual menjelaskan perihal pengirimaan yang ternyata tidak dapat dikirim melalui pilihan yang disediakan platform tersebut. Penjual terdengar sangat meyakinkan dan cenderung menjelaskan secara tergesa-gesa. Penjual meminta anda untuk mengirimkan sejumlah nominal uang guna membayar biaya ekspedisi yang akan dipesankan secara mandiri oleh penjual. Dari situasi ini, seret pilihan tindakan berikut ke kolom yang sesuai: mana yang Aman dan mana yang Berisiko.',
    options: [
      {
        text: 'Menyetujui transfer biaya pengiriman karena suaranya terdengar "meyakinkan"',
        category: 'Berisiko',
      },
      {
        text: 'Mengakhiri percakapan dan meminta semua komunikasi dilakukan kembali lewat aplikasi resmi',
        category: 'Aman',
      },
      {
        text: 'Tidak melakukan transfer sampai ada konfirmasi resmi dari platform',
        category: 'Aman',
      },
      {
        text: 'Percaya karena penjual mengirimkan foto barang yang telah dikemas sebagai “bukti”',
        category: 'Berisiko',
      },
      {
        text: 'Melapor ke pihak customer service platform tentang permintaan penjual',
        category: 'Aman',
      },
      {
        text: 'Mengabaikan kebijakan toko online dan mengikuti arahan penjual di luar sistem',
        category: 'Berisiko',
      },
    ],
    dropZones: ['Aman', 'Berisiko'],
  },
  {
    id: 9,
    type: 'dragdrop',
    question:
      'Dina sedang mencari peluang kerja tambahan di media sosial. Ia menerima beberapa tawaran berbeda. Beberapa terdengar menjanjikan, namun ia merasa perlu berhati-hati karena sempat membaca tentang penipuan money rule. Ia memutuskan mencatat ciri-ciri dari setiap tawaran tersebut. Bantu Dina memilah mana yang merupakan ciri dari penipuan money rule dan mana yang termasuk dalam prosedur resmi. Seret dan letakkan setiap pernyataan ke kolom yang sesuai',
    options: [
      {
        text: 'Dana diberikan melalui proses yang transparan dan gratis',
        category: 'Prosedur Resmi',
      },
      {
        text: 'Diminta membayar “pajak hadiah” sebelum dana dikirim',
        category: 'Penipuan Money Rule',
      },
      {
        text: 'Tawaran datang dari chat pribadi yang mendesak dan tidak resmi',
        category: 'Penipuan Money Rule',
      },
      { text: 'Ada dokumen legal yang bisa diverifikasi secara resmi', category: 'Prosedur Resmi' },
    ],
    dropZones: ['Penipuan Money Rule', 'Prosedur Resmi'],
  },
  {
    id: 10,
    type: 'mcq',
    question:
      'Bayu menerima pesan dari akun tidak dikenal di media sosial yang mengatakan bahwa ia mendapatkan dana bantuan sosial sebesar Rp25 juta. Namun, ia diminta untuk mentransfer Rp500.000 sebagai “verifikasi dana”. Apa tindakan yang benar seharusnya dilakukan Bayu?',
    options: [
      'Meminta bukti legalitas dana bantuan dan kontak resmi pengirim',
      'Mengirim uang Rp500.000 agar dana bantuan bisa segera dicairkan',
      'Memblokir akun tersebut dan melaporkannya sebagai penipuan',
      'Memberikan nomor rekening agar dana bisa ditransfer',
    ],
    answer: [
      'Meminta bukti legalitas dana bantuan dan kontak resmi pengirim',
      'Memblokir akun tersebut dan melaporkannya sebagai penipuan',
    ],
    multiple: true,
  },
  {
    id: 11,
    type: 'mcq',
    question:
      'Kamu sedang di pusat perbelanjaan dan temanmu menelepon, butuh transfer uang darurat. Kamu hanya bisa mengakses internet melalui Wi-Fi publik mal. Apa yang akan kamu lakukan untuk transfer melalui mobile banking?',
    options: [
      'Mencari tempat yang agak sepi, baru lakukan transfer',
      'Mengaktifkan VPN terlebih dahulu sebelum membuka aplikasi mobile banking dan melakukan transfer',
      'Memberitahu temanmu bahwa kamu akan transfer nanti jika sudah mendapatkan koneksi yang lebih aman',
      'Langsung saja transfer, karena ini darurat',
    ],
    answer: [
      'Mengaktifkan VPN terlebih dahulu sebelum membuka aplikasi mobile banking dan melakukan transfer',
      'Memberitahu temanmu bahwa kamu akan transfer nanti jika sudah mendapatkan koneksi yang lebih aman',
    ],
    multiple: true,
  },
  {
    id: 12,
    type: 'mcq',
    question:
      "Kamu sedang di kafe 'Kafe Nyaman' dan perlu segera mengirim email pekerjaan yang berisi data klien. Kafe menyediakan Wi-Fi gratis bernama 'KafeNyaman_FreeWiFi' tanpa kata sandi. Apa tindakanmu?",
    options: [
      'Langsung sambungkan ke Wi-Fi dan kirim emailnya',
      'Sambungkan ke Wi-Fi, tapi aktifkan layanan VPN-mu dulu sebelum mengirim email',
      'Tunda pengiriman email sampai mendapatkan koneksi internet yang lebih aman',
      'Gunakan paket data pribadimu saja untuk mengirim email',
    ],
    answer: [
      'Sambungkan ke Wi-Fi, tapi aktifkan layanan VPN-mu dulu sebelum mengirim email',
      'Tunda pengiriman email sampai mendapatkan koneksi internet yang lebih aman',
      'Gunakan paket data pribadimu saja untuk mengirim email',
    ],
    multiple: true,
  },
];
