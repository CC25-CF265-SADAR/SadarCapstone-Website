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

  matchRoute(url, routes) {
    for (const routePattern in routes) {
      const pattern = routePattern.replace(/:[^\s/]+/g, '([^/]+)');
      const regex = new RegExp(`^${pattern}$`);
      const match = url.match(regex);
      if (match) {
        const params = match.slice(1);
        return { routeFunc: routes[routePattern], params };
      }
    }
    return null;
  }

  async renderPage() {
    const url = getActiveRoute();

    const matched = this.matchRoute(url, routes);

    if (!matched) {
      this.#content.innerHTML = '<p>Halaman tidak ditemukan</p>';
      return;
    }

    this.#setupNavigation(url);

    const page = matched.params.length ? matched.routeFunc(...matched.params) : matched.routeFunc();

    if (!page) return;

    this.#content.innerHTML = await page.render();
    await page.afterRender?.();
  }
}

export default App;
