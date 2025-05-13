export function generateNavbarTemplate() {
  return `
    <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a class="block text-teal-600" href="#">
          <span class="sr-only">Home</span>
          <svg class="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
              fill="currentColor"
            />
          </svg>
        </a>

        <div class="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">
              <li>
                <a class="text-gray-500 transition hover:text-gray-500/75" href="#"> Navbar 1 </a>
              </li>

              <li>
                <a class="text-gray-500 transition hover:text-gray-500/75" href="#"> Navbar 2 </a>
              </li>

              <li>
                <a class="text-gray-500 transition hover:text-gray-500/75" href="#"> Navbar 3 </a>
              </li>

              <li>
                <a class="text-gray-500 transition hover:text-gray-500/75" href="#"> Navbar 4 </a>
              </li>

              <li>
                <a class="text-gray-500 transition hover:text-gray-500/75" href="#"> Navbar 5 </a>
              </li>

              <li>
                <a class="text-gray-500 transition hover:text-gray-500/75" href="#"> Opsional </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <div class="sm:flex sm:gap-4">
              <a class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700" href="#"> Login </a>

              <a class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block" href="#"> Register </a>
            </div>

            <button class="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span class="sr-only">Toggle menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>`;
}

export function generateLeaderboardTemplate() {
  return `
        //isi disini... cacacaca
    `;
}

export function generateFooterTemplate() {
  return `
        <footer class="bg-softblue font-jakarta text-[#2B2D42] px-8 py-12">
          <div class="max-w-7xl mx-auto space-y-12">
            <!-- Bagian Newsletter -->
            <div class="bg-white rounded-2xl p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 class="text-2xl md:text-3xl font-semibold text-[#0081A7] mb-2">Daftar untuk Pemberitauan Kami!</h2>
                <p class="text-sm md:text-base text-gray-600 max-w-xl">Dapatkan informasi terkini mengenai wawasan penipuan digital, layanan, dan penawaran eksklusif dengan berlangganan buletin kami.</p>
              </div>
              <form class="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                <input type="email" placeholder="Masukkan Email Anda" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none">
                <button type="submit" class="bg-[#00B4D8] text-white px-6 py-2 rounded-lg hover:bg-[#0096c7] transition">Langganan Sekarang</button>
              </form>
            </div>

            <!-- Bagian Footer -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
              <div>
                <h3 class="font-semibold text-base mb-2">LOGO SADAR</h3>
                <p>Saring, Amankan, Deteksi,<br />Anti-Rugi</p>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Perusahaan</h4>
                <ul class="space-y-1">
                  <li><a href="#">Beranda</a></li>
                  <li><a href="#">CekAjaDulu</a></li>
                  <li><a href="#">AntiTertipu</a></li>
                  <li><a href="#">TipuMeter</a></li>
                  <li><a href="#">Tentang</a></li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Info Kontak</h4>
                <p>Silk St, Barbican, London<br />EC2Y 8DS, UK</p>
                <a href="mailto:info@sadar.com" class="text-[#0081A7] hover:underline block mt-1">info@sadar.com</a>
                <p>800–123–45–678</p>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Ikuti Kami</h4>
                <ul class="space-y-1">
                  <li>Instagram</li>
                  <li>Facebook</li>
                  <li>LinkedIn</li>
                  <li>Twitter</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Anggota Tim</h4>
                <ul class="space-y-1">
                  <li>Dwi Cahya Nurani</li>
                  <li>Kurniawan Chandra Wijaya</li>
                  <li>DzulFahmi Dzakia Ahmad</li>
                  <li>Alya Maisa Hudanis</li>
                  <li>Puti Narita Adzra</li>
                  <li>Jessica Bunga Yuniartha</li>
                </ul>
              </div>
            </div>

            <div class="text-center text-sm text-gray-500 border-t border-gray-300 pt-6">
              Copyright © 2025 Sadar, All rights reserved.
            </div>
          </div>
        </footer>
    `;
}

export function generateScamTypeTemplate() {
  return `
        //isi disini...
    `;
}

export function generateModuleTemplate() {
  return `
        //isi disini...
    `;
}

export function generateModuleDetailTemplate() {
  return `
        //isi disini...
    `;
}

export function generateModuleSylabusTemplate() {
  return `
        //isi disini...
    `;
}

export function generateQuizNavTemplate() {
  return `
        //isi disini...
    `;
}

export function generateQuizFooterTemplate() {
  return `
        //isi disini...
    `;
}

export function generateModuleFooterTemplate() {
  return `
        //isi disini...
    `;
}

export function generateProgressQuizTemplate() {
  return `
        //isi disini...
    `;
}

export function generateQuizQuestionTemplate() {
  return `
        //isi disini...
    `;
}

export function generateQuizResolveTemplate() {
  return `
        //isi disini...
    `;
}

export function generateModuleRecommTemplate() {
  return `
        //isi disini...
    `;
}
