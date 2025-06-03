import {
  generateLinkCheckTemplate,
  generateTabCekAjaDuluTemplate,
  markCurrentTabActive,
} from '../../../templates/template';

export default class CekLinkPage {
  async render() {
    return `
    <section class="mt-5 mx-12">
      <div id="tab-container"></div>
    </section>
        ${generateLinkCheckTemplate()}
    `;
  }

  async afterRender() {
    document.getElementById('tab-container').innerHTML = generateTabCekAjaDuluTemplate();
    markCurrentTabActive();
  }
}
