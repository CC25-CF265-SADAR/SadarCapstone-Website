import Homepage from '../pages/homepage/homepage-page';
import QuizPage from '../pages/tipumeter/quiz/quiz-page';

const routes = {
  //"/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  //"/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/': () => new Homepage(),
  '/quiz' : () => new QuizPage(),
};

export default routes;
