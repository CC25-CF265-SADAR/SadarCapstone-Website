import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { getAccessToken } from '../utils/auth';
import { generateNavbarTemplate, generateNavbarAuthTemplate } from '../templates/template';

class App {
  #content;
  #header;

  constructor({ header, content }) {
    this.#content = content;
    this.#header = header;
  }

  #setupNavigation(url) {
    const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].includes(url);
    const isModulePage = url.startsWith('/modul-belajar');

    if (isAuthPage || isModulePage) {
      this.#header.innerHTML = ''; // Hapus navbar default
    } else {
      const isLogin = !!getAccessToken();
      this.#header.innerHTML = `
        <nav>
          ${isLogin ? generateNavbarAuthTemplate() : generateNavbarTemplate()}
        </nav>
      `;
    }
  }


  async renderPage() {
    const url = getActiveRoute();
    const matchedRoute = routes[url] || routes['/404'];

    if (!matchedRoute) return;
    this.#setupNavigation(url);

    const page = matchedRoute();
    if (!page) return;

    this.#content.innerHTML = await page.render();
    page.afterRender?.();
  }
}

export default App;
