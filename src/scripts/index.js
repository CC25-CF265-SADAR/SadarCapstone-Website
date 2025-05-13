import '../styles/styles.css';
import App from './pages/app';

const app = new App({
  header: document.getElementById('header-first'),
  content: document.getElementById('main-content'),
});

window.addEventListener('hashchange', () => app.renderPage());
window.addEventListener('load', () => app.renderPage());
