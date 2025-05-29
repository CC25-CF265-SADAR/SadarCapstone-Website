import {
  generateModuleNavbarTemplate,
  generateModuleSidebarTemplate,
  generateModuleContentTextTemplate,
  generateModuleFooterTemplate,
} from '../../../templates/template-module.js';

import {
  fetchModules,
  fetchModuleDetail,
  fetchContent,
} from '../../../data/api.js';


export default class ModuleLayoutPage {
  #currentPageIndex = 0;
  #content = null;

  async render() {
    return `
      <div class="relative min-h-screen bg-white flex flex-col">
        <header id="module-navbar" class="z-10"></header>
        <div class="flex-1 flex overflow-hidden transition-all duration-300">
          <aside id="module-sidebar-wrapper" class="absolute top-16 left-0 w-64 transform -translate-x-full transition-transform duration-300 z-20 bg-white border-r border-[#DFF0F5] overflow-y-auto shadow-md rounded-r-2xl" style="height: calc(100vh - 8rem);"></aside>
          <main id="module-content" class="flex-1 max-h-screen overflow-y-auto transition-all duration-300 px-4 pt-4"></main>
        </div>
        <footer id="module-footer" class="bg-white border-t shadow-sm z-10"></footer>
      </div>
    `;
  }

  async afterRender() {
    try {
      const modulesData = await fetchModules();
      if (!modulesData || modulesData.length === 0) throw new Error('Tidak ada modul yang tersedia.');

      const module = modulesData[0];
      const moduleDetail = await fetchModuleDetail(module.id);
      const firstTopic = moduleDetail.topics[0];
      this.#content = await fetchContent(firstTopic.contentId);

      document.querySelector('#module-navbar').innerHTML = generateModuleNavbarTemplate(moduleDetail.title);
      document.querySelector('#module-sidebar-wrapper').innerHTML = generateModuleSidebarTemplate(moduleDetail, firstTopic.id);

      this.renderPageContent();

      document.querySelector('#module-footer').innerHTML = generateModuleFooterTemplate(moduleDetail.title);

      const sidebarWrapper = document.querySelector('#module-sidebar-wrapper');
      const contentArea = document.querySelector('#module-content');

      document.querySelector('#toggleSidebar')?.addEventListener('click', () => {
        const isOpen = !sidebarWrapper.classList.contains('-translate-x-full');
        sidebarWrapper.classList.toggle('-translate-x-full');
        contentArea.classList.toggle('ml-64', !isOpen);
      });

      document.querySelector('#backBtn')?.addEventListener('click', () => {
        window.history.back();
      });

      // Event listener untuk tombol navigasi halaman konten
      document.querySelector('#module-content').addEventListener('click', (event) => {
        if (event.target.id === 'prev-page' && this.#currentPageIndex > 0) {
          this.#currentPageIndex--;
          this.renderPageContent();
        } else if (event.target.id === 'next-page' && this.#currentPageIndex < this.#content.pages.length - 1) {
          this.#currentPageIndex++;
          this.renderPageContent();
        }
      });

    } catch (err) {
      document.querySelector('#module-content').innerHTML = `<p class="text-center mt-20 text-red-500">Gagal memuat modul: ${err.message}</p>`;
    }
  }

  renderPageContent() {
    document.querySelector('#module-content').innerHTML = generateModuleContentTextTemplate(this.#content, this.#currentPageIndex);
  }
}