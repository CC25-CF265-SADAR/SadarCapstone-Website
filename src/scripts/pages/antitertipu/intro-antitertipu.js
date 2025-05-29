import {
  generateBreadcrumbTemplate,
  generateModuleTemplate,
} from '../../templates/template-module';
import { generateFooterTemplate } from '../../templates/template';
import { fetchModules } from '../../data/api';

export default class ModuleIntroPage {
  async render() {
    return `
        <section class="flex flex-col mt-8">
            <div class="mx-12">
              ${generateBreadcrumbTemplate()}
            </div>
            <h1 class="font-semibold text-center text-2xl">Modul Pembelajaran AntiTertipu</h1>
            <h2 class="font-regular text-base text-center text-gray-500 mt-3 mb-10 px-5">Kenali berbagai modus penipuan online sebelum mereka mengenali Anda. Lindungi diri Anda dari ancaman digital yang bisa menyerang kapan saja.</h2>
            <div id="modules-container" class="flex flex-row flex-wrap justify-evenly items-center gap-y-10 mb-15">
                <!-- Modul -->
            </div>
            ${generateFooterTemplate()}
        </section>
    `;
  }

  async afterRender() {
    try {
      const data = await fetchModules();
      const container = document.getElementById('modules-container');

      container.innerHTML = data
        .map((modul) =>
          generateModuleTemplate({
            imageSrc: `images/modules/${modul.thumbnail}`,
            link: `#/module-overview/detail-module-${modul.id}`,
            title: modul.title,
            description: modul.description,
          }),
        )
        .join('');
    } catch (error) {
      console.error('Gagal memuat modul:', error);
      const container = document.getElementById('modules-container');
      container.innerHTML = '<p class="text-center text-red-500">Gagal memuat modul.</p>';
    }
  }
}
