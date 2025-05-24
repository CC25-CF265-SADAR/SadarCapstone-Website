import { requestResetPassword } from '../../../data/api';

export default class ForgotPasswordPresenter {
  constructor() {
    const form = document.getElementById('forgotForm');
    const messageBox = document.getElementById('forgotMessage');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;

      try {
        const data = await requestResetPassword(email);
        messageBox.textContent = data.message;
      } catch (err) {
        messageBox.textContent = 'Terjadi kesalahan saat mengirim permintaan.';
      }
    });
  }
}
