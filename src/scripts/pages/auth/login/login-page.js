import LoginPresenter from './login-presenter';
import { googleLogin } from '../../../data/api';
import CONFIG from '../../../config';
import Swal from 'sweetalert2';
export default class LoginPage {
  #presenter = null;

  async render() {
    return `
      <section class="login-container bg-[#378BA2] w-full min-h-screen flex flex-col justify-start items-center p-8 gap-8 md:pt-12">
        <img src="images/logo-sadar.svg" class="w-[180px] h-auto" alt="Logo"">
        <div class="w-full max-w-lg p-8 bg-white border border-gray-200 rounded-xl shadow-sm sm:p-6 md:p-9 dark:bg-gray-800 dark:border-gray-700">
            <h1 class="text-xl md:text-3xl font-bold text-[#378BA2] text-center">Masuk Akun</h1>
            <h2 class="text-md md:text-lg font-regular text-gray-500 text-center mt-2">Amankan dirimu, mulai dari sini</h2>
            <form class="space-y-6 mt-7" action="#">
                <div>
                    <label for="email" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#378BA2] focus:border-[#378BA2] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div class="flex items-start">
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ingat saya</label>
                    </div>
                    <a href="#/forgot-password" class="ms-auto text-sm text-[#378BA2] hover:underline dark:text-blue-500">Lupa password?</a>
                </div>
                <button type="submit" class="w-full text-white cursor-pointer bg-[#378BA2] hover:bg-[#2C6F82] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Masuk Sekarang</button>
                <div class="text-sm font-regular text-gray-500 dark:text-gray-300">
                    Belum punya akun? <a href="#/register" class="text-[#378BA2] hover:font-medium hover:underline dark:text-blue-500">Buat akun</a>
                </div>

                <div class="flex items-center justify-center gap-4 mt-4">
                  <span class="text-gray-500 text-sm">Atau masuk dengan</span>
                </div>
                <button id="google-login" type="button" class="w-full text-md md:text-md flex items-center justify-center mt-3">
                </button>
            </form>
          </div>
      </section>
    `;
  }

  afterRender() {
    this.#presenter = new LoginPresenter();

    setTimeout(() => {
      window.google.accounts.id.initialize({
        client_id: CONFIG.GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            const token = await googleLogin(response.credential, true);
            localStorage.setItem('token', token);
            window.location.hash = '#/';

            setTimeout(() => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });

              Toast.fire({
                icon: 'success',
                title: 'Berhasil masuk',
              });
            }, 300);
          } catch (err) {
            Swal.fire({
              icon: 'error',
              title: 'Ups! Login gagal',
              text: err.message,
              confirmButtonText: 'Coba lagi',
              customClass: {
                confirmButton:
                  'bg-[#378BA2] hover:bg-[#2C6F82] cursor-pointer text-white font-medium px-5 py-3 rounded-lg',
              },
              buttonsStyling: false,
            });
          }
        },
        auto_select: false,
      });

      window.google.accounts.id.renderButton(document.getElementById('google-login'), {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        shape: 'rectangular',
        logo_alignment: 'center',
        width: '100%',
        height: 1000,
        text: 'signin_with',
      });
    }, 300);
  }
}
