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
      await login({ email, password, remember });

      // Redirect ke homepage dan refresh supaya navbar berubah
      window.location.hash = '#/';
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }
}
