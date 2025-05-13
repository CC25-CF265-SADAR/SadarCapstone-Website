import { generateFooterTemplate } from '../../template.js';
import HomePresenter from './homepage-presenter.js';

export default class Homepage {
  async render() {
    return `
            <section class="hero-image">
                //isi disini...
            </section>

            <section class="info-1 font-jakarta px-6 py-8 max-w-screen-xl mx-auto">
                <h1 class="font-bold text-4xl text-center mb-10">
                <span class="text-[#42A7C3]">Pertumbuhan Penetrasi Internet</span> di Indonesia
                </h1>

                <article class="article-info-1 flex flex-row gap-10 items-center justify-between">
                    <section class="article-info-1-section-1 flex flex-col gap-4 max-w-xl justify-center">
                        <h2 class="text-3xl font-semibold">Tahukah Kamu?</h2>
                        <p class="text-2xl font-normal">
                        Selama tujuh tahun terakhir, jumlah penduduk terkoneksi internet tahun 2024 mencapai
                        <span class="font-bold inline-block text-white bg-[#378BA2] px-1">221.563.479</span>
                        Jiwa dari total populasi 278.696.200 jiwa penduduk Indonesia.
                        </p>
                        <p class="text-lg font-normal">Sumber: Asosiasi Penyelenggara Jasa Internet Indonesia (APJII) 2024</p>
                    </section>

                    <aside class="article-info-1-aside-1 max-w-md">
                        <img
                        src="images/grafik-data-penetrasi.svg"
                        alt="Grafik penetrasi di Indonesia"
                        class="w-full h-auto object-contain"
                        />
                    </aside>
                </article>
            </section>

            <section class="info-2 flex flex-row justify-center items-center gap-12 max-w-screen-xl w-full mx-auto px-4 py-8 overflow-hidden">
                <article class="article-info-2 flex flex-col gap-6 w-3/5">
                    <h1 class="font-bold text-4xl leading-snug">
                    <span class="text-[#42A7C3]">Korban</span> Penipuan Online
                    </h1>
                    <p class="text-lg">
                    <span class="font-bold">Rendahnya tingkat literasi digital</span> masyarakat Indonesia menyebabkan masih banyak kelompok umur yang rentan menjadi korban penipuan online.
                    </p>
                    <p class="text-lg">
                    Meskipun tingkat penetrasi/pengguna internet semakin tinggi, sebagian besar masyarakat belum memiliki kebiasaan atau kemampuan memadai dalam memverifikasi informasi, menjaga keamanan data pribadi, atau mengenali bentuk-bentuk penipuan digital yang makin canggih.
                    </p>
                </article>

                <aside class="w-[550px] h-[415px] flex-shrink-0 overflow-hidden">
                    <img
                    src="images/korban-penipuan-online.png"
                    alt="Korban penipuan online di Indonesia"
                    class="w-full h-full object-cover"
                    />
                </aside>
            </section>
       
            <section class="sadar-feature relative flex flex-col gap-8 min-h-[600px]">
                <img 
                src="images/background-sadar.png"
                alt="Background sadar"
                class="absolute inset-0 -z-10"
                />
                <article class="text-white text-wrap flex flex-col gap-4 z-10 mt-10">
                    <h1 class="text-3xl font-bold text-center">SADAR Mulai Dari Sekarang!</h1>
                    <p class="text-lg text-center max-w-[600px] mx-auto">Gunakan layanan kami untuk meningkatkan pengalaman Anda dalam menjaga informasi dan data dari penipuan online</p>
                </article>
                
                <section class="sadar-feature-detail z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-18 grid grid-flow-col grid-rows-4 gap-4">
                    <div class="lg:row-span-4 max-w-lg p-15 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col space-y-7 justify-center">
                        <img src="images/ikon-cekajadulu.svg" class="w-[76px] h-[76px]max-w-full">
                        <a href="#">
                        <h2 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">CekAjaDulu</h2>
                        </a>
                        <p class="mb-5 font-normal text-gray-500 dark:text-gray-400">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam nec tortor massa. Praesent cursus porttitor egestas.</p>
                        <div class="flex flex-row space-x-5">
                        <a href="#" class="inline-flex font-medium items-center text-[#42A7C3] hover:underline">
                        Lihat Fitur
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        </a>
                        <a href="#" class="inline-flex font-medium items-center text-[#42A7C3] hover:underline">
                        Lihat Fitur
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        </a>
                        </div>
                    </div>

                    <div class="lg:col-span-2 row-span-2 max-w-lg p-12 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-row space-x-6 items-start">
                        <img src="images/ikon-tipumeter.svg" class="w-[76px] h-[76px]max-w-full">
                        <div>
                            <a href="#">
                            <h2 class="mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">TipuMeter</h2>
                            </a>
                            <p class="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam nec tortor massa. Praesent cursus porttitor egestas.</p>
                    
                            <a href="#" class="inline-flex font-medium items-center text-[#42A7C3] hover:underline">
                            Lihat Fitur
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                            </a>
                        </div>
                    </div>

                    <div class="lg:col-span-2 row-span-2 max-w-lg p-12 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-row space-x-6 items-start">
                        <img src="images/ikon-antitertipu.svg" class="w-[76px] h-[76px]max-w-full">
                        <div>
                            <a href="#">
                            <h2 class="mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">AntiTertipu</h2>
                            </a>
                            <p class="mb-5 font-normal text-gray-500 dark:text-gray-400">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam nec tortor massa. Praesent cursus porttitor egestas.</p>
                    
                            <a href="#" class="inline-flex font-medium items-center text-[#42A7C3] hover:underline">
                            Lihat Fitur
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                            </a>
                        </div>
                    </div>
                
                </section>
            </section>
            
            <section class="leaderboard">
                //isi disini...
            </section>
            
            <section class="faq">
                //isi disini...
            </section>

            ${generateFooterTemplate()}
        `;
  }

  async afterRender() {
    //isi disini..
  }
}
