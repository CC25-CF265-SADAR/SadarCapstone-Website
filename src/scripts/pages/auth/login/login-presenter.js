import { login } from '../../../data/api';

export default class LoginPresenter {
  constructor() {
    this.form = document.querySelector('form');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.rememberCheckbox = document.getElementById('remember');

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(event) {
    event.preventDefault();

    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value.trim();
    const remember = this.rememberCheckbox.checked;

    if (!email || !password) {
      alert('Email dan password wajib diisi!');
      return;
    }

    try {
      const token = await login({ email, password });

      // Kalau kamu mau ingat login lebih lama, bisa simpan token ke localStorage
      if (remember) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      // Redirect ke halaman beranda/dashboard tanpa menampilkan data sensitif di URL
      window.location.hash = '#/';
    } catch (error) {
      alert(error.message);
    }
  }
}
