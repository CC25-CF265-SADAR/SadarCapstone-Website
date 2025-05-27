export const questions = [
  {
    id: 1,
    type: "mcq",
    question: "Apa ibu kota Indonesia?",
    options: ["Bandung", "Jakarta", "Surabaya", "Bali"],
    answer: "Jakarta",
    multiple: false
  },
  {
    id: 2,
    type: 'dragdrop',
    question: 'Pilih mana yang hoaks atau fakta.',
    options: [
    { text: 'Informasi tidak mencantumkan sumber resmi', category: 'Hoaks' },
    { text: 'Bersumber dari web resmi pemerintah', category: 'Fakta' }
  ],
    dropZones: ['Fakta', 'Hoaks']
  },
  {
    id: 3,
    type: "mcq",
    question: "Pilih semua kota besar di Indonesia",
    options: ["Bandung", "Jakarta", "Surabaya", "Tokyo"],
    answer: ["Bandung", "Jakarta", "Surabaya"],
    multiple: true
  },
  {
    id: 4,
    type: "mcq",
    question: "Apa ibu kota Indonesia?",
    options: ["Bandung", "Jakarta", "Surabaya", "Bali"],
    answer: "Jakarta",
    multiple: false
  },
  {
    id: 5,
    type: "mcq",
    question: "Apa ibu kota Indonesia?",
    options: ["Bandung", "Jakarta", "Surabaya", "Bali"],
    answer: "Jakarta",
    multiple: false
  },
  {
    id: 6,
    type: "mcq",
    question: "Pilih semua kota besar di Indonesia",
    options: ["Bandung", "Jakarta", "Surabaya", "Tokyo"],
    answer: ["Bandung", "Jakarta", "Surabaya"],
    multiple: true
  },
  {
  id: 7,
  type: "dragdrop",
  question: "Kamu menerima email yang mengaku dari “Admin Pajak Nasional”. Mereka menyebutkan kamu dapat pengembalian pajak dan diminta klik link untuk mengisi data pribadi dan rekening. Seret dan letakkan seluruh pilihan di bawah ini ke kolom yang sesuai",
  options: [
    { text: 'Klik link dan isi data rekening', category: 'Berbahaya' },
    { text: 'Abaikan email dan laporkan sebagai spam', category: 'Aman' },
    { text: 'Cek alamat email pengirim secara teliti', category: 'Aman' },
    { text: 'Balas email untuk tanya lebih lanjut', category: 'Berbahaya' },
    { text: 'Cari info di situs resmi Direktorat Jenderal Pajak', category: 'Aman' },
    { text: 'Cek alamat email pengirim secara teliti', category: 'Aman' }
  ],
  dropZones: ['Aman', 'Berbahaya']
  },
  {
    id: 8,
    type: "mcq",
    question: "Apa ibu kota Indonesia?",
    options: ["Bandung", "Jakarta", "Surabaya", "Bali"],
    answer: "Jakarta",
    multiple: false
  },
  {
    id: 9,
    type: "mcq",
    question: "Kamu menerima email dari seseorang yang mengaku sebagai HRD dari perusahaan impianmu. Isinya mengatakan bahwa kamu lolos tahap awal rekrutmen dan diminta untuk melengkapi data pribadi serta mengunggah scan KTP dan foto selfie dengan KTP. Email tersebut terlihat resmi, tapi dikirim dari alamat Gmail umum, bukan domain perusahaan. Apa tindakan paling tepat yang harus kamu ambil?",
    options: ["Langsung kirim data karena takut kehilangan kesempatan kerja", "Balas email dan minta nomor WA HRD untuk memastikan", "Kirim foto KTP dan selfie sesuai permintaan karena banyak lowongan memang seperti itu", "Tahan dulu dan cek kebenaran email ke situs resmi atau akun media sosial perusahaan"],
    answer: "Tahan dulu dan cek kebenaran email ke situs resmi atau akun media sosial perusahaan",
    multiple: false
  },
  {
    id: 10,
    type: "dragdrop",
    question: 
    "Posisikan diri anda ketika anda ingin membeli barang yang ukurannya cukup besar dan berat secara online, tentunya anda akan mencari barang yang anda butuhkan pada platform yang anda percaya. Setelah anda menemukan barang yang anda cari, anda disajikan berbagai macam barang serupa dengan spesifikasi yang sama maupun berbeda, yang ditawarkan dengan harga yang bervariasi. Selanjutnya anda memesan barang tersebut yang sekiranya memenuhi semua kebutuhan dan preferensi anda, lalu anda melanjutkan dengan memilih metode pembayaran yang disediakan pada platform jual-beli tersebut. Namun, beberapa saat setelah anda memesan barang tersebut, penjual menghubungi anda melalui chat, mengirimkan foto barang yang telah dikemas dan meminta untuk berbicara langsung kepada anda untuk membahas mengenai pengiriman. Anda menyetujui hal tersebut dan berkomunikasi langsung dengan penjual melalui telepon. Penjual menjelaskan perihal pengirimaan yang ternyata tidak dapat dikirim melalui pilihan yang disediakan platform tersebut. Penjual terdengar sangat meyakinkan dan cenderung menjelaskan secara tergesa-gesa. Penjual meminta anda untuk mengirimkan sejumlah nominal uang guna membayar biaya ekspedisi yang akan dipesankan secara mandiri oleh penjual. Dari situasi ini, seret pilihan tindakan berikut ke kolom yang sesuai: mana yang Aman dan mana yang Berisiko.",
    options: [
    { text: 'Menyetujui transfer biaya pengiriman karena suaranya terdengar "meyakinkan"', category: 'Berisiko' },
    { text: 'Mengakhiri percakapan dan meminta semua komunikasi dilakukan kembali lewat aplikasi resmi', category: 'Aman' },
    { text: 'Tidak melakukan transfer sampai ada konfirmasi resmi dari platform', category: 'Aman' },
    { text: 'Percaya karena penjual mengirimkan foto barang yang telah dikemas sebagai “bukti”', category: 'Berisiko' },
    { text: 'Melapor ke pihak customer service platform tentang permintaan penjual', category: 'Aman' },
    { text: 'Mengabaikan kebijakan toko online dan mengikuti arahan penjual di luar sistem', category: 'Berisiko' }
  ],
  dropZones: ['Aman', 'Berisiko']
  },
  {
    id: 11,
    type: "mcq",
    question: "Apa ibu kota Indonesia?",
    options: ["Bandung", "Jakarta", "Surabaya", "Bali"],
    answer: "Jakarta",
    multiple: false
  },
  {
    id: 12,
    type: "mcq",
    question: "Apa ibu kota Indonesia?",
    options: ["Bandung", "Jakarta", "Surabaya", "Bali"],
    answer: "Jakarta",
    multiple: false
  }
];
