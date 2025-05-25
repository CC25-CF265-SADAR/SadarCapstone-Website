import {
  generateModuleDetailTemplate,
  generateModuleSylabusTemplate,
} from '../../../templates/template-module';

export default class ModuleDetailPage {
  async render() {
    return `
        <section class="flex flex-col items-center mt-5">
             ${generateModuleDetailTemplate()}
             ${generateModuleSylabusTemplate()}
        </section>
    `;
  }
}
