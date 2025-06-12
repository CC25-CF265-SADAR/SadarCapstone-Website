import { handleQuizResult } from '../../../utils/score-manager';

export default class ResultPresenter {
  init({ userAnswers, correctAnswers }) {
    handleQuizResult(userAnswers, correctAnswers);
  }
}