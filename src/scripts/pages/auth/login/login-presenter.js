import { login } from '../../../data/api';
import Swal from 'sweetalert2';

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
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ups! Login gagal',
        text: 'Email atau password yang kamu masukkan tidak cocok. Silakan periksa kembali dan coba lagi',
        confirmButtonText: 'Coba lagi',
        customClass: {
          confirmButton:
            'bg-[#378BA2] hover:bg-[#2C6F82] cursor-pointer text-white font-medium px-5 py-3 rounded-lg',
        },
        buttonsStyling: false,
      });
    }
  }
}
