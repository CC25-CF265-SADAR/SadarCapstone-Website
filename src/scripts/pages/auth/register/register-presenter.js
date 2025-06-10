import { register } from '../../../data/api';
import Swal from 'sweetalert2';
export default class RegisterPresenter {
  constructor() {
    this.form = document.querySelector('form');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.confirmPasswordInput = document.getElementById('confirm_password');

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value.trim();
    try {
      await register({ email, password });
      let timerInterval;
      Swal.fire({
        title: 'Registrasi berhasil!',
        html: 'Silahkan masuk menggunakan akun terdaftar',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {}, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.hash = '#/login';
        }
      });
    } catch (error) {
      const errorMessage = error.message || '';

      if (errorMessage.toLowerCase().includes('email')) {
        Swal.fire({
          icon: 'error',
          title: 'Registrasi gagal',
          text: 'Email sudah terdaftar. Silakan gunakan email lain.',
          confirmButtonColor: '#d33',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Terjadi kesalahan',
          text: errorMessage || 'Gagal melakukan registrasi.',
          confirmButtonColor: '#d33',
        });
      }
    }
  }
}
