import '../styles/styles.css';
import App from './pages/app';
import Camera from './utils/camera';
const app = new App({
  header: document.getElementById('header-first'),
  content: document.getElementById('main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  // Stop all active media
  Camera.stopAllStreams();
  console.log('hash changed to', location.hash);
});
window.addEventListener('load', () => app.renderPage());
