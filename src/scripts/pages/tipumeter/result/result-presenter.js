import { handleQuizResult } from '../utils/score_manager';

export default class ResultPresenter {
  init({ userAnswers, correctAnswers }) {
    handleQuizResult(userAnswers, correctAnswers);
  }
};