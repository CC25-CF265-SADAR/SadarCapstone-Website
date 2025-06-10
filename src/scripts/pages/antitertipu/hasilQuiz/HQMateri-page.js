import { fetchResultByUserId, fetchQuestionsByModuleId } from '../../../data/api.js';
import { generateQuizModuleResultTemplate } from '../../../templates/template-module.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class QuizResultModulePage {
  constructor(modId) {
    this.modId = modId;
  }

  async render() {
    const token = localStorage.getItem('token');
    if (!token) {
      return `<p class="text-red-500 text-center">Token tidak ditemukan. Silakan login kembali.</p>`;
    }

    try {
      const resultData = await fetchResultByUserId(this.modId, token);
      const questionData = await fetchQuestionsByModuleId(this.modId, token);
      const questions = questionData.questions || [];

      const userAnswers = resultData.answers.map((ans) =>
        Array.isArray(ans.userAnswer) ? ans.userAnswer : [String(ans.userAnswer)],
      );

      const correctAnswers = questions.map((q) =>
        Array.isArray(q.answer) ? q.answer : [String(q.answer)],
      );

      return generateQuizModuleResultTemplate({
        moduleId: this.modId,
        totalQuestions: resultData.totalQuestions,
        score: resultData.score,
        date: new Date(resultData.createdAt).toLocaleDateString(),
        userAnswers,
        correctAnswers,
        questions,
      });
    } catch (error) {
      console.error('❌ Gagal mengambil hasil kuis:', error);
      return `<p class="text-red-500 text-center">Gagal mengambil hasil kuis: ${error.message}</p>`;
    }
  }

  async afterRender() {
    const retryBtn = document.getElementById('retry-button');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        window.location.href = `#/quiz-modul/${this.modId}`;
      });
    }
    AOS.init({
      duration: 800,
      once: true,
    });
  }
}
