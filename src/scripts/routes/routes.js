import Homepage from '../pages/homepage/homepage-page';

const routes = {
  //"/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  //"/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/': () => new Homepage(),
};

export default routes;
