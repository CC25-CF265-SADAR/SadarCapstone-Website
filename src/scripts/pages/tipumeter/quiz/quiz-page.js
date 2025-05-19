import {
  generateQuizFooterTemplate,
  generateQuizNavTemplate,
  generateQuizQuestionMcqTemplate,
  generateQuizQuestionDragdropTemplate,
  generateQuizResolveTemplate,
  generateProgressQuizTemplate,
} from '../../../template';

import { questions } from '../../../data/question-data.js';
import { setupSortableDragAndDrop } from '../../../utils/dragdrop-utils.js';

export default class QuizPage {
  #currentIndex = 0;
  #totalQuestions = questions.length;
  #answered = 0;
  #userAnswers = []; // cc tambah ini

  async render() {
    return `
    <section class="quiz-page">


<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 class="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Seberapa Cermat Kamu Hadapi Penipuan Digital?</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Penipuan siber bisa datang kapan saja lewat pesan WhatsApp, email mencurigakan, hingga iklan palsu di media sosial. Kamu Termasuk yang Waspada atau Ceroboh? Cek disini!</p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Mulai Kuis
                <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a> 
        </div>
        <img src="background-tipumeter.svg" class="w-full">
    </div>
</section>
    
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
    this.#renderCurrentQuestion();
    this.#handleNextButton();
    this.#updateProgress(0);
  }

  #renderCurrentQuestion() {
    const container = document.getElementById('quiz-content');
    const currentQuestion = questions[this.#currentIndex];

    if (!currentQuestion) return;

    let questionTemplate = '';

    if (currentQuestion.type === 'mcq') {
      questionTemplate = generateQuizQuestionMcqTemplate(currentQuestion);
    } else if (currentQuestion.type === 'dragdrop') {
      questionTemplate = generateQuizQuestionDragdropTemplate(currentQuestion);
    }

    container.innerHTML = questionTemplate;

    const nextButton = document.getElementById('next-button');
    if (nextButton && this.#currentIndex === this.#totalQuestions - 1) {
      nextButton.textContent = 'Selesai';
    }

    if (currentQuestion.type === 'dragdrop') {
      setupSortableDragAndDrop();
    }
  }

  #handleNextButton() {
    document.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'next-button') {
        const currentQuestion = questions[this.#currentIndex];
        const errorMessage = document.getElementById('error-message');

        if (errorMessage) errorMessage.classList.add('hidden');
        // caca ubah dari sini
        let answer;

        if (currentQuestion.type === 'mcq') {
          const form = document.querySelector('form');
          const inputName = form.getAttribute('data-question-id');
          const checkedInputs = form.querySelectorAll(
            `input[name="question-${inputName}${currentQuestion.multiple ? '[]' : ''}"]:checked`,
          );

          if (checkedInputs.length === 0) {
            if (errorMessage) errorMessage.classList.remove('hidden');
            return;
          }

          answer = currentQuestion.multiple
            ? Array.from(checkedInputs).map((el) => el.value)
            : [checkedInputs[0].value];
        }

        if (currentQuestion.type === 'dragdrop') {
          const rightZone = document.getElementById('zone-right');
          const wrongZone = document.getElementById('zone-wrong');

          const rightItems = Array.from(rightZone.querySelectorAll('.draggable')).map((el) =>
            el.textContent.trim(),
          );

          const wrongItems = Array.from(wrongZone.querySelectorAll('.draggable')).map((el) =>
            el.textContent.trim(),
          );

          if (rightItems.length === 0 && wrongItems.length === 0) {
            if (errorMessage) errorMessage.classList.remove('hidden');
            return;
          }

          answer = { right: rightItems, wrong: wrongItems };
        }

        // Simpan jawaban soal saat ini
        this.#userAnswers.push(answer);
        this.#answered++;
        this.#currentIndex++;

        if (this.#currentIndex < this.#totalQuestions) {
          this.#renderCurrentQuestion();
          this.#updateProgress(this.#answered);
        } else {
          const correctAnswers = this.#collectCorrectAnswers();
          localStorage.setItem('userAnswers', JSON.stringify(this.#userAnswers));
          localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
          window.location.href = '/#/result';
        }
      }
    });
  }

  //caca tambah ini jg
  #collectCorrectAnswers() {
    return questions.map((q) => {
      if (q.type === 'dragdrop') {
        return {
          right: q.options.filter((opt) => opt.category === 'right').map((opt) => opt.text),
          wrong: q.options.filter((opt) => opt.category === 'wrong').map((opt) => opt.text),
        };
      }

      if (q.multiple) {
        return q.answer; // array
      }

      return [q.answer]; // single choice
    });
  }
  // caca sampe sini

  #updateProgress(answeredCount) {
    const percent = (answeredCount / this.#totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = `${percent}%`;
    document.getElementById('progress-text').textContent =
      `${answeredCount}/${this.#totalQuestions} telah dijawab`;

    const dots = document.querySelectorAll('#progress-dots span');
    dots.forEach((dot, index) => {
      dot.className =
        'w-2 h-2 rounded-full inline-block ' +
        (index < answeredCount ? 'bg-[#FFEA7F]' : 'bg-[#42A7C3]');
    });
  }

  #showResult() {
    const container = document.getElementById('quiz-nav');
    container.innerHTML = generateQuizResolveTemplate();
  }
}
