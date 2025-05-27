import { generateQuizFooterTemplate } from '../../../templates/template.js';
import { generateProgressModuleQuizTemplate } from '../../../templates/template-module.js';
import QuizMateriPresenter from './QuizMateri-presenter.js';
import { setupProfileDropdown } from '../../../utils/navbar-interaction.js';
import { getLogout } from '../../../utils/auth.js';

export default class QuizMateriPage {
  constructor() {
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
    this.presenter.afterRender();
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
    document.getElementById('quiz-content').innerHTML = template;
  }

  updateProgress(answeredCount, totalQuestions, userAnswers, currentIndex) {
    const container = document.getElementById('progress-container');
    container.innerHTML = generateProgressModuleQuizTemplate(totalQuestions, currentIndex, userAnswers);
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
