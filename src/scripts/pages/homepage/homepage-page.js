import { generateFooterTemplate } from '../../template.js';
import HomePresenter from './homepage-presenter.js';

export default class Homepage {
  async render() {
    return `
            <section class="hero-image">
                <section class="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
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
                            Get Started Today
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
