import {
  generateBreadcrumbTemplate,
  generateModuleDetailTemplate,
  generateModuleSylabusTemplate,
} from '../../../templates/template-module';
import { generateQuizFooterTemplate } from '../../../templates/template';
import ModuleDetailPresenter from './detailAt-presenter';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class ModuleDetailPage {
  constructor(moduleId) {
    this.moduleId = moduleId;
    this.presenter = new ModuleDetailPresenter(moduleId);
  }

  async render() {
    try {
      const moduleData = await this.presenter.getModuleData();
      const moduleSylabus = await this.presenter.getModuleDetail();
      const homeIcon = `
      <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
      </svg>
    `;
      const breadcrumbItems = [
        { name: 'Beranda', href: '#/', icon: homeIcon },
        { name: 'Overview', href: '#/module-overview' },
        { name: 'Detail Modul' },
      ];

      let firstContentId = moduleSylabus.topics[0].contentId;
      let startPage = 1;

      const progressArray = await this.presenter.getTopicProgressArray();
      const completedCount = progressArray.filter((p) => p === 100).length;
      const progress = Math.floor((completedCount / moduleSylabus.topics.length) * 100);

      const nextIncompleteTopicId = await this.presenter.getNextIncompleteTopicId();
      if (nextIncompleteTopicId) {
        const matched = moduleSylabus.topics.find((t) => t.id === nextIncompleteTopicId);
        if (matched) {
          firstContentId = matched.contentId;
          startPage = 1;
        }
      }
      if (!moduleData) {
        return `<p class="text-center text-red-500">Modul tidak ditemukan</p>`;
      }

      return `
        <section class="flex flex-col">
          <div class="mx-12 mt-8">
            ${generateBreadcrumbTemplate(breadcrumbItems)}
          </div>
          <div class="mx-14">
            ${generateModuleDetailTemplate(
              moduleData.title,
              moduleData.description,
              `/images/modules/details/${moduleData.thumbnail}`,
              progress, // untuk detail
              moduleData.color,
              firstContentId,
              startPage,
            )}
            <h1 data-aos="zoom-in" data-aos-delay="300" class="text-xl md:text-2xl font-semibold text-[#42A7C3] mt-10">Silabus Modul Pembelajaran</h1>
            ${generateModuleSylabusTemplate(
              moduleSylabus.title,
              moduleSylabus.topics,
              progressArray, // untuk per-topik di silabus
            )}
          </div>
          ${generateQuizFooterTemplate()}
        </section>
      `;
    } catch (error) {
      return `<p class="text-center text-red-500">Gagal memuat data modul: ${error.message}</p>`;
    }
  }

  async afterRender() {
    AOS.init({
      duration: 800,
      once: true,
    });
  }
}
