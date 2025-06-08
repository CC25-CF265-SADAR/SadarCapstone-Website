import {
  generateFooterTemplate,
  generateScamTypeTemplate,
  generateTabCekAjaDuluTemplate,
  markCurrentTabActive,
  generateLeaderboardLinkTemplate,
} from '../../../templates/template';
import CekLinkPresenter from './cekLink-presenter';
import { fetchPhishingLeaderboard } from '../../../data/api';

export default class CekLinkPage {
  async render() {
    return `
      <section class="mt-5 mx-12">
        <div id="tab-container"></div>
      </section>
      <section class="flex flex-col justify-center items-center px-4 mb-12 sm:px-6 lg:px-8">
            <div class="cekLink flex flex-col gap-2 justify-center items-center mt-12 p-10 rounded-xl border border-gray-200 shadow-sm">
              <h1 class="text-2xl sm:text-3xl font-semibold text-[#42A7C3]">Cek Link Mencurigakan</h1>
              <h2 class="text-base sm:text-lg font-regular text-gray-600 mb-5 text-center w-full">Masukkan tautan mencurigakan untuk mengetahui apakah link tersebut aman, berisiko phishing, atau bagian dari modus penipuan.</h2>
              <form class="flex flex-row content-stretch w-full max-w-xl">
                <label for="search" class="sr-only">Search</label>
                <div class="relative flex-grow">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="search" class="block w-full py-4 pl-10 text-md text-gray-900 border border-[#42A7C3] rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                </div>

                <button type="submit" class="text-white bg-[#42A7C3] hover:bg-[#378BA2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-md px-7 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Cek Link
                </button>
              </form>
              <div id="loading-indicator" class="hidden mt-4 text-gray-500">🔍 Sedang memproses link...</div>
              <div id="link-result" class="hidden mt-4 text-center p-4 bg-gray-100 border rounded text-gray-800"></div>
            </div>
        </section>
        ${generateScamTypeTemplate({
<<<<<<< HEAD
          title: 'Jenis Link Mencurigakan',
          subtitle1: 'Link Phishing Login Palsu',
=======
          title: 'Jenis Pesan Spammm',
          subtitle1: 'Pesan Hadiah Palsu',
>>>>>>> d6ef0c7 (leaderboard done)
          content1:
            'Biasanya menyerupai halaman login bank, email, atau e-wallet. Jika kamu login di sana, data kamu bisa dicuri.',
          subtitle2: 'Link Undian Hadiah / Giveaway Bohongan',
          content2:
            'Link ini menawarkan hadiah menggiurkan dari brand besar. Biasanya minta data pribadi atau uang “biaya admin”.',
          subtitle3: 'Link Paket Palsu',
          content3:
            'Mengaku dari JNE, J&T, atau ekspedisi lain, menyuruh klik untuk lacak paket atau bayar ongkir. Sering disisipkan malware atau phising.',
          subtitle4: 'Link Aplikasi Palsu',
          content4:
            'Link download aplikasi (APK) dari sumber tidak resmi, biasanya dikirim lewat pesan WA/SMS. Bisa mencuri data atau ambil alih HP kamu.',
        })}
        ${generateLeaderboardLinkTemplate()}
        ${generateFooterTemplate()}
    `;
  }

  async afterRender() {
    document.getElementById('tab-container').innerHTML = generateTabCekAjaDuluTemplate();
    markCurrentTabActive();

    const form = document.querySelector('form');
    const input = document.getElementById('search');
    const loading = document.getElementById('loading-indicator');
    const resultBox = document.getElementById('link-result');
    const submitBtn = form.querySelector('button[type="submit"]');

    const presenter = new CekLinkPresenter({
      onResult: ({ url, prediction, probability }) => {
        loading.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Cek Link';
        resultBox.classList.remove('hidden');

        resultBox.innerHTML = `
        <p><strong>URL:</strong> ${url}</p>
        <p><strong>Status:</strong> ${prediction}</p>
        <p><strong>Probabilitas Phishing:</strong> ${(probability * 100).toFixed(2)}%</p>
      `;
      },
      onError: (message) => {
        loading.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Cek Link';
        resultBox.classList.remove('hidden');
        resultBox.innerHTML = `<p class="text-red-600">❌ ${message}</p>`;
      },
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const url = input.value.trim();

      if (!url) {
        alert('Masukkan link terlebih dahulu.');
        return;
      }

      // Reset UI
      loading.classList.remove('hidden');
      resultBox.classList.add('hidden');
      submitBtn.disabled = true;
      // submitBtn.textContent = 'Memproses...';

      await presenter.processLink(url);
    });

    const renderPhishingLeaderboard = async (monthOnly = false) => {
      const listEl = document.getElementById('leaderboard-list');
      if (!listEl) return;

      try {
        const data = await fetchPhishingLeaderboard(monthOnly);
        listEl.innerHTML = data.map((item, idx) => `
          <li class="flex items-start gap-3 p-4 border rounded-xl bg-white shadow-sm">
            <div class="w-12 h-12 rounded-lg bg-[#FFF1AA] text-[#2C6F82] text-xl font-bold flex items-center justify-center">${idx + 1}</div>
            <div>
              <h3 class="text-xl text-gray-800 font-regular">${item.url}</h3>
              <p class="text-base font-regular text-gray-500">telah dicari sebanyak ${item.count} kali</p>
            </div>
          </li>
        `).join('');
      } catch (err) {
        listEl.innerHTML = `<li class="text-red-500">Gagal memuat leaderboard: ${err.message}</li>`;
      }
    };
    
    renderPhishingLeaderboard(false);
    
    const btnAll = document.getElementById('btn-leaderboard-all');
    const btnMonth = document.getElementById('btn-leaderboard-month');

    btnAll?.addEventListener('click', () => {
      btnAll.classList.add('bg-[#42A7C3]', 'text-white');
      btnAll.classList.remove('bg-white', 'text-gray-600');

      btnMonth.classList.remove('bg-[#42A7C3]', 'text-white');
      btnMonth.classList.add('bg-white', 'text-gray-600');

      renderPhishingLeaderboard(false);
    });

    btnMonth?.addEventListener('click', () => {
      btnMonth.classList.add('bg-[#42A7C3]', 'text-white');
      btnMonth.classList.remove('bg-white', 'text-gray-600');
    
      btnAll.classList.remove('bg-[#42A7C3]', 'text-white');
      btnAll.classList.add('bg-white', 'text-gray-600');

      renderPhishingLeaderboard(true);
    });
    setInterval(() => {
      renderPhishingLeaderboard(false);
    }, 1000);
  }
}