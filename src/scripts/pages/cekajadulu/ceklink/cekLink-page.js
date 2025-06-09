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
              <div id="link-result" class="mt-2 mb-2 w-full text-center text-md text-gray-700"></div>
              <a href="#/link-checking/cek-link" id="periksaLagi" class="hidden text-white bg-[#42A7C3] hover:bg-[#378BA2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md sm:text-md px-5 sm:px-7 py-2.5 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Periksa tautan lain
              </a>
            </div>
        </section>
        ${generateScamTypeTemplate({
          title: 'Jenis Pesan Spammm',
          subtitle1: 'Pesan Hadiah Palsu',
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
    const resultDiv = document.getElementById('link-result');
    const periksaLagi = document.getElementById('periksaLagi');

    const presenter = new CekLinkPresenter({
      onResult: ({ url, prediction, probability }) => {
        const isPhishing = prediction.toLowerCase() === 'phishing';
        console.log(isPhishing);
        resultDiv.innerHTML = `
          <div class="flex flex-col justify-center items-center mt-0 p-4 rounded-lg border text-black
            ${isPhishing ? 'border-red-300 bg-[#FFF8F8]' : 'border-green-300 bg-[#F8FFF9]'}">
              <!-- Ikon & Judul -->
            <div class="flex flex-col gap-3 justify-center items-center text-center md:gap-3">
              <div class="flex flex-row justify-center items-center gap-3 flex-wrap text-center">
                <svg class="${isPhishing ? 'fill-red-700' : 'fill-green-700'} h-6 w-6 md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="${isPhishing ? 'M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z' : 'M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z'}"/>
                </svg>
                <p class="text-lg font-semibold md:text-xl">
                  ${isPhishing ? 'Waspada! Link Ini Terindikasi Phishing' : 'Tautan Terlihat Aman'}
                </p>
              </div>

              <!-- Deskripsi -->
              <p class="max-w-3xl text-center text-md font-base px-4">
                ${
                  isPhishing
                    ? `Tautan <span class="font-semibold text-red-700">${url}</span> menunjukkan ciri-ciri penipuan digital. Bisa jadi mencoba mencuri informasi pribadi seperti password atau data perbankan. Jangan klik, jangan isi apa pun, dan langsung abaikan atau hapus tautan ini.`
                    : `Tautan <span class="font-semibold text-green-700">${url}</span> tidak menunjukkan indikasi phishing. Kamu bisa membukanya dengan lebih tenang. Namun, tetap hati-hati saat mengisi data pribadi atau login melalui tautan apa pun.`
                }
              </p>

              <!-- Bagian Gauge + Kata Kunci -->
              <div class="flex flex-col lg:flex-row items-center justify-center gap-6 w-full mt-2">
                
                <!-- Gauge Component -->
                <div class="relative w-[180px] h-[90px] overflow-hidden flex-shrink-0">
                  <svg class="w-full h-[180px] rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="16" fill="none"
                      class="stroke-current text-gray-200 dark:text-neutral-700"
                      stroke-width="1.5" stroke-dasharray="50 100" stroke-linecap="round" />
                    <circle cx="18" cy="18" r="16" fill="none"
                      class="stroke-current ${isPhishing ? 'text-red-700 dark:text-red-700' : 'text-green-700 dark:text-green-700'}"
                      stroke-width="2" stroke-dasharray="${(probability * 100).toFixed(2)} 100" stroke-linecap="round" />
                  </svg>

                  <!-- Value Text -->
                  <div class="absolute top-[36px] left-1/2 transform -translate-x-1/2 text-center">
                    <span class="text-3xl font-bold ${isPhishing ? 'text-red-700 dark:text-red-700' : 'text-green-700 dark:text-green-700'}">
                      ${(probability * 100).toFixed(2)}%
                    </span>
                    <span class="text-sm block ${isPhishing ? 'text-red-700 dark:text-red-700' : 'text-green-700 dark:text-green-700'}">
                      Probabilitas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        periksaLagi.classList.remove('hidden');
      },
      onError: (message) => {
        resultDiv.innerHTML = `<span class="text-red-500">${message}</span>`;
        periksaLagi.classList.remove('hidden');
      },
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const url = input.value.trim();

      if (!url) {
        alert('Masukkan link terlebih dahulu.');
        return;
      }

      form.classList.add('hidden');
      resultDiv.innerHTML = `
      <div role="status" class="flex items-center justify-center gap-5 text-gray-600">
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#378BA2]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="text-base">Mengecek tautan</span>
      </div>
      `;

      await presenter.processLink(url);
    });
    periksaLagi.addEventListener('click', (e) => {
      e.preventDefault();
      // Reset form
      form.classList.remove('hidden');
      input.value = '';
      resultDiv.innerHTML = '';
      periksaLagi.classList.add('hidden');
    });

    const renderPhishingLeaderboard = async (monthOnly = false) => {
      const listEl = document.getElementById('leaderboard-list');
      if (!listEl) return;

      try {
        const data = await fetchPhishingLeaderboard(monthOnly);
        listEl.innerHTML = data
          .map(
            (item, idx) => `
          <li class="flex items-start gap-3 p-4 border rounded-xl bg-white shadow-sm">
            <div class="w-12 h-12 rounded-lg bg-[#FFF1AA] text-[#2C6F82] text-xl font-bold flex items-center justify-center">${idx + 1}</div>
            <div>
              <h3 class="text-xl text-gray-800 font-regular">${item.url}</h3>
              <p class="text-base font-regular text-gray-500">telah dicari sebanyak ${item.count} kali</p>
            </div>
          </li>
        `,
          )
          .join('');
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
