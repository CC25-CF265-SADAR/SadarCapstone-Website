export default class QuizResultPresenter {
  constructor(modId, questions) {
    this.modId = modId;
    this.questions = questions;
  }

  getResultData() {
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];

    const flatten = (array) => array.flat();

    // Normalisasi correctAnswers dan userAnswers
    const normalizedCorrectAnswers = correctAnswers.map(flatten);
    const normalizedUserAnswers = userAnswers.map(flatten);
    localStorage.setItem('correctAnswers', JSON.stringify(normalizedCorrectAnswers));
    localStorage.setItem('userAnswers', JSON.stringify(normalizedUserAnswers));

    const totalQuestions = this.questions.length;
    const correctCount = this.questions.reduce((acc, q, i) => {
      const correct = normalizedCorrectAnswers[i];
      const user = normalizedUserAnswers[i];
      const isCorrect = correct.every((answer) => user.includes(answer));

      return acc + (isCorrect ? 1 : 0);
    }, 0);

    const score = Math.round((correctCount / totalQuestions) * 100);
    const date = new Date().toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return { score, totalQuestions, userAnswers, correctAnswers, date };
  }

  clearData() {
    localStorage.removeItem('userAnswers');
    localStorage.removeItem('correctAnswers');
  }
}
