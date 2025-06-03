import { fetchResultByUserId, fetchQuestionsByModuleId } from '../../../data/api.js';

export default class QuizResultPresenter {
  constructor(modId) {
    this.modId = modId;
    this.userId = this.getUserId();
  }

  async getResultData() {
    try {
      const resultData = await fetchResultByUserId(this.modId);

      // Cek hasil kuis
      if (!resultData || !Array.isArray(resultData.answers)) {
        throw new Error('Data hasil kuis tidak ditemukan atau rusak.');
      }

      // Ambil pertanyaan dari localStorage atau API
      let questions = JSON.parse(localStorage.getItem('questions'));

      if (!questions || !Array.isArray(questions)) {
        const fetched = await fetchQuestionsByModuleId(this.modId);
        if (!Array.isArray(fetched)) {
          throw new Error('Gagal mengambil daftar pertanyaan.');
        }
        questions = fetched;
        localStorage.setItem('questions', JSON.stringify(questions)); // opsional
      }

      // Ekstrak dan ubah struktur
      const userAnswers = resultData.answers.map((a) => a.selected || []);
      const correctAnswers = resultData.answers.map((a) => a.correct || []);

      return {
        totalQuestions: resultData.totalQuestions || questions.length,
        score: resultData.score || 0,
        date: new Date(resultData.date).toLocaleDateString(),
        userAnswers,
        correctAnswers,
        questions,
      };
    } catch (error) {
      console.error('Error in getResultData():', error);
      return {
        error: true,
        message: error.message || 'Terjadi kesalahan saat mengambil hasil kuis',
      };
    }
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload._id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
