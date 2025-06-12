import { fetchQuestionsByModuleId, saveUserAnswers, saveUserProgress, fetchModuleDetail, fetchUserProgress } from '../../../data/api.js';
import { generateQuizModuleQuestionTemplate } from '../../../templates/template-module.js';

export default class QuizMateriPresenter {
  #currentIndex = 0;
  #userAnswers = [];
  #navigationSetup = false;
  questions = [];

  constructor(view) {
    this.view = view;
    this.modId = view.modId;
  }

  async afterRender() {
    try {
      console.log('Fetching questions for modId:', this.modId);
      const questionsData = await fetchQuestionsByModuleId(this.modId);
      this.questions = questionsData.questions || [];
      this.totalQuestions = this.questions.length;
      this.#userAnswers = Array(this.totalQuestions).fill([]);

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

    const selectedAnswers = this.#userAnswers[this.#currentIndex] || [];
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

      // NEXT
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
        const answer = multiple ? Array.from(checked).map(el => el.value) : [checked[0].value];
        this.#userAnswers[this.#currentIndex] = answer;

        if (this.#currentIndex < this.totalQuestions - 1) {
          this.#currentIndex++;
          this.#renderCurrentQuestion();
          this.#updateProgress();
        } else {
          this.#finishQuiz();
        }
      }

      if (e.target.closest('#prev-button')) {
        if (this.#currentIndex > 0) {
          this.#currentIndex--;
          this.#renderCurrentQuestion();
          this.#updateProgress();
        }
      }

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
    const answered = this.#userAnswers.filter(ans => ans && ans.length > 0).length;
    this.view.updateProgress(answered, this.totalQuestions, this.#userAnswers, this.#currentIndex);
  }

  async #fetchModuleDetailAndMarkIntroQuiz() {
    const response = await fetch(`https://localhost:9001/modules/${this.modId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Gagal mengambil data modul');
    }

    return await response.json();
  }

  #finishQuiz() {
    const correctAnswers = this.questions.map(q => (q.multiple ? q.answer : [q.answer]));
    const score = this.#calculateScore(correctAnswers);

    const answers = this.questions.map((question, index) => ({
      questionId: question.id.trim(),
      userAnswer: this.#userAnswers[index] || [],
    }));

    const data = {
      modId: this.modId.trim(),
      answers,
      score,
      totalQuestions: this.totalQuestions,
      token: localStorage.getItem('token'), 
    };

    console.log('Sending data:', data);
    saveUserAnswers(data)
      .then(async (response) => {
        console.log('Answers saved successfully:', response);

        const [moduleDetail, userProgressData] = await Promise.all([
          fetchModuleDetail(this.modId),
          fetchUserProgress(this.modId),
        ]);

        const existingProgress = userProgressData?.data?.modulesProgress?.find(
          (m) => m.moduleId === this.modId
        );

        const topicsProgress = moduleDetail.topics.map((topic) => {
        const oldProgress = existingProgress?.topicsProgress?.find(t => t.topicId === topic.id)?.checkpoint;

        const isIntroQuiz = topic.title.toLowerCase().includes('kuis evaluasi');
        return {
          topicId: topic.id,
          checkpoint: oldProgress || isIntroQuiz,
          };
        });

        await saveUserProgress({
          moduleId: this.modId,
          topicsProgress,
          checkQuiz: true,
        });

        window.location.href = `#/result-module/${this.modId}`;
      })

      .catch(error => {
        console.error('Error saving answers:', error);
        this.view.showErrorMessage(`Gagal menyimpan jawaban: ${error.message}`);
      });
  }

  #calculateScore(correctAnswers) {
  let correctCount = 0;
  this.#userAnswers.forEach((userAnswer, index) => {
    const correct = correctAnswers[index];

    const normalizedUser = (userAnswer || []).map(ans => String(ans).trim().toLowerCase());
const normalizedCorrect = (correct || []).map(ans => String(ans).trim().toLowerCase());

    const isCorrect =
      normalizedCorrect.length === normalizedUser.length &&
      normalizedCorrect.every(ans => normalizedUser.includes(ans));

    if (isCorrect) correctCount++;
  });

  return Math.round((correctCount / this.totalQuestions) * 100);
}
}