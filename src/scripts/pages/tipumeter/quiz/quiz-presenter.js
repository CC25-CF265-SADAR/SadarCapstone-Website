import {
  generateQuizQuestionMcqTemplate,
  generateQuizQuestionDragdropTemplate,
} from '../../../templates/template.js';
import { questions } from '../../../data/question-data.js';
import { setupSortableDragAndDrop } from '../../../utils/dragdrop-utils.js';

export default class QuizPresenter {
  #currentIndex = 0;
  #answered = 0;
  #userAnswers = [];

  constructor(view) {
    this.view = view;
    this.totalQuestions = questions.length;
  }

  async afterRender() {
    this.#renderCurrentQuestion();
    this.#handleNextButton();
    this.#updateProgress();
  }

  #renderCurrentQuestion() {
    const currentQuestion = questions[this.#currentIndex];
    if (!currentQuestion) return;

    let questionTemplate = '';
    if (currentQuestion.type === 'mcq') {
      questionTemplate = generateQuizQuestionMcqTemplate(currentQuestion);
    } else if (currentQuestion.type === 'dragdrop') {
      questionTemplate = generateQuizQuestionDragdropTemplate(currentQuestion);
    }

    const isLast = this.#currentIndex === this.totalQuestions - 1;
    this.view.renderQuestion(questionTemplate, isLast);

    if (currentQuestion.type === 'dragdrop') {
      requestAnimationFrame(() => {
        setupSortableDragAndDrop();
      });
    }
  }

  #handleNextButton() {
    document.addEventListener('click', (e) => {
      if (e.target?.id === 'next-button') {
        const currentQuestion = questions[this.#currentIndex];
        const currentType = currentQuestion.type || ''
        this.view.hideErrorMessage();

        let answer;

        if (currentType === 'mcq') {
          const form = document.querySelector('form');
          if (!form) {
            console.warn('Form belum tersedia di DOM.');
            return;
          }
          const inputName = form.getAttribute('data-question-id');
          const checkedInputs = form.querySelectorAll(
            `input[name="question-${inputName}${currentQuestion.multiple ? '[]' : ''}"]:checked`,
          );

          if (checkedInputs.length === 0) {
            this.view.showErrorMessage();
            return;
          }

          answer = currentQuestion.multiple
            ? Array.from(checkedInputs).map((el) => el.value)
            : [checkedInputs[0].value];
        }

        if (currentType === 'dragdrop') {
          const zones = document.querySelectorAll('.drop-zone');
          answer = {};
          let hasDroppedItem = false;

          zones.forEach((zone) => {
            const key = zone.getAttribute('data-accept');
            const readableKey = key
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (char) => char.toUpperCase());
            const items = Array.from(zone.querySelectorAll('.draggable')).map((el) =>
              el.textContent.trim(),
            );

            if (items.length > 0) {
              hasDroppedItem = true;
            }

            answer[readableKey] = items;
          });

          if (!hasDroppedItem) {
            this.view.showErrorMessage();
            return;
          }
        }

        this.#userAnswers.push(answer);
        this.#answered++;
        this.#currentIndex++;

        if (this.#currentIndex < this.totalQuestions) {
          this.#renderCurrentQuestion();
          this.#updateProgress();
        } else {
          this.#finishQuiz();
        }
      }
    });
  }

  #updateProgress() {
    this.view.updateProgress(this.#answered, this.totalQuestions);
  }

  #finishQuiz() {
    const correctAnswers = this.#collectCorrectAnswers();
    localStorage.setItem('userAnswers', JSON.stringify(this.#userAnswers));
    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
    window.location.href = '/#/result';
  }

  #collectCorrectAnswers() {
    return questions.map((q) => {
      if (q.type === 'dragdrop') {
        const correctMap = {};
        q.dropZones.forEach((zone) => {
          correctMap[zone] = q.options
            .filter((opt) => opt.category === zone)
            .map((opt) => opt.text);
        });
        return correctMap;
      }

      return q.multiple ? q.answer : [q.answer];
    });
  }
}