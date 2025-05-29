import { generateQuizModuleQuestionTemplate } from '../../../templates/template-module.js';
import { moduleQuestions } from '../../../data/modul-question-data.js';

export default class QuizMateriPresenter {
  #currentIndex = 0;
  #userAnswers = [];
  #navigationSetup = false;

  constructor(view) {
    this.view = view;
  }

  async afterRender() {
    const modId = this.view.modId || 'mod-1';
    this.questions = moduleQuestions[modId] || [];
    this.totalQuestions = this.questions.length;
    this.#userAnswers = Array(this.totalQuestions).fill(null);

    this.#renderCurrentQuestion();
    this.#updateProgress();
    this.#setupNavigation(); // pasang listener hanya sekali
  }

  #renderCurrentQuestion() {
    const currentQuestion = this.questions[this.#currentIndex];
    if (!currentQuestion) return;

    // Ambil jawaban yang sudah dipilih untuk soal ini (array)
    const selectedAnswers = this.#userAnswers[this.#currentIndex] || [];

    // Generate template dengan jawaban yang sudah dipilih
    const template = generateQuizModuleQuestionTemplate(currentQuestion, selectedAnswers);
    const isLast = this.#currentIndex === this.totalQuestions - 1;

    this.view.renderQuestion(template, isLast, this.#currentIndex, this.#userAnswers);
  }

  #setupNavigation() {
    if (this.#navigationSetup) return;
    this.#navigationSetup = true;

    document.body.addEventListener('click', (e) => {
      const currentQuestion = this.questions[this.#currentIndex];
      if (!currentQuestion) return;

      const multiple = currentQuestion.multiple;
      const form = document.querySelector('form');
      if (!form) return;

      // Tombol NEXT
      if (e.target.closest('#next-button')) {
        const inputName = multiple ? `question-${currentQuestion.id}[]` : `question-${currentQuestion.id}`;
        const checked = form.querySelectorAll(`input[name="${inputName}"]:checked`);

        if (checked.length === 0) {
          this.view.showErrorMessage();
          return;
        }

        this.view.hideErrorMessage();

        const answer = multiple
          ? Array.from(checked).map(el => el.value)
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

      // Tombol PREVIOUS
      if (e.target.closest('#prev-button')) {
        if (this.#currentIndex > 0) {
          this.#currentIndex--;
          this.#renderCurrentQuestion();
          this.#updateProgress();
        }
      }

      // Klik bulatan progress
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
  const answered = this.#userAnswers.slice(0, this.#currentIndex).filter((a) => a !== null).length;
  this.view.updateProgress(answered, this.totalQuestions, this.#userAnswers, this.#currentIndex);
}

  #finishQuiz() {
    const correctAnswers = this.questions.map(q => (q.multiple ? q.answer : [q.answer]));

    localStorage.setItem('userAnswers', JSON.stringify(this.#userAnswers));
    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));

    window.location.href = '/#/result-module';
  }
}