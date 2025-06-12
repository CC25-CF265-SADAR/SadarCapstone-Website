import {
  generateBreadcrumbTemplate,
  generateModuleTemplate,
} from '../../templates/template-module';
import { generateFooterTemplate } from '../../templates/template';
import { fetchModules } from '../../data/api';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class ModuleIntroPage {
  async render() {
    const homeIcon = `
      <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
      </svg>
    `;
    const breadcrumbItems = [
      { name: 'Beranda', href: '#/', icon: homeIcon },
      { name: 'Overview', href: '#/module-overview' },
    ];
    return `
        <section class="flex flex-col mt-8">
            <div class="mx-12">
              ${generateBreadcrumbTemplate(breadcrumbItems)}
            </div>
            <h1 data-aos="zoom-in" data-aos-delay="300" class="font-semibold text-center text-xl md:text-2xl">Modul Pembelajaran AntiTertipu</h1>
            <h2 data-aos="zoom-in" data-aos-delay="300" class="font-regular text-base text-center text-gray-500 mt-3 mb-10 px-5">Kenali berbagai modus penipuan online sebelum mereka mengenali Anda. Lindungi diri Anda dari ancaman digital yang bisa menyerang kapan saja.</h2>
            <div data-aos="zoom-in" data-aos-delay="300" id="modules-container" class="flex flex-row flex-wrap justify-evenly items-center gap-y-5 md:gap-y-10 mb-15">
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
    AOS.init({
      duration: 800,
      once: true,
    });
  }
}
