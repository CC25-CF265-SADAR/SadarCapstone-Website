import { generateQuizFooterTemplate } from '../../../templates/template.js';
import { generateProgressModuleQuizTemplate } from '../../../templates/template-module.js';
import QuizMateriPresenter from './QuizMateri-presenter.js';
import { setupProfileDropdown } from '../../../utils/navbar-interaction.js';
import { getLogout } from '../../../utils/auth.js';
import { moduleQuestions } from '../../../data/modul-question-data.js';

export default class QuizMateriPage {
  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    this.modId = urlParams.get('modId') || 'mod-1'; // ✅ fallback default
    this.questions = moduleQuestions[this.modId] || [];

    this.presenter = new QuizMateriPresenter(this);
  }

  async render() {
    return `
      <section class="quiz-page">
        <div id="quiz-nav"></div>
        <div id="progress-container"></div>
        <div id="quiz-content" class="mt-4"></div>
        <div id="quiz-footer">
          ${generateQuizFooterTemplate()}
        </div>
      </section>
    `;
  }

  async afterRender() {
    await this.presenter.afterRender();
    setupProfileDropdown();

    document.addEventListener('click', (event) => {
      if (event.target.id === 'logout-btn') {
        getLogout();
        location.hash = '/';
        location.reload();
      }
    });
  }

  renderQuestion(template, isLast, currentIndex, userAnswers) {
    const content = document.getElementById('quiz-content');
    if (content) content.innerHTML = template;
  }

  updateProgress(answeredCount, totalQuestions, userAnswers, currentIndex) {
  const container = document.getElementById('progress-container');
  if (container && container.innerHTML.trim() === '') {
    container.innerHTML = generateProgressModuleQuizTemplate(); // 🛠 render ulang struktur bar
  }

  const percent = Math.round((answeredCount / totalQuestions) * 100);

  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = `${percent}%`;
  }

  const progressText = document.getElementById('progress-text');
  if (progressText) {
    progressText.textContent = `${answeredCount}/${totalQuestions} telah dijawab`;
  }

  const dots = document.querySelectorAll('#progress-dots span');
    dots.forEach((dot, index) => {
      dot.className =
        'w-2 h-2 rounded-full inline-block ' +
        (index < answeredCount ? 'bg-[#FFEA7F]' : 'bg-[#42A7C3]');
    });
}

  showErrorMessage() {
    const err = document.getElementById('error-message');
    if (err) err.classList.remove('hidden');
  }

  hideErrorMessage() {
    const err = document.getElementById('error-message');
    if (err) err.classList.add('hidden');
  }
}
