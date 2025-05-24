import { register } from '../../../data/api';

export default class RegisterPresenter {
  constructor() {
    this.form = document.querySelector('form');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.confirmPasswordInput = document.getElementById('confirm_password');

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(event) {
    event.preventDefault(); // cegah form submit default (reload)

    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value.trim();
    const confirmPassword = this.confirmPasswordInput.value.trim();

    if (!email || !password || !confirmPassword) {
      alert('Semua field wajib diisi!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok!');
      return;
    }

    try {
      await register({ email, password });
      alert('Registrasi berhasil! Silakan login.');

      window.location.hash = '#/login';
    } catch (error) {
      alert(error.message);
    }
  }
}
