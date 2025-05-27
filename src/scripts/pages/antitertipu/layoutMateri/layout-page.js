import {
  generateModuleNavbarTemplate,
  generateModuleSidebarTemplate,
  generateModuleContentTextTemplate,
  generateModuleFooterTemplate,
} from '../../../templates/template-module.js';

import { fetchModuleDetail, fetchContent, fetchUserProgress } from '../../../data/api.js';

export default class ModuleLayoutPage {
  constructor(params) {
    this.moduleId = params.id;
    this.currentContentId = params.contentId || null;
  }

  async render() {
    return `
      <div class="relative min-h-screen bg-white flex flex-col">
        <header id="module-navbar" class="z-10"></header>

        <div class="flex-1 flex overflow-hidden transition-all duration-300">
          <!-- Sidebar container (toggleable with translate-x) -->
          <aside id="module-sidebar-wrapper" class="absolute top-19 left-0 w-64 transform -translate-x-full transition-transform duration-300 z-20 h-[calc(100vh-8rem)] bg-white border-r border-[#DFF0F5] overflow-y-auto shadow-md rounded-r-2xl">
            <!-- Sidebar content injected here -->
          </aside>

          <!-- Main content -->
          <main id="module-content" class="flex-1 overflow-y-auto transition-all duration-300 px-4 pt-4"></main>
        </div>

        <footer id="module-footer" class="bg-white border-t shadow-sm z-10"></footer>
      </div>
    `;
  }

  async afterRender() {
    try {
      const moduleDetail = await fetchModuleDetail(this.moduleId);
      const progress = await fetchUserProgress(this.moduleId).catch(() => null);

      if (progress) {
        moduleDetail.topics = moduleDetail.topics.map(topic => {
          const matched = progress.topicsProgress.find(p => p.id === topic.id);
          return {
            ...topic,
            checkpoint: matched ? matched.checkpoint : false,
          };
        });
      }

      const firstTopic = moduleDetail.topics[0];
      const contentId = this.currentContentId || firstTopic.contentId;
      const content = await fetchContent(contentId);

      document.querySelector('#module-navbar').innerHTML = generateModuleNavbarTemplate(moduleDetail.title);
      document.querySelector('#module-sidebar-wrapper').innerHTML = generateModuleSidebarTemplate(moduleDetail, content.id);
      document.querySelector('#module-content').innerHTML = generateModuleContentTextTemplate(content);
      document.querySelector('#module-footer').innerHTML = generateModuleFooterTemplate(moduleDetail, content);

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
      document.querySelector('#module-content').innerHTML = '<p class="text-center mt-20 text-red-500">Gagal memuat modul: ${err.message}</p>';
    }
  }
}