import {
  generateBreadcrumbTemplate,
  generateModuleDetailTemplate,
  generateModuleSylabusTemplate,
} from '../../../templates/template-module';
import { generateQuizFooterTemplate } from '../../../templates/template';
import ModuleDetailPresenter from './detailAt-presenter';

export default class ModuleDetailPage {
  constructor(moduleId) {
    this.moduleId = moduleId;
    this.presenter = new ModuleDetailPresenter(moduleId);
  }

  async render() {
    try {
      const moduleData = await this.presenter.getModuleData();
      const moduleSylabus = await this.presenter.getModuleDetail();
      const progress = await this.presenter.getUserProgress();

      if (!moduleData) {
        return `<p class="text-center text-red-500">Modul tidak ditemukan</p>`;
      }

      return `
        <section class="flex flex-col">
          <div class="mx-12 mt-8">
            ${generateBreadcrumbTemplate()}
          </div>
          <div class="mx-14">
            ${generateModuleDetailTemplate(
              moduleData.title,
              moduleData.description,
              `/images/modules/details/${moduleData.thumbnail}`,
              progress,
              moduleData.color,
            )}
            <h1 class="text-xl md:text-2xl font-semibold text-[#42A7C3] mt-10">Silabus Modul Pembelajaran</h1>
            ${generateModuleSylabusTemplate(moduleSylabus.title, moduleSylabus.topics, progress)}
          </div>
          ${generateQuizFooterTemplate()}
        </section>
      `;
    } catch (error) {
      return `<p class="text-center text-red-500">Gagal memuat data modul: ${error.message}</p>`;
    }
  }

  async afterender() {}
}
