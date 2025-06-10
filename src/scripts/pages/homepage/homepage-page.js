import {
  generateFooterTemplate,
  generateLeaderboardLinkTemplate,
  generateModuleTemplate,
  generateModuleDetailTemplate,
} from '../../templates/template.js';
import HomePresenter from './homepage-presenter.js';
import { setupProfileDropdown } from '../../utils/navbar-interaction.js';
import { getLogout } from '../../utils/auth.js';
import { faqList } from '../../data/faq-data.js';
import { fetchPhishingLeaderboard } from '../../data/api.js';

export default class Homepage {
  constructor() {
    this.presenter = new HomePresenter(this);
  }

  async render() {
    return `
      <div class="max-w-screen-xl ">
            <section class="hero-image">
                <section class="bg-white sm:grid sm:grid-cols-2">
                  <div class="p-8 md:p-12 lg:px-16 lg:py-24">
                      <div class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h2 class="text-2xl font-semibold text-gray-900 md:text-3xl">
                        SADAR: Saring, Amankan, Deteksi, Anti-Rugi
                        </h2>

                        <p class="hidden text-xl font-semibold text-gray-900 md:mt-4 md:block">
                        Jangan Sampai Ketipu!
                        </p>
                        
                        <p class="hidden text-gray-500 md:mt-4 md:block">
                        Penipuan digital sekarang makin licik! Mulai dari pesan spam hingga link jebakan. Tes seberapa waspada kamu lewat simulasi interaktif ini. Seru, cepat, dan bikin kamu lebih sadar!
                        </p>
        
                        <div class="mt-4 md:mt-8">
                        <a
                            href="#/quiz"
                            class="inline-block rounded-full bg-[#42A7C3] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#2C6F82] focus:outline-hidden"
                            >
                            Coba Sekarang ➔
                        </a>
                    </div>
                </div>
            </div>
            
            <img
            alt="image"
            src="https://www.kba.one/files/images/20240427-20210825094845000000datasecurity11.jpg"
            class="mt-5 h-80 w-full object-cover sm:h-full"/>
            </section>
            </section>

            <section class="info-1 font-jakarta px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl my-12">
                <h1 class="font-semibold text-2xl sm:text-3xl text-center mb-3 md:mb-10 py-8">
                    <span class="text-[#42A7C3]">Pertumbuhan Penetrasi Internet</span> di Indonesia
                </h1>

                <article class="article-info-1 flex flex-col lg:flex-row lg:gap-10 items-center lg:items-start justify-between px-8">
                    <section class="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                        <h2 class="text-xl sm:text-3xl font-semibold">Tahukah Kamu?</h2>
                        <p class="text-lg sm:text-xl"> Selama tujuh tahun terakhir, jumlah penduduk terkoneksi internet tahun 2024 mencapai
                        <span class="font-bold inline-block text-white bg-[#378BA2] px-1"> 221.563.479 </span> jiwa dari total populasi 278.696.200 jiwa penduduk Indonesia.</p>
                        <p class="text-sm sm:text-base"> Sumber: Asosiasi Penyelenggara Jasa Internet Indonesia (APJII) 2024</p>
                    </section>

                    <aside class="w-full max-w-xs sm:max-w-sm mt-8 lg:mt-0">
                        <img
                        src="images/grafik-data-penetrasi.svg"
                        alt="Grafik penetrasi di Indonesia"
                        class="w-full h-auto object-contain"
                        />
                    </aside>
                 </article>
            </section>

            <section class="info-2 flex flex-col lg:flex-row lg:gap-10 items-center lg:items-start justify-between px-8 my-12">
                <article class="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0 text-center lg:text-left px-8">
                    <h1 class="font-semibold text-2xl sm:text-3xl">
                    <span class="text-[#42A7C3]">Korban</span> Penipuan Online
                    </h1>

                    <p class="text-md sm:text-xl">
                    <span class="font-bold">Rendahnya tingkat literasi digital</span> masyarakat Indonesia menyebabkan masih banyak kelompok umur yang rentan menjadi korban penipuan online.
                    </p>

                    <p class="text-md sm:text-xl">
                    Meskipun pengguna internet semakin tinggi, sebagian besar masyarakat belum memiliki kebiasaan atau kemampuan memadai dalam memverifikasi informasi, menjaga keamanan data pribadi, atau mengenali bentuk‑bentuk penipuan digital yang makin canggih.
                    </p>
                </article>

                <aside class="w-full max-w-xs sm:max-w-md mt-8 lg:mt-0">
                    <img
                    src="images/korban-penipuan-online.png"
                    alt="Korban penipuan online di Indonesia"
                    class="w-full h-full object-cover rounded-lg"
                    />
                </aside>
            </section>

            <section class="sadar-feature relative flex flex-col gap-8 min-h-[200px] my-10">
                <img
                    src="images/background_type.svg"
                    alt="Background sadar"
                    class="absolute inset-0 -z-10 w-full h-full object-cover"
                />

                <article class="text-white flex flex-col gap-4 z-10 mt-10 px-4 text-center">
                    <h1 class="text-2xl sm:text-3xl font-bold">SADAR Mulai Dari Sekarang!</h1>
                    <p class="text-md md:text-lg max-w-xl md:max-w-2xl mx-auto">
                    Gunakan layanan kami untuk meningkatkan pengalaman Anda dalam menjaga informasi dan data dari penipuan online
                    </p>
                </article>

                <section class="sadar-feature-detail z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
                    <!-- CekAjaDulu -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 flex flex-col gap-5">
                      <img src="images/ikon-cekajadulu.svg" class="w-[72px] h-[72px]" alt="Ikon CekAjaDulu" />
                      <h2 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">CekAjaDulu</h2>
                      <p class="text-gray-500 dark:text-gray-400">
                        Sistem cerdas berbasis machine learning dan NLP untuk mendeteksi pesan spam dan tautan phising.
                      </p>
                      <div class="flex flex-row gap-6">
                        <a href="#/link-checking/cek-umum" onclick="window.scrollTo(0, 0)" class="inline-flex font-medium items-center text-[#42A7C3] hover:underline">
                          Lihat Fitur
                          <svg class="w-3.5 h-3.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <!-- TipuMeter -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 flex flex-col gap-5">
                      <img src="images/ikon-tipumeter.svg" class="w-[72px] h-[72px]" alt="Ikon TipuMeter" />
                      <h2 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">TipuMeter</h2>
                      <p class="text-gray-500 dark:text-gray-400">
                        Fitur gamifikasi berupa simulasi nyata yang mengukur kewaspadaan pengguna terhadap penipuan digital.
                      </p>
                      <a href="#/quiz" onclick="window.scrollTo(0, 0)" class="inline-flex font-medium items-center text-[#42A7C3] hover:underline">
                        Lihat Fitur
                        <svg class="w-3.5 h-3.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                      </a>
                    </div>

                    <!-- AntiTertipu -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 flex flex-col gap-5">
                      <img src="images/ikon-antitertipu.svg" class="w-[72px] h-[72px]" alt="Ikon Antitertipu" />
                      <h2 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Antitertipu</h2>
                      <p class="text-gray-500 dark:text-gray-400">
                        Platform interaktif yang mengedukasi pengguna tentang penipuan digital melalui materi multimedia dan kuis.
                      </p>
                      <a href="#/module-overview" onclick="window.scrollTo(0, 0)" class="inline-flex font-medium items-center text-[#42A7C3] hover:underline">
                        Lihat Fitur
                        <svg class="w-3.5 h-3.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                      </a>
                    </div>
                  </section>
            </section>

            <section class="my-10">
                ${generateLeaderboardLinkTemplate()}
            </section>
            
            <section class="faq bg-white font-jakarta flex items-center py-12 px-18 my-10">
              <div class="w-full">
                <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-black mb-2">Pertanyaan yang Sering Diajukan</h2>
                <p class="text-base sm:text-lg md:text-xl text-[#6D7280] text-center max-w-xl mx-auto mb-6">
                  Temukan jawaban dari pertanyaan umum seputar fitur dan layanan kami.
                </p>

                <!-- Tabs Kategori -->
                <div class="flex flex-wrap justify-center space-x-2 mb-8">
                  <button data-category="all" class="faq-tab px-4 py-2 border border-[#42A7C3] bg-[#42A7C3] text-white text-sm sm:text-base rounded-4xl mb-2 sm:mb-0">Semua</button>
                  <button data-category="deteksi" class="faq-tab px-4 py-2 border border-[#42A7C3] bg-white text-gray-600 text-sm sm:text-base rounded-4xl mb-2 sm:mb-0 hover:bg-gray-200">Deteksi</button>
                  <button data-category="modul edukasi" class="faq-tab px-4 py-2 border border-[#42A7C3] bg-white text-gray-600 text-sm sm:text-base rounded-4xl mb-2 sm:mb-0 hover:bg-gray-200">Modul Edukasi</button>
                  <button data-category="simulasi" class="faq-tab px-4 py-2 border border-[#42A7C3] bg-white text-gray-600 text-sm sm:text-base rounded-4xl mb-2 sm:mb-0 hover:bg-gray-200">Simulasi</button>
                  <button data-category="penipuan" class="faq-tab px-4 py-2 border border-[#42A7C3] bg-white text-gray-600 text-sm sm:text-base rounded-4xl mb-2 sm:mb-0 hover:bg-gray-200">Penipuan</button>
                </div>

                <!-- Container FAQ -->
                <div id="faq-content" class="space-y-4"></div>
              </div>
            </section>

            ${generateFooterTemplate()}
      </div>
            
        `;
  }

  async afterRender() {
    setupProfileDropdown();

    document.addEventListener('click', (event) => {
      if (event.target.id === 'logout-btn') {
        getLogout();
        location.hash = '/';
        location.reload(); // agar render ulang navbar
      }
    });

    this.presenter.setFAQData(faqList);
    this.presenter.renderFAQ('all');

    document.querySelectorAll('.faq-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;

        document.querySelectorAll('.faq-tab').forEach((tab) => {
          tab.classList.remove('bg-[#42A7C3]', 'text-white');
          tab.classList.add('bg-white', 'text-gray-600');
        });

        btn.classList.remove('bg-white', 'text-gray-600');
        btn.classList.add('bg-[#42A7C3]', 'text-white');

        this.presenter.renderFAQ(category);
      });
    });

    const renderPhishingLeaderboard = async (monthOnly = false) => {
      const listEl = document.getElementById('leaderboard-list');
      if (!listEl) return;

      try {
        const data = await fetchPhishingLeaderboard(monthOnly);
        listEl.innerHTML = data
          .map(
            (item, idx) => `
            <li class="flex items-start gap-3 p-4 border border-gray-300 rounded-xl bg-white shadow-sm">
              <div class="w-12 h-12 rounded-lg bg-[#FFF1AA] text-[#2C6F82] text-xl font-bold flex items-center justify-center flex-shrink-0">${idx + 1}</div>
              <div class="flex-1 min-w-0 overflow-hidden">
                <h3 class="text-sm sm:text-base md:text-xl text-gray-800 font-regular break-words">
                  ${item.url}
                </h3>
                <p class="text-sm sm:text-base font-regular text-gray-500 mt-1">telah dicari sebanyak ${item.count} kali</p>
              </div>
            </li>
          `
          )
          .join('');
      } catch (err) {
        listEl.innerHTML = `<li class="text-red-500">Gagal memuat leaderboard: ${err.message}</li>`;
      }
    };

    // Render awal
    renderPhishingLeaderboard(false);

    // Setup tombol filter
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

    // Ganti interval 1 detik menjadi 30 detik atau 1 menit
      const POLLING_INTERVAL = 5000; // 30 detik

      const pollLeaderboard = () => {
        const activeFilter = document.getElementById('btn-leaderboard-month')?.classList.contains('bg-[#42A7C3]');
        renderPhishingLeaderboard(activeFilter);
        setTimeout(pollLeaderboard, POLLING_INTERVAL); // Rekursif dengan setTimeout
      };

      // Mulai polling setelah render pertama
      pollLeaderboard();
  }

  renderFAQList(filteredFaq) {
    const container = document.getElementById('faq-content');
    container.innerHTML = filteredFaq
      .map(
        (faq) => `
      <details class="group border border-gray-200 rounded-2xl p-6 bg-white open:bg-[#DFF0F5] transition-colors duration-100">
        <summary class="flex items-center justify-between cursor-pointer">
          <h3 class="text-xl sm:text-lg md:text-xl font-medium text-gray-900">${faq.question}</h3>
          <svg xmlns="http://www.w3.org/2000/svg" class="block size-5 shrink-0 group-open:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="hidden size-5 shrink-0 group-open:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9" />
          </svg>
        </summary>
        <p class="mt-4 text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">${faq.answer}</p>
      </details>
    `,
      )
      .join('');
  }
}
