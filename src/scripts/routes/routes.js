import Homepage from '../pages/homepage/homepage-page';
import QuizPage from '../pages/tipumeter/quiz/quiz-page';
import Result from '../pages/tipumeter/result/result-page';
import QuizIntroPage from '../pages/tipumeter/quiz/quiz-intro-page';

const routes = {
  //"/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  //"/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/': () => new Homepage(),
  '/quiz': () => new QuizIntroPage(),
  '/quiz/take-quiz': () => new QuizPage(),
  '/result': () => new Result(),
};

export default routes;
