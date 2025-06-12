import { fetchResultByUserId, fetchQuestionsByModuleId } from '../../../data/api.js';

export default class QuizResultPresenter {
  constructor(modId) {
    this.modId = modId;
  }

  async getProcessedResult() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token tidak ditemukan');

    const resultData = await fetchResultByUserId(this.modId, token);
    const questionData = await fetchQuestionsByModuleId(this.modId, token);
    const questions = questionData.questions || [];

    const userAnswers = resultData.answers.map((ans) =>
      Array.isArray(ans.userAnswer) ? ans.userAnswer : [String(ans.userAnswer)],
    );

    const correctAnswers = questions.map((q) =>
      Array.isArray(q.answer) ? q.answer : [String(q.answer)],
    );

    return {
      totalQuestions: resultData.totalQuestions,
      score: resultData.score,
      userAnswers,
      correctAnswers,
      questions,
    };
  }
}
