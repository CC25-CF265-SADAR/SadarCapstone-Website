import {
  generateModuleNavbarTemplate,
  generateModuleSidebarTemplate,
  generateModuleContentTextTemplate,
  generateModuleFooterTemplate,
} from '../../../templates/template-module.js';

export default class ModuleLayoutPage {
  async render() {
    return `
      <div class="relative min-h-screen bg-white flex flex-col">
        <header id="module-navbar" class="z-10"></header>

        <div class="flex-1 flex overflow-hidden transition-all duration-300">
          <!-- Sidebar container (toggleable with translate-x) -->
          <aside id="module-sidebar-wrapper" class="absolute top-16 left-0 w-64 transform -translate-x-full transition-transform duration-300 z-20 bg-white border-r border-[#DFF0F5] overflow-y-auto shadow-md rounded-r-2xl" style="height: calc(100vh - 8rem);"
          >

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
      const dummyModule = {
        title: 'Modul Penipuan Online',
        topics: [
          { id: 't1', title: 'Pengantar', contentId: 'dummy-1', checkpoint: true },
          { id: 't2', title: 'Jenis Penipuan', contentId: 'dummy-2', checkpoint: false },
        ],
      };

      const dummyContent = {
        id: 'dummy-1',
        title: 'Pengantar Penipuan Online',
        content: 'Ini adalah isi teks pembuka modul.',
        videoURL: '',
      };

      document.querySelector('#module-navbar').innerHTML = generateModuleNavbarTemplate(dummyModule.title);
      document.querySelector('#module-sidebar-wrapper').innerHTML = generateModuleSidebarTemplate(dummyModule, dummyContent.id);
      document.querySelector('#module-content').innerHTML = generateModuleContentTextTemplate(dummyContent);
      document.querySelector('#module-footer').innerHTML = generateModuleFooterTemplate(dummyModule, dummyContent);

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
    } catch (err) {
      document.querySelector('#module-content').innerHTML = `<p class="text-center mt-20 text-red-500">Gagal memuat modul: ${err.message}</p>`;
    }
  }
}