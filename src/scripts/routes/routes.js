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
  '/detail-module-penipuan-online': () => new ModuleDetailPage(),
};

export default routes;
