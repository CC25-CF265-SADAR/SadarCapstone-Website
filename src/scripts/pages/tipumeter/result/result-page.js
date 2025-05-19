import {
  generateQuizFooterTemplate,
  generateQuizNavTemplate, 
} from "../../../template";
import { handleQuizResult } from "../../../utils/score-manager";

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
  }
};