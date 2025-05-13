import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { generateNavbarTemplate } from '../template';

class App {
  #content;
  #header;

  constructor({ header, content }) {
    this.#content = content;
    this.#header = header;

    this.#setupNavigation();
  }

  #setupNavigation() {
    this.#header.innerHTML = `
      <nav>
        ${generateNavbarTemplate()}
      </nav>
    `;
  }

  async renderPage() {
    const url = getActiveRoute();
    const matchedRoute = routes[url] || routes['/404'];

    if (!matchedRoute) return;

    const page = matchedRoute();
    if (!page) return;

    this.#content.innerHTML = await page.render();
    page.afterRender?.();
  }
}

export default App;
