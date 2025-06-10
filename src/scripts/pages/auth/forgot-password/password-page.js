import Swal from 'sweetalert2';
import ForgotPasswordPresenter from './password-presenter';

export default class ForgotPasswordPage {
  async render() {
    return `
      <section class="max-w-md md:max-w-lg mt-10 mx-auto mt-20 p-6">
        <h1 class="text-lg md:text-2xl font-bold text-[#378BA2] text-center">Lupa Password?</h1>
        <h2 class="text-sm md:text-base font-regular text-gray-500 text-center mt-2">Masukkan alamat email yang terdaftar dan kami akan mengirimkan tautan untuk mengatur ulang password kamu </h2>
        <form id="forgotForm" class="space-y-4 mt-8">
          <label for="email" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" id="email" placeholder="Masukkan email" required class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#378BA2] focus:border-[#378BA2] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
          <button type="submit" class="w-full text-white bg-[#378BA2] hover:bg-[#2C6F82] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset Password</button>
        </form>
        <a href="#/login" class="flex items-center justify-center gap-2 mt-8 font-medium items-center text-gray-400 hover:underline">
            <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
            </svg>
        Kembali ke halaman login
    </a>
        <div id="forgotMessage" class="text-sm mt-4 text-center text-gray-700"></div>
      </section>
    `;
  }

  afterRender() {
    new ForgotPasswordPresenter(
      (message) => {
        if (message.toLowerCase().includes('pastikan email Anda telah terdaftar')) {
          // Swal jika email tidak ditemukan
          Swal.fire({
            icon: 'warning',
            title: 'Email tidak ditemukan',
            text: message,
            confirmButtonText: 'Coba Lagi',
            customClass: {
              confirmButton: 'bg-[#378BA2] hover:bg-[#2C6F82] text-white px-4 py-2 rounded-lg',
            },
            buttonsStyling: false,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Silahkan cek inbox Anda',
            text: message,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'bg-[#378BA2] hover:bg-[#2C6F82] text-white px-4 py-2 rounded-lg',
            },
            buttonsStyling: false,
          });
        }
      },

      (errorMessage) => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: errorMessage,
          confirmButtonText: 'Coba lagi',
          customClass: {
            confirmButton: 'bg-[#378BA2] hover:bg-[#2C6F82] text-white px-4 py-2 rounded-lg',
          },
          buttonsStyling: false,
        });
      },
    );
  }
}
