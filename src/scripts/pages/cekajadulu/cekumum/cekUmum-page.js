import {
  generateFooterTemplate,
  generateTabCekAjaDuluTemplate,
  markCurrentTabActive,
} from '../../../templates/template';
import CekUmumPresenter from './cekUmum-presenter';
import Camera from '../../../utils/camera';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class CekUmumPage {
  async render() {
    return `
    <section class="mt-5 mx-12">
      <div id="tab-container"></div>
    </section>
    <section data-aos="zoom-in" data-aos-delay="300"class="flex flex-col justify-center items-center mb-12 px-4 sm:px-6 lg:px-8">
      <div class="cekLink flex flex-col gap-2 justify-center items-center p-8 mt-12 p-5 sm:p-10 rounded-xl border border-gray-200 shadow-sm w-full max-w-4xl">
        <h1 class="text-2xl sm:text-3xl font-semibold text-[#42A7C3] text-center">🖼️ Unggah Gambar untuk Cek Penipuan</h1>
        <h2 class="text-base sm:text-lg font-regular text-gray-600 mb-5 text-center w-full">Unggah tangkapan layar atau gambar yang berisi pesan, tautan hingga QR code mencurigakan dan dapatkan analisis keamanan secara cepat.</h2>
        
        <!-- Form Input (Akan disembunyikan saat hasil muncul) -->
        <form id="input-form" class="flex flex-col gap-3 items-center sm:items-end w-full">
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
              <svg class="w-5 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
              Buka Kamera
            </label>
            <input type="file" id="camera-input" accept="image/*" capture="environment" class="hidden">
          </div>
          <button type="submit" class="mt-8 text-white bg-[#42A7C3] hover:bg-[#378BA2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md sm:text-md px-5 sm:px-7 py-2.5 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Cek Sekarang
          </button>
        </form>
        
        <!-- Loading Indicator -->
        <div id="loading-indicator" class="hidden flex items-center gap-2 text-center mt-4 text-gray-600">
          <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Sedang memproses gambar...</span>
        </div>

        <!-- Result Container -->
        <div id="result-container" class="mt-6 w-full text-left hidden">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-800">Hasil Deteksi</h3>
            <button id="new-check-btn" class="text-white flex items-center gap-1 bg-[#42A7C3] border border-[#42A7C3] hover:bg-[#2C6F82] px-4 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              Cek yang lain
            </button>
          </div>
          
          <!-- Result content will be inserted here -->
          <div id="result-content"></div>
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
    const form = document.getElementById('input-form');
    const instruction = document.getElementsByClassName('instruction');
    const newCheckBtn = document.getElementById('new-check-btn');
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

    // Tombol "Cek yang lain"
    newCheckBtn?.addEventListener('click', () => {
      document.getElementById('result-container').classList.add('hidden');
      form.classList.remove('hidden');
      fileInput.value = '';
      document.getElementById('image-preview').classList.add('hidden');
      instruction[0].classList.remove('hidden');
      selectedImageFile = null;
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
        fileInput.closest('label').classList.add('hidden');
        cameraContainer.classList.remove('hidden');
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
        cameraInstance.stop();
        cameraContainer.classList.add('hidden');
        fileInput.closest('label').classList.remove('hidden');
        cameraButton.innerHTML = '📷 Buka Kamera';
        cameraMode = false;
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

      // Tampilkan loading, disable tombol, sembunyikan form
      loading.classList.remove('hidden');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Memproses...';
      form.classList.add('hidden');

      try {
        await presenter.handleSubmit(selectedImageFile);
      } catch (err) {
        console.error(err);
        this.showError('Terjadi kesalahan saat memproses gambar.');
      } finally {
        loading.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Cek Sekarang';
      }
    });
    AOS.init({
      duration: 800,
      once: true,
    });
  }

  renderResult({ prediction, probability, keywords, smsText, urls, phishingResults }) {
    const resultContainer = document.getElementById('result-container');
    const resultContent = document.getElementById('result-content');
    resultContainer.classList.remove('hidden');

    // Deteksi apakah ada hasil dari QR code
    const qrUrl = urls.find(
      (url) => smsText?.includes(url) && smsText?.toLowerCase().includes('qr code'),
    );

    resultContent.innerHTML = `
      <!-- Penjelasan Umum -->
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h4 class="text-sm font-medium text-blue-800">Apa yang kami analisis?</h4>
            <div class="mt-2 text-sm text-blue-700">
              <p>Kami telah menganalisis gambar Anda untuk mendeteksi:</p>
              <ul class="list-disc pl-5 mt-1 space-y-1">
                <li>Konten pesan mencurigakan</li>
                <li>Tautan phishing atau berbahaya</li>
                <li>Kode QR yang mencurigakan</li>
                <li>Kata kunci spam yang umum digunakan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      ${
        qrUrl
          ? `
          <div class="flex items-start gap-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md px-4 py-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
            </svg>
            <div>
              <p class="text-sm font-medium">Kode QR Terdeteksi!</p>
              <p class="text-sm">Gambar ini mengandung QR code yang mengarah ke: <span class="font-semibold underline break-all">${qrUrl}</span></p>
            </div>
          </div>
        `
          : ''
      }

      ${
        smsText?.replace(/\s+/g, '').length > 0
          ? `
          <div class="bg-white border border-gray-200 rounded-md p-5 w-full mb-6">
            <h4 class="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
              </svg>
              Pesan Terdeteksi
            </h4>
            <div class="bg-gray-50 p-3 rounded-md">
              <p class="text-gray-800 whitespace-pre-line">${smsText}</p>
            </div>
          </div>
        `
          : ''
      }

      ${
        urls.length > 0
          ? `
          <div class="bg-white border border-gray-200 rounded-md p-5 w-full mb-6">
            <h4 class="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
              </svg>
              Tautan Terdeteksi
            </h4>
            <div class="space-y-3">
              ${urls
                .map((url) => {
                  const result = phishingResults?.find((r) => r.url === url);
                  const isPhishing = result?.predicted_type?.toLowerCase() === 'phishing';
                  const label = result
                    ? `<span class="ml-3 inline-block px-2 py-0.5 text-xs font-medium rounded-md ${
                        isPhishing ? 'text-red-800 bg-red-100' : 'text-green-800 bg-green-100'
                      }">
                      ${result.predicted_type} – ${(result.probability * 100).toFixed(1)}%
                    </span>`
                    : '';
                  return `
                  <div class="flex justify-between items-center bg-[#F9FAFB] px-3 py-2 rounded-md border ${
                    isPhishing ? 'border-red-100' : 'border-gray-100'
                  }">
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline break-all">${url}</a>
                    ${label}
                  </div>
                `;
                })
                .join('')}
            </div>
          </div>
        `
          : ''
      }

      ${
        keywords.length > 0
          ? `
          <div class="bg-white border border-gray-200 rounded-md p-5 w-full">
            <h4 class="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              Analisis Spam
            </h4>
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full text-sm font-medium ${
                prediction.toLowerCase() === 'spam'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }">
                ${prediction} (${(probability * 100).toFixed(1)}%)
              </span>
              <span class="text-sm text-gray-500">Tingkat Keyakinan</span>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-700 mb-1">Kata kunci yang terdeteksi:</p>
              <div class="flex flex-wrap gap-2">
                ${keywords
                  .map(
                    (keyword) => `
                  <span class="px-2 py-1 ${
                    prediction.toLowerCase() === 'spam'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  } text-xs rounded-md">${keyword}</span>
                `,
                  )
                  .join('')}
              </div>
            </div>
          </div>
        `
          : ''
      }

      <div class="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-amber-800">Saran Keamanan</h3>
            <div class="mt-2 text-sm text-amber-700">
              <ul class="list-disc pl-5 space-y-1">
                <li>Jangan mengklik tautan mencurigakan</li>
                <li>Jangan membagikan informasi pribadi</li>
                <li>Verifikasi pengirim pesan</li>
                <li>Gunakan aplikasi resmi untuk transaksi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  showError(message) {
    const resultContainer = document.getElementById('result-container');
    const resultContent = document.getElementById('result-content');

    resultContent.innerHTML = `
      <div class="bg-red-50 border-l-4 border-red-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Terjadi Kesalahan</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>${message}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    resultContainer.classList.remove('hidden');
    document.getElementById('loading-indicator').classList.add('hidden');
    document.getElementById('input-form').querySelector('button[type="submit"]').disabled = false;
  }
}
