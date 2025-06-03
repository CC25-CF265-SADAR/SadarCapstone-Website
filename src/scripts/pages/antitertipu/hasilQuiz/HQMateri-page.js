import { generateQuizModuleResultTemplate } from '../../../templates/template-module.js';
import QuizResultPresenter from './HQMateri-presenter.js';

export default class QuizResultModulePage {
  constructor() {
    const hash = window.location.hash;
    const parts = hash.split('/');
    this.modId = parts[2];
    this.presenter = new QuizResultPresenter(this.modId);
  }

  async render() {
    return `
      <div class="container mx-auto px-4 py-8">
        <div id="result-container" class="bg-white rounded-lg shadow-md p-6"></div>
        <div id="loading-message" class="text-center py-8">
          <p>Memuat hasil kuis...</p>
        </div>
        <div id="error-message" class="hidden text-center py-8 text-red-500"></div>
      </div>
    `;
  }

  async afterRender() {
    const container = document.getElementById('result-container');
    const loading = document.getElementById('loading-message');
    const errorDiv = document.getElementById('error-message');

    try {
      const resultData = await this.presenter.getResultData();
      
      if (resultData.error) {
        throw new Error(resultData.message);
      }

      loading.classList.add('hidden');
      container.innerHTML = generateQuizModuleResultTemplate({
        ...resultData,
        modId: this.modId
      });

      const retryButton = document.getElementById('retry-button');
      retryButton?.addEventListener('click', () => {
        window.location.hash = `#/quiz-modul/${this.modId}`;
      });

    } catch (error) {
      loading.classList.add('hidden');
      errorDiv.classList.remove('hidden');
      errorDiv.textContent = error.message || 'Terjadi kesalahan saat memuat hasil kuis';
      console.error('Error:', error);
    }
  }
}
