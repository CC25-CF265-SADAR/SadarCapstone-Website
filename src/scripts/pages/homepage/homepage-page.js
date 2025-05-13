import { generateFooterTemplate } from '../../template.js';
import HomePresenter from './homepage-presenter.js';

export default class Homepage {
  async render() {
    return `
            <section class="hero-image">
                //isi disini...
            </section>

            <section class="info-1">
                <p>Ini info 1</p>
                <p>Halo semuanya apa kabar</p>
            </section>

            <section class="info-2">
                //isi disini...
            </section>
            
            <section class="sadar-feature">
                //isi disini...
            </section>
            
            <section class="leaderboard">
                //isi disini...
            </section>
            
            <section class="faq">
                //isi disini...
            </section>

            ${generateFooterTemplate()}
        `;
  }

  async afterRender() {
    //isi disini..
  }
}
