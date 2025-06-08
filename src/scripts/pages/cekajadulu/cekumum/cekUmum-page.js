import {
  generateFooterTemplate,
  generateTabCekAjaDuluTemplate,
  markCurrentTabActive,
} from '../../../templates/template';
import CekUmumPresenter from './cekUmum-presenter';
import Camera from '../../../utils/camera';

export default class CekUmumPage {
  async render() {
    return `
    <section class="mt-5 mx-12">
      <div id="tab-container"></div>
    </section>
    <section class="flex flex-col justify-center items-center mb-12 px-4 sm:px-6 lg:px-8">
      <div class="cekLink flex flex-col gap-2 justify-center items-center p-8 mt-12 p-5 sm:p-10 rounded-xl border border-gray-200 shadow-sm w-full max-w-4xl">
        <h1 class="text-2xl sm:text-3xl font-semibold text-[#42A7C3] text-center">🖼️ Unggah Gambar untuk Cek Penipuan</h1>
        <h2 class="text-base sm:text-lg font-regular text-gray-600 mb-5 text-center w-full">Unggah tangkapan layar atau gambar yang berisi pesan, tautan hingga QR code mencurigakan dan dapatkan analisis keamanan secara cepat.</h2>
        <form class="flex flex-col gap-3 items-center sm:items-end w-full">
          <div id="drop" class="flex items-center justify-center w-full">
              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full pb-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div class="instruction flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                  <img id="image-preview" class="mt-4 max-h-64 object-contain hidden" />
              </label>
          </div> 

          <div id="camera-container" class="hidden w-full flex flex-col items-center">
            <select id="camera-select" class="mb-2 p-2 border rounded text-sm"></select>
            <video id="camera-video" class="rounded border max-h-64" autoplay playsinline></video>
            <canvas id="camera-canvas" class="hidden"></canvas>
          </div>

          <div class="text-center w-full">
            <h1 id="ambil" class="text-gray-600 mb-3">Atau ambil gambar</h1>
            <label for="camera-input" class="text-[#42A7C3] flex flex-row items-center justify-center gap-2 bg-white border border-[#42A7C3] hover:bg-[#DFF0F5] hover:text-[#2C6F82] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md sm:text-md px-5 sm:px-7 py-2.5 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="w-5 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
              Buka Kamera
            </label>
            <input type="file" id="camera-input" accept="image/*" capture="environment" class="hidden">
          </div>
          <button type="submit" class="mt-8 text-white bg-[#42A7C3] hover:bg-[#378BA2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md sm:text-md px-5 sm:px-7 py-2.5 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Cek Sekarang
          </button>
        </form>
        <div id="loading-indicator" class="hidden flex items-center gap-2 text-center mt-4 text-gray-600">
          <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Sedang memproses gambar...</span>
        </div>

        <div id="result-container" class="mt-6 w-full text-left hidden">
          <img id="image-preview" class="mt-4 max-h-64 object-contain hidden" />
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Hasil Deteksi:</h3>
          <p id="sms-text" class="text-gray-800"></p>
          <ul id="url-list" class="list-disc ml-5 text-blue-600 mt-2"></ul>
          <p id="prediction" class="mt-4 font-medium"></p>
        </div>
      </div>
    </section>
    ${generateFooterTemplate()}
    `;
  }

  async afterRender() {
    document.getElementById('tab-container').innerHTML = generateTabCekAjaDuluTemplate();
    markCurrentTabActive();

    const fileInput = document.getElementById('dropzone-file');
    const form = document.querySelector('form');
    const instruction = document.getElementsByClassName('instruction');
    let selectedImageFile = null;
    let cameraMode = false;
    let cameraInstance = null;

    const cameraButton = document.querySelector('label[for="camera-input"]');
    const subtitle = document.getElementById('ambil');
    const cameraContainer = document.getElementById('camera-container');
    const cameraVideo = document.getElementById('camera-video');
    const cameraSelect = document.getElementById('camera-select');
    const cameraCanvas = document.getElementById('camera-canvas');

    const presenter = new CekUmumPresenter({
      onResult: this.renderResult.bind(this),
      onError: this.showError.bind(this),
    });

    // Simpan file saat user memilih
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Hanya file PNG, JPG, atau JPEG yang diperbolehkan.');
        fileInput.value = ''; // reset input
        return;
      }

      selectedImageFile = file;

      // Tampilkan preview
      const previewImg = document.getElementById('image-preview');
      previewImg.src = URL.createObjectURL(file);
      previewImg.classList.remove('hidden');
      instruction[0].classList.add('hidden');
    });

    cameraButton.addEventListener('click', async (e) => {
      e.preventDefault();

      if (!cameraMode) {
        // Aktifkan mode kamera
        fileInput.closest('label').classList.add('hidden'); // Sembunyikan dropzone
        cameraContainer.classList.remove('hidden'); // Tampilkan kamera
        cameraButton.innerHTML = '📸 Ambil Gambar';
        subtitle.classList.add('hidden');

        if (!cameraInstance) {
          cameraInstance = new Camera({
            video: cameraVideo,
            cameraSelect,
            canvas: cameraCanvas,
          });
        }

        await cameraInstance.launch();
        cameraMode = true;
      } else {
        // Ambil gambar
        const blob = await cameraInstance.takePicture();
        selectedImageFile = new File([blob], 'captured.png', { type: 'image/png' });

        const previewImg = document.getElementById('image-preview');
        previewImg.src = URL.createObjectURL(selectedImageFile);
        previewImg.classList.remove('hidden');
        subtitle.classList.remove('hidden');
        // Kembalikan ke mode awal
        cameraInstance.stop();
        cameraContainer.classList.add('hidden');
        fileInput.closest('label').classList.remove('hidden');
        cameraButton.innerHTML = '📷 Buka Kamera';
        cameraMode = false;

        // Sembunyikan instruction
        instruction[0].classList.add('hidden');
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!selectedImageFile) {
        alert('Silakan unggah gambar terlebih dahulu.');
        return;
      }
      const loading = document.getElementById('loading-indicator');
      const resultContainer = document.getElementById('result-container');
      const submitBtn = form.querySelector('button[type="submit"]');

      // Tampilkan loading, disable tombol, sembunyikan hasil
      loading.classList.remove('hidden');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Memproses...';
      resultContainer.classList.add('hidden');
      try {
        await presenter.handleSubmit(selectedImageFile); // <--- pastikan ini
      } catch (err) {
        console.error(err);
        alert('Terjadi kesalahan saat memproses gambar.');
      } finally {
        loading.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Cek Sekarang';
      }
    });
  }

  renderResult({ prediction, probability, keywords, smsText, urls, phishingResults }) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.classList.remove('hidden');

    // Deteksi apakah ada hasil dari QR code
    const qrUrl = urls.find(url => smsText?.includes(url) && smsText?.toLowerCase().includes('qr code'));

    resultContainer.innerHTML = `
      ${qrUrl
        ? `
          <div class="flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md px-4 py-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
            </svg>
            <p class="text-sm font-medium">Gambar ini mengandung QR code yang mengarah ke: <span class="font-semibold underline">${qrUrl}</span></p>
          </div>
        ` : ''
      }

      ${smsText?.replace(/\s+/g, '').length > 0
        ? `
          <p class="font-semibold text-[#374151] mb-2 text-lg">📩 Pesan Terdeteksi:</p>
          <p class="text-gray-800 mb-6 whitespace-pre-line">${smsText}</p>
        `
        : ''
      }

      <div class="bg-white border border-gray-200 rounded-md p-5 w-full mb-4">
        <h4 class="text-md font-semibold text-gray-800 mb-3">🔗 Deteksi Link</h4>
        <div class="space-y-3">
          ${urls.map((url) => {
            const result = phishingResults?.find(r => r.url === url);
            const label = result
              ? `<span class="ml-3 inline-block px-2 py-0.5 text-xs font-medium text-red-800 bg-red-100 rounded-md">
                  ${result.predicted_type} – ${(result.probability * 100).toFixed(1)}%
                </span>`
              : '';
            return `
              <div class="flex justify-between items-center bg-[#F9FAFB] px-3 py-2 rounded-md border border-gray-100">
                <a href="${url}" target="_blank" class="text-blue-700 underline break-all">${url}</a>
                ${label}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-md p-5 w-full">
        <h4 class="text-md font-semibold text-gray-800 mb-3">📃 Deteksi Spam</h4>
        <p class="font-bold text-gray-800 mb-1">${prediction} (${(probability * 100).toFixed(1)}%)</p>
        <p class="text-sm text-gray-700">🔍 Kata kunci: ${keywords.join(', ')}</p>
      </div>
    `;
  }

  showError(message) {
    alert(`Terjadi kesalahan: ${message}`);
  }
}
