import { submitNewPassword } from '../../../data/api';
import { getQueryParams } from '../../../routes/url-parser';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';
export default class ResetPasswordPage {
  async render() {
    return `
      <section data-aos="zoom-in" data-aos-delay="100" class="max-w-md mx-auto">
        <h1 class="mt-20 text-lg md:text-2xl font-bold text-[#378BA2] text-center">Atur Ulang Password Baru</h1>
        <h2 class="text-sm md:text-base font-regular text-gray-500 text-center mt-2">Password baru akan menggantikan password lama, pastikan kamu mengingatnya</h2>
        <form id="resetForm" class="space-y-4 mt-8">
          <div>
            <label for="newPassword" class="block mb-2 text-md font-medium text-gray-900">Password baru</label>
            <input type="password" id="newPassword" placeholder="Password Baru" required class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#378BA2] focus:border-[#378BA2] block w-full p-2.5" />
            <p id="password-msg" class="mt-1 text-sm text-red-500 hidden">Password minimal 8 karakter</p>
          </div>
          <div>
            <label for="confirmPassword" class="block mb-2 text-md font-medium text-gray-900">Konfirmasi password</label>
            <input type="password" id="confirmPassword" placeholder="Konfirmasi Password" required class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#378BA2] focus:border-[#378BA2] block w-full p-2.5" />
            <p id="confirm-msg" class="mt-1 text-sm text-red-500 hidden">Password tidak cocok</p>
          </div>
          <button type="submit" class="cursor-pointer w-full text-white bg-[#378BA2] hover:bg-[#2C6F82] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-8 py-3 text-center">Perbarui Password</button>
        </form>
        <div id="resetMessage" class="text-sm mt-4 text-center text-gray-700"></div>
      </section>
    `;
  }

  afterRender() {
    const form = document.getElementById('resetForm');
    const messageBox = document.getElementById('resetMessage');
    const token = getQueryParams().get('token');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const msg = document.getElementById('confirm-msg');
    const passMsg = document.getElementById('password-msg');
    if (!token) {
      messageBox.textContent = 'Token tidak ditemukan di URL.';
      form.style.display = 'none';
      return;
    }
    newPassword.addEventListener('input', () => {
      if (newPassword.value.length < 8) {
        newPassword.classList.add('border-red-500', 'ring-red-500');
        newPassword.classList.remove('border-gray-300');
        passMsg.classList.remove('hidden');
      } else {
        newPassword.classList.remove('border-red-500', 'ring-red-500');
        newPassword.classList.add('border-gray-300');
        passMsg.classList.add('hidden');
      }
    });

    confirmPassword.addEventListener('input', () => {
      if (confirmPassword.value !== newPassword.value) {
        confirmPassword.classList.add('border-red-500', 'ring-red-500');
        confirmPassword.classList.remove('border-gray-300');
        msg.classList.remove('hidden');
      } else {
        confirmPassword.classList.remove('border-red-500', 'ring-red-500');
        confirmPassword.classList.add('border-gray-300');
        msg.classList.add('hidden');
      }
    });

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
          let timerInterval;
          Swal.fire({
            title: 'Reset Password Berhasil!',
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
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Terjadi kesalahan saat reset password.',
          confirmButtonText: 'OK',
        });
      }
    });
    AOS.init({
      duration: 800,
      once: true,
    });
  }
}
