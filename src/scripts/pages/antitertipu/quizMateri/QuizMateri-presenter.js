import { fetchQuestionsByModuleId } from '../../../data/api.js'; // pastikan import api
import { generateQuizModuleQuestionTemplate } from '../../../templates/template-module.js';

export default class QuizMateriPresenter {
  #currentIndex = 0;
  #userAnswers = [];
  #navigationSetup = false;
  questions = []; // Menyimpan pertanyaan yang didapatkan dari API

  constructor(view) {
    this.view = view;
    this.modId = view.modId;
  }

  async afterRender() {
    try {
      // Ambil pertanyaan berdasarkan modId dari API
      console.log('Fetching questions for modId:', this.modId);
      const questionsData = await fetchQuestionsByModuleId(this.modId);
      this.questions = questionsData.questions || [];
      this.totalQuestions = this.questions.length;
      this.#userAnswers = Array(this.totalQuestions).fill(null);

      this.#renderCurrentQuestion();
      this.#updateProgress();
      this.#setupNavigation();
    } catch (error) {
      console.error('Error fetching questions:', error);
      this.view.showErrorMessage('Tidak dapat mengambil pertanyaan');
    }
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
        const inputName = multiple
          ? `question-${currentQuestion.id}[]`
          : `question-${currentQuestion.id}`;
        const checked = form.querySelectorAll(`input[name="${inputName}"]:checked`);

        if (checked.length === 0) {
          this.view.showErrorMessage();
          return;
        }

        this.view.hideErrorMessage();

        const answer = multiple ? Array.from(checked).map((el) => el.value) : [checked[0].value];

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
    const answered = this.#userAnswers
      .slice(0, this.#currentIndex)
      .filter((a) => a !== null).length;
    this.view.updateProgress(answered, this.totalQuestions, this.#userAnswers, this.#currentIndex);
  }

  #finishQuiz() {
    const correctAnswers = this.questions.map((q) => (q.multiple ? q.answer : [q.answer]));

    localStorage.setItem('userAnswers', JSON.stringify(this.#userAnswers));
    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));

    // Arahkan ke halaman hasil quiz dan kirim modId lewat URL
    window.location.href = `#/result-module/${this.modId}`;
  }
}
