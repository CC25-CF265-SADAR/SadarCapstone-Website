import {
  generateFooterTemplate,
  generateScamTypeTemplate,
  generateTabCekAjaDuluTemplate,
  markCurrentTabActive,
  generateLeaderboardSpamTemplate,
} from '../../../templates/template';
import CekSpamPresenter from './cekSpam-presenter';
import { fetchSpamLeaderboard } from '../../../data/api';

export default class CekSpamPage {
  async render() {
    return `
    <section class="mt-5 mx-12">
      <div id="tab-container"></div>
    </section>
    <section class="flex flex-col justify-center items-center px-4 mb-12 sm:px-6 lg:px-8">
      <div class="cekLink flex flex-col gap-2 justify-center items-center mt-12 p-5 sm:p-10 rounded-xl border border-gray-200 shadow-sm w-full max-w-4xl">
        <h1 class="text-2xl sm:text-3xl font-semibold text-[#42A7C3] text-center">Cek Pesan Spam</h1>
        <h2 class="text-base sm:text-lg font-regular text-gray-600 mb-5 text-center w-full">Salin dan tempel pesan mencurigakan di sini untuk mengetahui apakah itu termasuk spam, penipuan, atau hanya pesan biasa yang tidak berbahaya.</h2>
        <form id="spam-form" class="flex flex-col gap-3 items-end w-full">
          <label for="search" class="sr-only">Search</label>
          <textarea id="search" class="border border-[#42A7C3] rounded-lg w-full p-4 sm:p-5 field-sizing-fixed resize-none" rows="8" placeholder="Masukkan pesan disini..." required></textarea>
          <button type="submit" class="text-white bg-[#42A7C3] hover:bg-[#378BA2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md sm:text-md px-5 sm:px-7 py-2.5 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Cek Pesan
          </button>
        </form>
        <div id="spam-result" class="mt-4 w-full text-center text-md text-gray-700"></div>
      </div>
    </section>
    
    ${generateScamTypeTemplate({
      title: 'Jenis Pesan Spam',
      subtitle1: 'Pesan Hadiah Palsu',
      content1:
        'Mengklaim kamu menang hadiah dari brand besar, padahal kamu tidak pernah ikut undian. Biasanya minta data pribadi atau transfer “biaya admin”.',
      subtitle2: 'Pesan OTP Palsu',
      content2:
        'Berisi permintaan kode OTP dengan alasan verifikasi ulang atau keamanan, padahal bertujuan mengambil alih akun digital kamu.',
      subtitle3: 'Pesan Phishing dari Lembaga Palsu',
      content3:
        'Mengaku dari bank, e-commerce, atau kurir, lalu menyertakan link palsu untuk mencuri data login atau informasi pribadi.',
      subtitle4: 'Pesan Ancaman atau Pemerasan',
      content4:
        'Berisi ancaman menyebarkan data pribadi atau rekaman palsu, lalu meminta uang agar ancaman tidak dijalankan.',
    })}
    ${generateLeaderboardSpamTemplate()}
    ${generateFooterTemplate()}
    `;
  }

  async afterRender() {
    document.getElementById('tab-container').innerHTML = generateTabCekAjaDuluTemplate();
    markCurrentTabActive();

    const form = document.getElementById('spam-form');
    const input = document.getElementById('search');
    const resultDiv = document.getElementById('spam-result');

    const presenter = new CekSpamPresenter({
      onResult: (result) => {
        const { prediction, probability, keywords } = result;
        const isSpam = prediction.toLowerCase() === 'spam';

        resultDiv.innerHTML = `
          <div class="mt-4 p-4 rounded-lg border ${
            isSpam
              ? 'border-red-300 bg-red-50 text-red-700'
              : 'border-green-300 bg-green-50 text-green-700'
          }">
            <p class="text-lg font-semibold">Hasil Deteksi: ${prediction}</p>
            <p class="text-sm mt-1">Probabilitas: ${probability}%</p>
            <p class="text-sm mt-1">Kata Kunci: <span class="font-mono">${keywords.join(', ')}</span></p>
          </div>
        `;
      },
      onError: (message) => {
        resultDiv.innerHTML = `<span class="text-red-500">${message}</span>`;
      },
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      resultDiv.innerHTML = '<span class="text-gray-400">Memproses...</span>';
      presenter.handleTextSubmit(input.value);
    });

    const renderSpamLeaderboard = async (monthOnly = false) => {
      const listEl = document.getElementById('spam-leaderboard-list');
      if (!listEl) return;

      try {
        const data = await fetchSpamLeaderboard(monthOnly);
        listEl.innerHTML = data.map((item, idx) => `
          <li class="flex items-start gap-3 p-4 border rounded-xl bg-white shadow-sm">
            <div class="w-12 h-12 rounded-lg bg-[#FFF1AA] text-[#2C6F82] text-xl font-bold flex items-center justify-center">${idx + 1}</div>
            <div>
              <h3 class="text-xl text-gray-800 font-regular">${item.keyword}</h3>
              <p class="text-base font-regular text-gray-500">kata ini telah muncul sebanyak ${item.count} kali</p>
            </div>
          </li>
        `).join('');
      } catch (err) {
        listEl.innerHTML = `<li class="text-red-500">Gagal memuat leaderboard: ${err.message}</li>`;
      }
    };

    // panggil default
    renderSpamLeaderboard(false);

    // event toggle
    const btnAll = document.getElementById('btn-spam-leaderboard-all');
    const btnMonth = document.getElementById('btn-spam-leaderboard-month');

    btnAll?.addEventListener('click', () => {
      // Aktifkan btnAll
      btnAll.classList.add('bg-[#42A7C3]', 'text-white');
      btnAll.classList.remove('bg-white', 'text-gray-600', 'hover:bg-[#DFF0F5]', 'hover:text-[#2C6F82]');

      // Nonaktifkan btnMonth
      btnMonth.classList.remove('bg-[#42A7C3]', 'text-white');
      btnMonth.classList.add('bg-white', 'text-gray-600', 'hover:bg-[#DFF0F5]', 'hover:text-[#2C6F82]');

      renderSpamLeaderboard(false);
    });

    btnMonth?.addEventListener('click', () => {
      // Aktifkan btnMonth
      btnMonth.classList.add('bg-[#42A7C3]', 'text-white');
      btnMonth.classList.remove('bg-white', 'text-gray-600', 'hover:bg-[#DFF0F5]', 'hover:text-[#2C6F82]');

      // Nonaktifkan btnAll
      btnAll.classList.remove('bg-[#42A7C3]', 'text-white');
      btnAll.classList.add('bg-white', 'text-gray-600', 'hover:bg-[#DFF0F5]', 'hover:text-[#2C6F82]');

      renderSpamLeaderboard(true);
    });
    setInterval(() => {
      renderSpamLeaderboard(false); // atau true kalau untuk bulan ini
    }, 1000);
  }
}
