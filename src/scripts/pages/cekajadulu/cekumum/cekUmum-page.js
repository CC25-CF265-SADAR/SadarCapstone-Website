import { generateTabCekAjaDuluTemplate, markCurrentTabActive } from '../../../templates/template';

export default class CekUmumPage {
  async render() {
    return `
    <section class="mt-5 mx-12">
      <div id="tab-container"></div>
    </section>
        //isi template disini
    `;
  }

  async afterRender() {
    document.getElementById('tab-container').innerHTML = generateTabCekAjaDuluTemplate();
    markCurrentTabActive();
  }
}
