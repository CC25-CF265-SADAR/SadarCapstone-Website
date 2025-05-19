
import {
  generateQuizFooterTemplate,
  generateQuizNavTemplate,
  generateQuizQuestionMcqTemplate,
  generateQuizQuestionDragdropTemplate,
  generateQuizResolveTemplate,
  generateProgressQuizTemplate,
} from "../../../template";

import { questions } from "../../../data/question-data.js";
import { setupSortableDragAndDrop } from "../../../utils/dragdrop-utils.js";

export default class QuizPage {
  #currentIndex = 0;
  #totalQuestions = questions.length;
  #answered = 0;

async render() {
  return `
    <section class="quiz-page">
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
  const container = document.getElementById("quiz-content");
  const currentQuestion = questions[this.#currentIndex];

  if (!currentQuestion) return;

  let questionTemplate = "";

  if (currentQuestion.type === "mcq") {
    questionTemplate = generateQuizQuestionMcqTemplate(currentQuestion);
  } else if (currentQuestion.type === "dragdrop") {
    questionTemplate = generateQuizQuestionDragdropTemplate(currentQuestion);
  }

  container.innerHTML = questionTemplate;

  const nextButton = document.getElementById("next-button");
  if (nextButton && this.#currentIndex === this.#totalQuestions - 1) {
    nextButton.textContent = "Selesai";
  }

  if (currentQuestion.type === "dragdrop") {
    setupSortableDragAndDrop();
  }
}

#handleNextButton() {
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "next-button") {
      const currentQuestion = questions[this.#currentIndex];
      const form = document.querySelector("form");
      const errorMessage = document.getElementById("error-message");

      if (errorMessage) errorMessage.classList.add("hidden");

      if (currentQuestion.type === "mcq") {
        const checkedInputs = form.querySelectorAll("input:checked");
        if (checkedInputs.length === 0) {
          if (errorMessage) errorMessage.classList.remove("hidden");
          return;
        }
      }

      if (currentQuestion.type === "dragdrop") {
        const rightZone = document.getElementById("zone-right");
        const wrongZone = document.getElementById("zone-wrong");
        const hasItem =
          rightZone.querySelectorAll(".draggable").length > 0 ||
          wrongZone.querySelectorAll(".draggable").length > 0;

        if (!hasItem) {
          if (errorMessage) errorMessage.classList.remove("hidden");
          return;
        }
      }

      this.#answered++;
      this.#currentIndex++;

      if (this.#currentIndex < this.#totalQuestions) {
        this.#renderCurrentQuestion();
        this.#updateProgress(this.#answered);
      } else {
        window.location.href = "/#/result";
      }
    }
  });
}

  #updateProgress(answeredCount) {
  const percent = (answeredCount / this.#totalQuestions) * 100;
  document.getElementById("progress-bar").style.width = `${percent}%`;
  document.getElementById("progress-text").textContent = `${answeredCount}/${this.#totalQuestions} telah dijawab`;

  const dots = document.querySelectorAll("#progress-dots span");
  dots.forEach((dot, index) => {
    dot.className =
      "w-2 h-2 rounded-full inline-block " +
      (index < answeredCount ? "bg-[#FFEA7F]" : "bg-[#42A7C3]");
  });
}

  #showResult() {
    const container = document.getElementById("quiz-nav");
    container.innerHTML = generateQuizResolveTemplate();
  }
}
