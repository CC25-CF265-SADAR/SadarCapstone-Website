import { generateQuizFooterTemplate, generateQuizNavTemplate } from '../../../templates/template';
import { handleQuizResult } from '../../../utils/score-manager';
import { setupProfileDropdown } from '../../../utils/navbar-interaction';
import { getLogout } from '../../../utils/auth';

export default class ResultPage {
  async render() {
    return `
    <section class="result-page">
          <div id="result-nav"></div>
            ${generateQuizNavTemplate()}
          
          <div id="app" class="mt-4"></div>
    
          <div id="result-footer">
            ${generateQuizFooterTemplate()}
          </div>
        </section>
      `;
  }

  async afterRender() {
    // ini quiz harusnya make local storage ga sie, semisal iya nnt begini
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];

    handleQuizResult(userAnswers, correctAnswers);

    setupProfileDropdown();

    document.addEventListener('click', (event) => {
      if (event.target.id === 'logout-btn') {
        getLogout();
        location.hash = '/';
        location.reload(); // agar render ulang navbar
      }
    });
  }
}
