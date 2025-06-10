import { generateQuizFooterTemplate, generateQuizNavTemplate } from '../../../templates/template';
import ResultPresenter from './result-presenter';
import { setupProfileDropdown } from '../../../utils/navbar-interaction';
import { getLogout } from '../../../utils/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
export default class ResultPage {
  constructor() {
    this.presenter = new ResultPresenter();
  }

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
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];

    this.presenter.init({ userAnswers, correctAnswers });

    setupProfileDropdown();

    document.addEventListener('click', (event) => {
      if (event.target.id === 'logout-btn') {
        getLogout();
        location.hash = '/';
        location.reload();
      }
    });

    AOS.init({
      duration: 800,
      once: true,
    });
  }
}
