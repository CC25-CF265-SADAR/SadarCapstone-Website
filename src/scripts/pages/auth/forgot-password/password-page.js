import ForgotPasswordPresenter from './password-presenter';

export default class ForgotPasswordPage {
  async render() {
    return `
      <section class="max-w-md mx-auto p-6">
        <h2 class="text-2xl font-bold mb-4 text-center">Lupa Password</h2>
        <form id="forgotForm" class="space-y-4">
          <input type="email" id="email" placeholder="Masukkan email" required class="w-full p-2 border rounded" />
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Kirim Link Reset</button>
        </form>
        <div id="forgotMessage" class="text-sm mt-4 text-center text-gray-700"></div>
      </section>
    `;
  }

  afterRender() {
    new ForgotPasswordPresenter();
  }
}
