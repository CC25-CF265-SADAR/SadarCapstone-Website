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
    type: "mcq",
    question: "Kamu menerima email dari seseorang yang mengaku sebagai HRD dari perusahaan impianmu. Isinya mengatakan bahwa kamu lolos tahap awal rekrutmen dan diminta untuk melengkapi data pribadi serta mengunggah scan KTP dan foto selfie dengan KTP. Email tersebut terlihat resmi, tapi dikirim dari alamat Gmail umum, bukan domain perusahaan. Apa tindakan paling tepat yang harus kamu ambil?",
    options: ["Langsung kirim data karena takut kehilangan kesempatan kerja", "Balas email dan minta nomor WA HRD untuk memastikan", "Kirim foto KTP dan selfie sesuai permintaan karena banyak lowongan memang seperti itu", "Tahan dulu dan cek kebenaran email ke situs resmi atau akun media sosial perusahaan"],
    answer: "Tahan dulu dan cek kebenaran email ke situs resmi atau akun media sosial perusahaan",
    multiple: false
  },
  {
    id: 8,
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
  id: 9,
  type: "dragdrop",
  question: "Dina sedang mencari peluang kerja tambahan di media sosial. Ia menerima beberapa tawaran berbeda. Beberapa terdengar menjanjikan, namun ia merasa perlu berhati-hati karena sempat membaca tentang penipuan money rule. Ia memutuskan mencatat ciri-ciri dari setiap tawaran tersebut. Bantu Dina memilah mana yang merupakan ciri dari penipuan money rule dan mana yang termasuk dalam prosedur resmi.Seret dan letakkan setiap pernyataan ke kolom yang sesua",
  options: [
    { text: 'Dana diberikan melalui proses yang transparan dan gratis', category: 'Prosedur Resmi' },
    { text: 'Diminta membayar “pajak hadiah” sebelum dana dikirim', category: 'Penipuan Money Rule' },
    { text: 'Tawaran datang dari chat pribadi yang mendesak dan tidak resmi', category: 'Penipuan Money Rule' },
    { text: 'Ada dokumen legal yang bisa diverifikasi secara resmi', category: 'Prosedur Resmi' }
  ],
  dropZones: ['Penipuan Money Rule', 'Prosedur Resmi']
  },
  {
    id: 10,
    type: "mcq",
    question: "Bayu menerima pesan dari akun tidak dikenal di media sosial yang mengatakan bahwa ia mendapatkan dana bantuan sosial sebesar Rp25 juta. Namun, ia diminta untuk mentransfer Rp500.000 sebagai “verifikasi dana”. Apa tindakan yang benar seharusnya dilakukan Bayu?",
    options: ["Meminta bukti legalitas dana bantuan dan kontak resmi pengirim", " Mengirim uang Rp500.000 agar dana bantuan bisa segera dicairkan", "Memblokir akun tersebut dan melaporkannya sebagai penipuan", "Memberikan nomor rekening agar dana bisa ditransfer"],
    answer: ["Meminta bukti legalitas dana bantuan dan kontak resmi pengirim", "Memblokir akun tersebut dan melaporkannya sebagai penipuan"],
    multiple: true
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
