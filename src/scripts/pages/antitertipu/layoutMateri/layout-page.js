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
  async render() {
    return `
      <div class="relative min-h-screen bg-white flex flex-col">
        <header id="module-navbar" class="z-10"></header>

        <div class="flex-1 flex overflow-hidden transition-all duration-300">
          <!-- Sidebar container (toggleable with translate-x) -->
          <aside id="module-sidebar-wrapper" class="absolute top-16 left-0 w-64 transform -translate-x-full transition-transform duration-300 z-20 bg-white border-r border-[#DFF0F5] overflow-y-auto shadow-md rounded-r-2xl" style="height: calc(100vh - 8rem);">
            <!-- Sidebar content injected here -->
          </aside>

          <!-- Main content -->
          <main id="module-content" class="flex-1 max-h-screen overflow-y-auto transition-all duration-300 px-4 pt-4"></main>
        </div>

        <footer id="module-footer" class="bg-white border-t shadow-sm z-10"></footer>
      </div>
    `;
  }

  async afterRender() {
    try {
      // Ambil daftar modul dari API
      const modulesData = await fetchModules();

      if (!modulesData || modulesData.length === 0) {
        throw new Error('Tidak ada modul yang tersedia.');
      }

      // Ambil modul pertama sebagai default
      const module = modulesData[0];

      // Ambil detail modul dari API (topics dll)
      const moduleDetail = await fetchModuleDetail(module.id);

      // Ambil konten topik pertama (default)
      const firstTopic = moduleDetail.topics[0];
      const content = await fetchContent(firstTopic.contentId);

      // Render UI dengan data dari API, tidak mengubah susunan UI
      document.querySelector('#module-navbar').innerHTML = generateModuleNavbarTemplate(moduleDetail.title);
      document.querySelector('#module-sidebar-wrapper').innerHTML = generateModuleSidebarTemplate(moduleDetail, firstTopic.id);
      document.querySelector('#module-content').innerHTML = generateModuleContentTextTemplate(content);
      document.querySelector('#module-footer').innerHTML = generateModuleFooterTemplate(moduleDetail.title);

      // Setup sidebar toggle (fungsi sama seperti sebelumnya)
      const sidebarWrapper = document.querySelector('#module-sidebar-wrapper');
      const contentArea = document.querySelector('#module-content');

      document.querySelector('#toggleSidebar')?.addEventListener('click', () => {
        const isOpen = !sidebarWrapper.classList.contains('-translate-x-full');
        sidebarWrapper.classList.toggle('-translate-x-full');
        contentArea.classList.toggle('ml-64', !isOpen);
      });

      // Tombol back
      document.querySelector('#backBtn')?.addEventListener('click', () => {
        window.history.back();
      });

    } catch (err) {
      document.querySelector('#module-content').innerHTML = `<p class="text-center mt-20 text-red-500">Gagal memuat modul: ${err.message}</p>`;
    }
  }
}