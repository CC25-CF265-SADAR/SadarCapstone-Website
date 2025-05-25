import {
  generateFooterTemplate,
  generateLeaderboardTemplate,
  generateModuleTemplate,
  generateModuleDetailTemplate,
} from '../../templates/template.js';
import HomePresenter from './homepage-presenter.js';
import { setupProfileDropdown } from '../../utils/navbar-interaction.js';
import { getLogout } from '../../utils/auth.js';

export default class Homepage {
  async render() {
    return `
            <section class="hero-image">
                <section class="overflow-hidden bg-white sm:grid sm:grid-cols-2">
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
            src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            class="mt-5 h-40 w-full object-cover sm:h-full"/>
            </section>
            </section>

            <section class="info-1 font-jakarta px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl mx-auto">
                <h1 class="font-bold text-3xl sm:text-4xl text-center mb-10">
                    <span class="text-[#42A7C3]">Pertumbuhan Penetrasi Internet</span> di Indonesia
                </h1>

                <article class="article-info-1 flex flex-col lg:flex-row lg:gap-10 items-center lg:items-start justify-between">
                    <section class="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                        <h2 class="text-2xl sm:text-3xl font-semibold">Tahukah Kamu?</h2>
                        <p class="text-lg sm:text-2xl"> Selama tujuh tahun terakhir, jumlah penduduk terkoneksi internet tahun 2024 mencapai
                        <span class="font-bold inline-block text-white bg-[#378BA2] px-1"> 221.563.479 </span> jiwa dari total populasi 278.696.200 jiwa penduduk Indonesia.</p>
                        <p class="text-sm sm:text-base"> Sumber: Asosiasi Penyelenggara Jasa Internet Indonesia (APJII) 2024</p>
                    </section>

                    <aside class="w-full max-w-xs sm:max-w-md mt-8 lg:mt-0">
                        <img
                        src="images/grafik-data-penetrasi.svg"
                        alt="Grafik penetrasi di Indonesia"
                        class="w-full h-auto object-contain"
                        />
                    </aside>
                 </article>
            </section>

            <section class="info-2 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
                <article class="flex flex-col gap-6 w-full lg:w-3/5 text-center lg:text-left">
                    <h1 class="font-bold text-3xl sm:text-4xl leading-snug">
                    <span class="text-[#42A7C3]">Korban</span> Penipuan Online
                    </h1>

                    <p class="text-base sm:text-lg">
                    <span class="font-bold">Rendahnya tingkat literasi digital</span> masyarakat Indonesia menyebabkan masih banyak kelompok umur yang rentan menjadi korban penipuan online.
                    </p>

                    <p class="text-base sm:text-lg">
                    Meskipun tingkat penetrasi/pengguna internet semakin tinggi, sebagian besar masyarakat belum memiliki kebiasaan atau kemampuan memadai dalam memverifikasi informasi, menjaga keamanan data pribadi, atau mengenali bentuk‑bentuk penipuan digital yang makin canggih.
                    </p>
                </article>

                <aside class="w-full max-w-sm sm:max-w-md lg:max-w-[550px] lg:h-[415px] flex-shrink-0 mt-8 lg:mt-0">
                    <img
                    src="images/korban-penipuan-online.png"
                    alt="Korban penipuan online di Indonesia"
                    class="w-full h-full object-cover rounded-lg"
                    />
                </aside>
            </section>

            <section class="sadar-feature relative flex flex-col gap-8 min-h-[600px]">
                <img
                    src="images/background-sadar.png"
                    alt="Background sadar"
                    class="absolute inset-0 -z-10 w-full h-full object-cover"
                />

                <article class="text-white flex flex-col gap-4 z-10 mt-10 px-4 text-center">
                    <h1 class="text-2xl sm:text-3xl font-bold">SADAR Mulai Dari Sekarang!</h1>
                    <p class="text-base sm:text-lg max-w-xl mx-auto">
                    Gunakan layanan kami untuk meningkatkan pengalaman Anda dalam menjaga informasi dan data dari penipuan online
                    </p>
                </article>

                <section class="sadar-feature-detail z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] lg:grid-rows-2 gap-6 pb-12">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 flex flex-col gap-5 lg:row-span-2">
                        <img src="images/ikon-cekajadulu.svg" class="w-[76px] h-[76px]" alt="Ikon CekAjaDulu" />
                        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">CekAjaDulu</h2>
                        <p class="text-gray-500 dark:text-gray-400">
                            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam nec tortor massa. Praesent cursus porttitor egestas.
                        </p>
                        <div class="flex flex-row gap-6">
                            <a href="#" class="inline-flex font-medium items-center text-[#42A7C3] hover:underline">
                                Lihat Fitur
                                <svg class="w-3.5 h-3.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                            <a href="#" class="inline-flex font-medium items-center text-[#42A7C3] hover:underline">
                                Lihat Fitur
                                <svg class="w-3.5 h-3.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 flex gap-5 items-start">
                        <img src="images/ikon-tipumeter.svg" class="w-[76px] h-[76px]" alt="Ikon TipuMeter" />
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">TipuMeter</h2>
                            <p class="text-gray-500 dark:text-gray-400 mb-3">
                            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
                            </p>
                            <a href="#" class="inline-flex font-medium items-center text-[#42A7C3] hover:underline">
                            Lihat Fitur
                            <svg class="w-3.5 h-3.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                            </a>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 flex gap-5 items-start">
                        <img src="images/ikon-antitertipu.svg" class="w-[76px] h-[76px]" alt="Ikon AntiTertipu" />
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">AntiTertipu</h2>
                            <p class="text-gray-500 dark:text-gray-400 mb-3">
                            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
                            </p>
                            <a href="#" class="inline-flex font-medium items-center text-[#42A7C3] hover:underline">
                            Lihat Fitur
                            <svg class="w-3.5 h-3.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                            </a>
                        </div>
                    </div>
                </section>
            </section>

            <section class="leaderboard">
                ${generateLeaderboardTemplate()}
            </section>
            
            <section class="faq bg-white font-jakarta flex items-center py-12 px-18">
                <div class="w-full">
                    <!-- Judul dan Deskripsi aaa ga ngomitt -->
                    <h2 class="text-4xl font-semibold text-center text-black mb-2">Pertanyaan yang Sering Diajukan</h2>
                    <p class="text-base text-[#6D7280] text-center max-w-xl mx-auto mb-6">Temukan jawaban dari pertanyaan umum seputar fitur dan layanan kami.</p>

                    <!-- Tabs Kategori -->
                    <div class="flex justify-center space-x-2 mb-8 flex items-center">
                    <button class="px-4 py-2 border border-[#42A7C3] bg-[#42A7C3] text-white text-sm font-regular rounded-4xl">Semua</button>
                    <button class="px-4 py-2 border border-[#42A7C3] bg-white text-gray-600 text-sm font-regular rounded-4xl hover:bg-gray-200">Deteksi</button>
                    <button class="px-4 py-2 border border-[#42A7C3] bg-white text-gray-600 text-sm font-regular rounded-4xl hover:bg-gray-200">Modul Edukasi</button>
                    <button class="px-4 py-2 border border-[#42A7C3] bg-white text-gray-600 text-sm font-regular rounded-4xl hover:bg-gray-200">Simulasi</button>
                    <button class="px-4 py-2 border border-[#42A7C3] bg-white text-gray-600 text-sm font-regular rounded-4xl hover:bg-gray-200">penipuan</button>
                    </div>

                    <div class="space-y-4">
                    <details class="group border border-gray-200 rounded-2xl p-6 bg-white open:bg-[#DFF0F5] transition-colors duration-100">
                        <summary class="flex items-center justify-between cursor-pointer">
                        <h3 class="text-xl font-medium text-gray-900">
                            Bagaimana bila link terketuk saat ingin menyalinnya?
                        </h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="block size-5 shrink-0 group-open:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="hidden size-5 shrink-0 group-open:block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        </summary>
                        <p class="mt-4 text-gray-700 text-base leading-relaxed">
                        makanya ati ati lah pak, macam mana pula kau. hehe ntar ganti
                        </p>
                    </details>

                    <div class="space-y-4">
                    <details class="group border border-gray-200 rounded-2xl p-6 bg-white open:bg-[#DFF0F5] transition-colors duration-100">
                        <summary class="flex items-center justify-between cursor-pointer">
                        <h3 class="text-xl font-medium text-gray-900">
                            Bagaimana bila link terketuk saat ingin menyalinnya?
                        </h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="block size-5 shrink-0 group-open:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="hidden size-5 shrink-0 group-open:block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        </summary>
                        <p class="mt-4 text-gray-700 text-base leading-relaxed">
                        makanya ati ati lah pak, macam mana pula kau. hehe ntar ganti
                        </p>
                    </details>

                    <div class="space-y-4">
                    <details class="group border border-gray-200 rounded-2xl p-6 bg-white open:bg-[#DFF0F5] transition-colors duration-100">
                        <summary class="flex items-center justify-between cursor-pointer">
                        <h3 class="text-xl font-medium text-gray-900">
                            Bagaimana bila link terketuk saat ingin menyalinnya?
                        </h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="block size-5 shrink-0 group-open:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="hidden size-5 shrink-0 group-open:block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        </summary>
                        <p class="mt-4 text-gray-700 text-base leading-relaxed">
                        makanya ati ati lah pak, macam mana pula kau. hehe ntar ganti
                        </p>
                    </details>

                    <div class="space-y-4">
                    <details class="group border border-gray-200 rounded-2xl p-6 bg-white open:bg-[#DFF0F5] transition-colors duration-100">
                        <summary class="flex items-center justify-between cursor-pointer">
                        <h3 class="text-xl font-medium text-gray-900">
                            Bagaimana bila link terketuk saat ingin menyalinnya?
                        </h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="block size-5 shrink-0 group-open:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="hidden size-5 shrink-0 group-open:block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        </summary>
                        <p class="mt-4 text-gray-700 text-base leading-relaxed">
                        makanya ati ati lah pak, macam mana pula kau. hehe ntar ganti
                        </p>
                    </details>

                    <div class="space-y-4">
                    <details class="group border border-gray-200 rounded-2xl p-6 bg-white open:bg-[#DFF0F5] transition-colors duration-100">
                        <summary class="flex items-center justify-between cursor-pointer">
                        <h3 class="text-xl font-medium text-gray-900">
                            Bagaimana bila link terketuk saat ingin menyalinnya?
                        </h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="block size-5 shrink-0 group-open:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="hidden size-5 shrink-0 group-open:block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        </summary>
                        <p class="mt-4 text-gray-700 text-base leading-relaxed">
                        makanya ati ati lah pak, macam mana pula kau. hehe ntar ganti
                        </p>
                    </details>
                    </div>
                </div>
            </section>

            ${generateFooterTemplate()}
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
  }
}
