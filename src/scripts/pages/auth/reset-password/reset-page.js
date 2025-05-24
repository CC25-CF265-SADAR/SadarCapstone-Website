import { submitNewPassword } from '../../../data/api';
import { getQueryParams } from '../../../routes/url-parser';

export default class ResetPasswordPage {
  async render() {
    return `
      <section class="max-w-md mx-auto p-6 mt-20">
        <h1 class="text-lg md:text-2xl font-bold text-[#378BA2] text-center">Atur Ulang Password Baru</h1>
        <h2 class="text-sm md:text-base font-regular text-gray-500 text-center mt-2">Password baru akan menggantikan password lama, pastikan kamu mengingatnya</h2>
        <form id="resetForm" class="space-y-4 mt-8">
          <label for="newPassword" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password baru</label>
          <input type="password" id="newPassword" placeholder="Password Baru" required class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#378BA2] focus:border-[#378BA2] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
          <label for="confirmPassword" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Konfirmasi password</label>
          <input type="password" id="confirmPassword" placeholder="Konfirmasi Password" required class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#378BA2] focus:border-[#378BA2] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
          <button type="submit" class="w-full text-white bg-[#378BA2] hover:bg-[#2C6F82] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Perbarui Password</button>
        </form>
        <div id="resetMessage" class="text-sm mt-4 text-center text-gray-700"></div>
      </section>
    `;
  }

  afterRender() {
    const form = document.getElementById('resetForm');
    const messageBox = document.getElementById('resetMessage');
    const token = getQueryParams().get('token');

    if (!token) {
      messageBox.textContent = 'Token tidak ditemukan di URL.';
      form.style.display = 'none';
      return;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (newPassword !== confirmPassword) {
        messageBox.textContent = 'Password tidak cocok.';
        return;
      }

      try {
        const data = await submitNewPassword(token, newPassword);
        messageBox.textContent = data.message;

        if (data.message.toLowerCase().includes('berhasil')) {
          setTimeout(() => {
            window.location.hash = '#/login';
          }, 2000);
        }
      } catch (error) {
        messageBox.textContent = 'Terjadi kesalahan saat reset password.';
      }
    });
  }
}
