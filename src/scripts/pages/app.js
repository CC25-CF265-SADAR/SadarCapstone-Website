import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { generateNavbarTemplate } from '../template';

class App {
  #content;
  #header;

  constructor({ header, content }) {
    this.#content = content;
    this.#header = header;
  }

  #setupNavigation(url) {
    if (
      url === '/login' ||
      url === '/register' ||
      url === '/forgot-password' ||
      url === '/reset-password'
    ) {
      this.#header.innerHTML = '';
    } else {
      this.#header.innerHTML = `
      <nav>
        ${generateNavbarTemplate()}
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
