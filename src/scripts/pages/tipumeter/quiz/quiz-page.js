import {
  generateQuizFooterTemplate,
  generateQuizNavTemplate,
  generateQuizQuestionMcqTemplate,
  generateQuizQuestionDragdropTemplate,
  generateQuizResolveTemplate,
  generateProgressQuizTemplate,
} from "../../../template";

import { questions } from "../../../data/question-data.js";

export default class QuizPage {
  #currentIndex = 0;
  #totalQuestions = questions.length;
  #answered = 0;

async render() {
  return `
    <section class="quiz-page">
      ${generateProgressQuizTemplate()}

      <div id="quiz-nav"></div>

      <div id="quiz-content" class="mt-4"></div> <!-- Tempat pertanyaan -->

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
  const container = document.getElementById("quiz-content"); // sebelumnya: quiz-nav
  const currentQuestion = questions[this.#currentIndex];

  if (!currentQuestion) return;

  let questionTemplate = "";

  if (currentQuestion.type === "mcq") {
    questionTemplate = generateQuizQuestionMcqTemplate(currentQuestion);
  } else if (currentQuestion.type === "dragdrop") {
    questionTemplate = generateQuizQuestionDragdropTemplate(currentQuestion);
  }

  container.innerHTML = questionTemplate;
}


  #handleNextButton() {
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "next-button") {
      this.#answered++;
      this.#currentIndex++;

      if (this.#currentIndex < this.#totalQuestions) {
        this.#renderCurrentQuestion();
        this.#updateProgress(this.#answered);
      } else {
        this.#showResult();
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
        "w-2 h-2 rounded-full " +
        (index < answeredCount ? "bg-yellow-400" : "bg-sky-500/40");
    });
  }

  #showResult() {
    const container = document.getElementById("quiz-nav");
    container.innerHTML = generateQuizResolveTemplate(); // or result template
  }
}
