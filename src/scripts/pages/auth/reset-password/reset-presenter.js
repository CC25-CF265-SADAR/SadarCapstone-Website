import { submitNewPassword } from '../../../data/api';

export default class ResetPasswordPresenter {
  constructor() {
    const form = document.getElementById('resetForm');
    const messageBox = document.getElementById('resetMessage');

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      messageBox.textContent = 'Token tidak ditemukan.';
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

        if (data.message.includes('berhasil')) {
          setTimeout(() => (window.location.hash = '#/login'), 2000);
        }
      } catch (err) {
        messageBox.textContent = 'Gagal reset password.';
      }
    });
  }
}
