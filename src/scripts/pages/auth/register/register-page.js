import RegisterPresenter from './register-presenter';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
      <section class="login-container flex flex-col items-center gap-0 md:flex-row xl:gap-10">
        <aside data-aos="fade-right" data-aos-delay="300" class="hidden flex flex-col items-center justify-start md:block items-start border border-gray-300 rounded-lg border-1 m-5 pt-10 md:px-8 md:pb-15 w-full md:w-1/2 max-w-xl xl:block items-start border border-gray-300 rounded-lg border-1 m-5 pt-10 px-15 pb-15 w-full">
            <img src="images/logo-sadar-dark.svg" class="w-[150px] h-auto" alt="Logo"">
            <h1 class="text-2xl xl:text-3xl font-bold mt-4 text-center md:text-left">Bergabung dengan SADAR</h1>
            <h2 class="text-lg font-regular text-[#2C6F82] mt-2">Mulai langkahmu melawan penipuan dan ancaman online</h2>
            <img src="images/register-illustration.svg" class="max-w-100 mt-6" alt="ilustasi registrasi">
        </aside>
      
        <div data-aos="fade-left" data-aos-delay="300" class="w-full max-w-xl flex flex-col items-center p-8 sm:p-6 md:p-8">
            <img src="images/logo-sadar-dark.svg" class="w-[120px] mt-10 h-auto md:hidden" alt="Logo"">
            <form class="space-y-5" action="#">
                <h1 class="mt-5 text-2xl text-center font-bold md:text-3xl md:font-medium text-gray-900">Buat Akun</h1>
                <h2 class="text-center md:text-md md:font-regular text-gray-500">Daftarkan dirimu dan jadi bagian dari gerakan SADAR</h2>
                <div>
                    <label for="email" class="block mb-2 text-md font-medium text-gray-900">Email</label>
                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-md font-medium text-gray-900">Password</label>
                    <input type="password" id="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    <p id="password-msg" class="mt-1 text-sm text-red-500 hidden">Password minimal 8 karakter</p>
                </div>
                <div>
                    <label for="confirm_password" class="block mb-2 text-md font-medium text-gray-900">Konfirmasi password</label>
                    <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
                    <p id="confirm-msg" class="mt-1 text-sm text-red-500 hidden">Password tidak cocok</p>
                </div>
                
                <button type="submit" id="register-btn" disabled class="w-full bg-gray-300 cursor-not-allowed font-medium rounded-lg text-md px-5 py-2.5 text-center text-white">Daftar Sekarang</button>
                <div class="text-sm font-regular text-gray-500">
                    Sudah punya akun? <a href="#/login" class="text-[#378BA2] hover:font-medium hover:underline">Masuk akun</a>
                </div>
            </form>
        </div>
      </section>
    `;
  }

  afterRender() {
    this.#presenter = new RegisterPresenter();
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');
    const msg = document.getElementById('confirm-msg');
    const passMsg = document.getElementById('password-msg');
    const email = document.getElementById('email');
    const registerBtn = document.getElementById('register-btn');
    password.addEventListener('input', () => {
      if (password.value.length < 8) {
        password.classList.add('border-red-500', 'ring-red-500');
        password.classList.remove('border-gray-300');
        passMsg.classList.remove('hidden');
      } else {
        password.classList.remove('border-red-500', 'ring-red-500');
        password.classList.add('border-gray-300');
        passMsg.classList.add('hidden');
      }
    });

    confirmPassword.addEventListener('input', () => {
      if (confirmPassword.value !== password.value) {
        confirmPassword.classList.add('border-red-500', 'ring-red-500');
        confirmPassword.classList.remove('border-gray-300');
        msg.classList.remove('hidden');
      } else {
        confirmPassword.classList.remove('border-red-500', 'ring-red-500');
        confirmPassword.classList.add('border-gray-300');
        msg.classList.add('hidden');
      }
    });

    function validateFormFields() {
      const isFilled =
        email.value.trim() !== '' &&
        password.value.trim() !== '' &&
        confirmPassword.value.trim() !== '';

      const isPasswordValid = password.value.length >= 8;
      const isPasswordMatch = password.value === confirmPassword.value;

      const isValid = isFilled && isPasswordValid && isPasswordMatch;

      registerBtn.disabled = !isValid;

      if (isValid) {
        registerBtn.classList.remove('bg-gray-300', 'cursor-not-allowed');
        registerBtn.classList.add(
          'bg-[#378BA2]',
          'hover:bg-[#2C6F82]',
          'cursor-pointer',
          'focus:ring-4',
          'focus:outline-none',
          'focus:ring-blue-300',
        );
      } else {
        registerBtn.classList.add('bg-gray-300', 'cursor-not-allowed');
        registerBtn.classList.remove(
          'bg-[#378BA2]',
          'hover:bg-[#2C6F82]',
          'cursor-pointer',
          'focus:ring-4',
          'focus:outline-none',
          'focus:ring-blue-300',
        );
      }
    }

    [email, password, confirmPassword].forEach((input) => {
      input.addEventListener('input', validateFormFields);
    });
    AOS.init({
      duration: 800,
      once: true,
    });
  }
}
