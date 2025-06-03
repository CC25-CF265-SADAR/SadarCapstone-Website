import {
  generateFooterTemplate,
  generateScamTypeTemplate,
  generateTabCekAjaDuluTemplate,
  markCurrentTabActive,
} from '../../../templates/template';

export default class CekLinkPage {
  async render() {
    return `
      <section class="mt-5 mx-12">
        <div id="tab-container"></div>
      </section>
      <section class="flex flex-col justify-center items-center px-4 mb-12 sm:px-6 lg:px-8">
            <div class="cekLink flex flex-col gap-2 justify-center items-center mt-12 p-10 rounded-xl border border-gray-200 shadow-sm">
              <h1 class="text-2xl sm:text-3xl font-semibold text-[#42A7C3]">Cek Link Mencurigakan</h1>
              <h2 class="text-base sm:text-lg font-regular text-gray-600 mb-5 text-center w-full">Masukkan tautan yang ingin diperiksa. Kami  akan membantu anda  untuk mengetahui keamanan tautan tersebut.</h2>
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
            </div>
        </section>
        ${generateScamTypeTemplate({
          title: 'Jenis Pesan Spam',
          subtitle1: 'Pesan Hadiah Palsu',
          content1:
            'Mengklaim kamu menang hadiah dari brand besar, padahal kamu tidak pernah ikut undian. Biasanya minta data pribadi atau transfer “biaya admin”.',
          subtitle2: 'Pesan Hadiah Palsu',
          content2:
            'Mengklaim kamu menang hadiah dari brand besar, padahal kamu tidak pernah ikut undian. Biasanya minta data pribadi atau transfer “biaya admin”.',
          subtitle3: 'Pesan Hadiah Palsu',
          content3:
            'Mengklaim kamu menang hadiah dari brand besar, padahal kamu tidak pernah ikut undian. Biasanya minta data pribadi atau transfer “biaya admin”.',
          subtitle4: 'Pesan Hadiah Palsu',
          content4:
            'Mengklaim kamu menang hadiah dari brand besar, padahal kamu tidak pernah ikut undian. Biasanya minta data pribadi atau transfer “biaya admin”.',
        })}
        ${generateFooterTemplate()}
    `;
  }

  async afterRender() {
    document.getElementById('tab-container').innerHTML = generateTabCekAjaDuluTemplate();
    markCurrentTabActive();
  }
}
