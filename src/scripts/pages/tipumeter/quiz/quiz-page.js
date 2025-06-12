import {
  generateQuizFooterTemplate,
  generateProgressQuizTemplate,
} from '../../../templates/template';
import QuizPresenter from './quiz-presenter';
import { setupProfileDropdown } from '../../../utils/navbar-interaction';
import { getLogout } from '../../../utils/auth';

export default class QuizPage {
  constructor() {
    this.presenter = new QuizPresenter(this);
  }

  async render() {
    return `
    <section class="quiz-page">
      <div id="quiz-nav"></div>
      ${generateProgressQuizTemplate()}
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

  renderQuestion(template, isLast) {
    const container = document.getElementById('quiz-content');
    container.innerHTML = template;

    const nextButton = document.getElementById('next-button');
    if (nextButton && isLast) nextButton.textContent = 'Selesai';
  }

  updateProgress(answeredCount, totalQuestions) {
    const percent = (answeredCount / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = `${percent}%`;
    document.getElementById('progress-text').textContent =
      `${answeredCount}/${totalQuestions} telah dijawab`;

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
