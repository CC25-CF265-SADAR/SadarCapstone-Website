import '../styles/styles.css';
import App from './pages/app';

const app = new App({
  header: document.getElementById('header-first'),
  content: document.getElementById('main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  console.log('hash changed to', location.hash);
});
window.addEventListener('load', () => app.renderPage());
