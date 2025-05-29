import {
  generateBreadcrumbTemplate,
  generateModuleDetailTemplate,
  generateModuleSylabusTemplate,
  generateVideoPlayer,
} from '../../../templates/template-module';
import { generateQuizFooterTemplate } from '../../../templates/template';
export default class ModuleDetailPage {
  async render() {
    return `
        <section class="flex flex-col">
          <div class="mx-12 mt-8">
              ${generateBreadcrumbTemplate()}
          </div>
          <div class="mx-14">
            ${generateModuleDetailTemplate()}
            <h1 class="text-xl md:text-2xl font-semibold text-[#42A7C3] mt-10">Silabus Modul Pembelajaran</h1>
            ${generateModuleSylabusTemplate()}
          </div>
          
          ${generateQuizFooterTemplate()}
        </section>
    `;
  }
}
