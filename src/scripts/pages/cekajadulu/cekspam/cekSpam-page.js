import {
  generateFooterTemplate,
  generateScamTypeTemplate,
  generateTabCekAjaDuluTemplate,
  markCurrentTabActive,
} from '../../../templates/template';
import CekSpamPresenter from './cekSpam-presenter';

export default class CekSpamPage {
  async render() {
    return `
    <section class="mt-5 mx-12">
      <div id="tab-container"></div>
    </section>
    <section class="flex flex-col justify-center items-center px-4 mb-12 sm:px-6 lg:px-8">
      <div class="cekLink flex flex-col gap-2 justify-center items-center mt-12 p-5 sm:p-10 rounded-xl border border-gray-200 shadow-sm w-full max-w-4xl">
        <h1 class="text-2xl sm:text-3xl font-semibold text-[#42A7C3] text-center">Cek Pesan Spam</h1>
        <h2 class="text-base sm:text-lg font-regular text-gray-600 mb-5 text-center w-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
        <form id="spam-form" class="flex flex-col gap-3 items-end w-full">
          <label for="search" class="sr-only">Search</label>
          <textarea id="search" class="border border-[#42A7C3] rounded-lg w-full p-4 sm:p-5 field-sizing-fixed resize-none" rows="8" placeholder="Masukkan pesan disini..." required></textarea>
          <button type="submit" class="text-white bg-[#42A7C3] hover:bg-[#378BA2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md sm:text-md px-5 sm:px-7 py-2.5 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Cek Pesan
          </button>
        </form>
        <div id="spam-result" class="mt-4 w-full text-center text-md text-gray-700"></div>
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

    const form = document.getElementById('spam-form');
    const input = document.getElementById('search');
    const resultDiv = document.getElementById('spam-result');

    const presenter = new CekSpamPresenter({
      onResult: (result) => {
        const { prediction, probability, keywords } = result;
        const isSpam = prediction.toLowerCase() === 'spam';

        resultDiv.innerHTML = `
          <div class="mt-4 p-4 rounded-lg border ${
            isSpam
              ? 'border-red-300 bg-red-50 text-red-700'
              : 'border-green-300 bg-green-50 text-green-700'
          }">
            <p class="text-lg font-semibold">Hasil Deteksi: ${prediction}</p>
            <p class="text-sm mt-1">Probabilitas: ${probability}%</p>
            <p class="text-sm mt-1">Kata Kunci: <span class="font-mono">${keywords.join(', ')}</span></p>
          </div>
        `;
      },
      onError: (message) => {
        resultDiv.innerHTML = `<span class="text-red-500">${message}</span>`;
      },
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      resultDiv.innerHTML = '<span class="text-gray-400">Memproses...</span>';
      presenter.handleTextSubmit(input.value);
    });
  }
}
