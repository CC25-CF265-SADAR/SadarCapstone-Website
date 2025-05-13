import { generateFooterTemplate } from '../../template.js';
import HomePresenter from './homepage-presenter.js';

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
                        Penipuan digital sekarang makin licik! Mulai dari pesan spam hingga link jebakan.Tes seberapa waspada kamu lewat simulasi interaktif ini. Seru, cepat, dan bikin kamu lebih sadar!
                        </p>
        
                        <div class="mt-4 md:mt-8">
                        <a
                            href="#"
                            class="inline-block rounded-full bg-[#42A7C3] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#2C6F82] focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
                            >
                            Coba Sekarang ➔
                        </a>
                    </div>
                </div>
            </div>
            
            <img
            alt="image"
            src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            class="h-56 w-full object-cover sm:h-full"/>
            </section>
            </section>

            <section class="info-1">
                <p>Ini info 1</p>
                <p>Halo semuanya apa kabar</p>
            </section>

            <section class="info-2">
                //isi disini...
            </section>
            
            <section class="sadar-feature">
                //isi disini...
            </section>
            
            <section class="leaderboard">
                //isi disini...
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
    //isi disini..
  }
}
