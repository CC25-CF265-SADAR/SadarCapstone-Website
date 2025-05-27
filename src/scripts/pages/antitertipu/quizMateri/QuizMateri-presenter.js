import { generateQuizModuleQuestionTemplate } from '../../../templates/template-module.js';
import { moduleQuestions } from '../../../data/modul-question-data.js';

export default class QuizMateriPresenter {
  #currentIndex = 0;
  #userAnswers = [];

  constructor(view) {
    this.view = view;
  }

  async afterRender() {
    const modId = this.view.modId || 'mod-1'; // ✅ ambil dari view
    this.questions = moduleQuestions[modId] || [];
    this.totalQuestions = this.questions.length;
    this.#userAnswers = Array(this.totalQuestions).fill(null);

    console.log('modId:', modId); // untuk debug
    console.log('questions:', this.questions);

    this.#renderCurrentQuestion();
    this.#updateProgress();
    this.#setupNavigation();
  }

  #renderCurrentQuestion() {
    const currentQuestion = this.questions[this.#currentIndex];
    if (!currentQuestion) return;

    const template = generateQuizModuleQuestionTemplate(currentQuestion);
    const isLast = this.#currentIndex === this.totalQuestions - 1;

    this.view.renderQuestion(template, isLast, this.#currentIndex, this.#userAnswers);
  }

  #setupNavigation() {
    document.addEventListener('click', (e) => {
      const currentQuestion = this.questions[this.#currentIndex];
      const form = document.querySelector('form');

      if (!form) return;

      // NEXT
      if (e.target?.id === 'next-button') {
        const inputName = `question-${currentQuestion.id}`;
        const checked = form.querySelectorAll(`input[name="${inputName}"]:checked`);

        if (checked.length === 0) {
          this.view.showErrorMessage();
          return;
        }

        this.view.hideErrorMessage();

        const answer = currentQuestion.multiple
          ? Array.from(checked).map((el) => el.value)
          : [checked[0].value];

        this.#userAnswers[this.#currentIndex] = answer;

        if (this.#currentIndex < this.totalQuestions - 1) {
          this.#currentIndex++;
          this.#renderCurrentQuestion();
          this.#updateProgress();
        } else {
          this.#finishQuiz();
        }
      }

      // PREVIOUS
      if (e.target?.id === 'prev-button') {
        if (this.#currentIndex > 0) {
          this.#currentIndex--;
          this.#renderCurrentQuestion();
          this.#updateProgress();
        }
      }

      // GOTO dot
      if (e.target.dataset.goto) {
        const index = parseInt(e.target.dataset.goto);
        if (!isNaN(index)) {
          this.#currentIndex = index;
          this.#renderCurrentQuestion();
          this.#updateProgress();
        }
      }
    });
  }

  #updateProgress() {
    const answered = this.#userAnswers.filter((a) => a !== null).length;
    this.view.updateProgress(answered, this.totalQuestions, this.#userAnswers, this.#currentIndex);
  }

  #finishQuiz() {
    const correctAnswers = this.questions.map((q) => q.multiple ? q.answer : [q.answer]);

    localStorage.setItem('userAnswers', JSON.stringify(this.#userAnswers));
    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));

    window.location.href = '/#/result';
  }
}
