import { submitNewPassword } from '../../../data/api';
import { getQueryParams } from '../../../routes/url-parser';

export default class ResetPasswordPage {
  async render() {
    return `
      <section class="max-w-md mx-auto p-6">
        <h2 class="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form id="resetForm" class="space-y-4">
          <input type="password" id="newPassword" placeholder="Password Baru" required class="w-full p-2 border rounded" />
          <input type="password" id="confirmPassword" placeholder="Konfirmasi Password" required class="w-full p-2 border rounded" />
          <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Reset Password</button>
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
