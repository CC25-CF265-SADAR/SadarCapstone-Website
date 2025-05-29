import { generateQuizModuleResultTemplate } from '../../../templates/template-module.js';
import { moduleQuestions } from '../../../data/modul-question-data.js';
import QuizResultPresenter from './HQMateri-presenter.js';

export default class QuizResultModulePage {
  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    this.modId = urlParams.get('modId') || 'mod-1';
    this.questions = moduleQuestions[this.modId] || [];
    this.presenter = new QuizResultPresenter(this.modId, this.questions);
  }

  async render() {
    return `<div id="result-container" class="pt-8"></div>`;
  }

  async afterRender() {
    const container = document.getElementById('result-container');
    const resultData = this.presenter.getResultData();

    container.innerHTML = generateQuizModuleResultTemplate({
      ...resultData,
      questions: this.questions,
    });

    const retryButton = document.getElementById('retry-button');
    retryButton?.addEventListener('click', () => {
      this.presenter.clearData();
      window.location.hash = `#/quiz?modId=${this.modId}`;
    });
  }
}