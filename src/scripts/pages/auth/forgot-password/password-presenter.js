import { requestResetPassword } from '../../../data/api';

export default class ForgotPasswordPresenter {
  constructor(onSuccess, onError) {
    const form = document.getElementById('forgotForm');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;

      try {
        const data = await requestResetPassword(email);
        onSuccess(data.message);
      } catch (err) {
        onError('Terjadi kesalahan saat mengirim permintaan.');
      }
    });
  }
}
