import { handleQuizResult } from '../utils/score-manager'

export default class ResultPage {
  async render() {
    return `<div id="app" class="min-h-screen bg-gray-50 py-10 px-4"></div>`;
  }

  async afterRender() {
    // ini quiz harusnya make local storage ga sie, semisal iya nnt begini
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];

    handleQuizResult(userAnswers, correctAnswers);
  }
};