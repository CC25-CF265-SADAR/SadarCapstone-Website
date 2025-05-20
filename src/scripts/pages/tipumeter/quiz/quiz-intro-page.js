import { generateQuizFooterTemplate } from '../../../template';
import { initSwiper } from '../../../utils/swiper.js';

export default class QuizIntroPage {
  async render() {
    return `
      <div class="relative max-w-screen-xl text-center lg:py-0 overflow-hidden">
        <!-- Gambar background -->
        <img src="background-tipumeter.svg"
            class="w-full object-cover h-full -translate-y-20 z-0"
            alt="background">

        <!-- Konten di atas gambar -->
        <div class="absolute z-10 px-4 top-0 left-0 w-full h-fit flex flex-col pt-15">
          <h1 class="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Seberapa Cermat Kamu Hadapi Penipuan Digital?
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Penipuan siber bisa datang kapan saja lewat pesan WhatsApp, email mencurigakan, hingga iklan palsu di media sosial. Kamu Termasuk yang Waspada atau Ceroboh? Cek disini!
          </p>
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a id="start-button" href="#/quiz/take-quiz" class="inline-flex items-center px-5 py-4 text-sm font-medium text-center text-white bg-[#2C6F82] rounded-lg hover:bg-[#215361] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Mulai Kuis
              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <section class="bg-white flex flex-col justify-center dark:bg-gray-900">
        <h2 class="text-2xl font-bold text-center mb-8">Temukan Karakter Digitalmu</h2>

        <div class="swiper mySwiper w-full">
          <div class="swiper-wrapper">
           <!-- Card 1 -->
            <div class="swiper-slide !w-fit">
              <div class="card w-65 h-80 bg-white shadow-md transition-all duration-300">
                <div class="card-body items-center text-center bg-[#FEA562] rounded-md p-4 flex flex-col justify-center">
                  <img src="images/character/aidetektor.png" alt="AI Detektor" class="w-24 h-auto mb-4" />
                  <h2 class="card-title text-xl">AI Detektor</h2>
                  <h3 class="text-md">Sang Master</h3>
                </div>
              </div>
            </div>


            <!-- Card 2 -->
            <div class="swiper-slide !w-fit">
              <div class="card w-65 h-80 bg-white shadow-md transition-all duration-300">
                <div class="card-body items-center text-center bg-[#DCD4D9] rounded-md p-4 flex flex-col justify-center">
                  <img src="images/character/kuncikombinasi.png" alt="Kunci Kombinasi" class="w-24 h-auto mb-4" />
                  <h2 class="card-title text-xl">Kunci Kombinasi</h2>
                  <h3 class="text-md">Sang Master</h3>
                </div>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="swiper-slide !w-fit">
              <div class="card w-65 h-80 bg-white shadow-md transition-all duration-300">
                <div class="card-body items-center text-center bg-[#A5EDFB] rounded-md p-4 flex flex-col justify-center">
                  <img src="images/character/lensamainan.png" alt="Lensa Mainan" class="w-24 h-auto mb-4" />
                  <h2 class="card-title text-xl">Lensa Mainan</h2>
                  <h3 class="text-md">Sang Master</h3>
                </div>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="swiper-slide !w-fit">
              <div class="card w-65 h-80 bg-white shadow-md transition-all duration-300">
                <div class="card-body items-center text-center bg-[#FEDD69] rounded-md p-4 flex flex-col justify-center">
                  <img src="images/character/scannerintel.png" alt="Scanner Intel" class="w-24 h-auto mb-4" />
                  <h2 class="card-title text-xl">Scanner Intel</h2>
                  <h3 class="text-md">Sang Master</h3>
                </div>
              </div>
            </div>

            <!-- Card 5 -->
            <div class="swiper-slide !w-fit">
              <div class="card w-65 h-80 bg-white shadow-md transition-all duration-300">
                <div class="card-body items-center text-center bg-[#FCECD4] rounded-md p-4 flex flex-col justify-center">
                  <img src="images/character/senterretak.png" alt="Senter Retak" class="w-24 h-auto mb-4" />
                  <h2 class="card-title text-xl">Senter Retak</h2>
                  <h3 class="text-md">Sang Master</h3>
                </div>
              </div>
            </div>

            <!-- Card 6 -->
            <div class="swiper-slide !w-fit">
              <div class="card w-65 h-80 bg-white shadow-md transition-all duration-300">
                <div class="card-body items-center text-center bg-[#FFAE99] rounded-md p-4 flex flex-col justify-center">
                  <img src="images/character/walkietalkie.png" alt="Walkie Talkie" class="w-24 h-auto mb-4" />
                  <h2 class="card-title text-xl">Walkie Talkie</h2>
                  <h3 class="text-md">Sang Master</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <article class="flex flex-col justify-center items-center my-9 gap-5">
          <p>Setiap keputusan mencerminkan gaya berpikirmu saat menghadapi risiko digital.</p>
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a id="start-button" href="#/quiz/take-quiz" class="inline-flex items-center px-5 py-4 text-sm font-medium text-center text-white bg-[#2C6F82] rounded-lg hover:bg-[#215361] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Mulai Kuis
            </a> 
          </div>
        </article>
      </section>

      <section class="info-kuis flex flex-row justify-around items-center px-30 my-10">
        <img src="cara-kerja.svg" alt="gambar cara kerja">
        <article class="flex flex-col gap-5">
          <h2 class="text-2xl font-bold">🎮 Bagaimana cara kerjanya?</h2>
          <ol class="list-decimal list-inside text-lg leading-8">
            <li>Ikuti skenario interaktif</li>
            <li>Pilih tindakan yang sesuai</li>
            <li>Dapatkan hasil berupa:
              <ul class="ml-4">
                <li>✅ Skor Kerentanan</li>
                <li>✅ Evaluasi Keputusan</li>
                <li>✅ Rekomendasi Perbaikan</li>
                <li>✅ Karakter unik berdasarkan gaya responsmu</li>
              </ul>
            </li>
          </ol>
          <div class="flex flex-col space-y-4 sm:flex-row sm:flex-start sm:space-y-0">
            <a id="start-button" href="#/quiz/take-quiz" class="inline-flex items-center px-5 py-4 text-sm font-medium text-center text-white bg-[#2C6F82] rounded-lg hover:bg-[#215361] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Mulai Kuis
            </a> 
          </div>
        </article>
      </section>
      <div id="quiz-footer">
        ${generateQuizFooterTemplate()}
      </div>
    `;
  }

  async afterRender() {
    initSwiper();
    document.getElementById('start-quiz-button')?.addEventListener('click', () => {
      e.preventDefault();
      window.location.href = '/#/quiz/take-quiz';
    });
  }
}
