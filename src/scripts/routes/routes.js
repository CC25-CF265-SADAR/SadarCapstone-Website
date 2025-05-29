import Homepage from '../pages/homepage/homepage-page';
import QuizPage from '../pages/tipumeter/quiz/quiz-page';
import Result from '../pages/tipumeter/result/result-page';
import QuizIntroPage from '../pages/tipumeter/quiz/quiz-intro-page';
import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';
import ForgotPasswordPage from '../pages/auth/forgot-password/password-page';
import ResetPasswordPage from '../pages/auth/reset-password/reset-page';
import ModuleIntroPage from '../pages/antitertipu/intro-antitertipu';
import ModuleDetailPage from '../pages/antitertipu/detailModul/detailAt-page';
import ModuleLayoutPage from '../pages/antitertipu/layoutMateri/layout-page';
import QuizMateriPage from '../pages/antitertipu/quizMateri/QuizMateri-page';
import QuizResultModulePage from '../pages/antitertipu/hasilQuiz/HQMateri-page';

const routes = {
  '/login': () => new LoginPage(),
  '/register': () => new RegisterPage(),
  '/forgot-password': () => new ForgotPasswordPage(),
  '/reset-password': () => new ResetPasswordPage(),
  '/': () => new Homepage(),
  '/quiz': () => new QuizIntroPage(),
  '/quiz/take-quiz': () => new QuizPage(),
  '/result': () => new Result(),
  '/module-overview': () => new ModuleIntroPage(),
  '/module-overview/detail-module-:moduleId': (moduleId) => new ModuleDetailPage(moduleId),
  '/modul-belajar': () => new ModuleLayoutPage(),
  '/quiz-modul': () => new QuizMateriPage(),
<<<<<<< HEAD
  '/result-module': () => new HasilQuizMateri(),
=======
  '/result-module': () => new QuizResultModulePage(), 
>>>>>>> 17b979901a2b5c88a6ed217365c380315e55e6b1
};

export default routes;
