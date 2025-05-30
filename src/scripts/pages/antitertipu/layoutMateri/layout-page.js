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
  fetchUserProgress,
  saveUserProgress,
} from '../../../data/api.js';

import ModuleLayoutPresenter from './layout-presenter.js';

export default class ModuleLayoutPage {
  constructor(contentId, pageIndex = 1) {
    this.contentId = contentId;
    this.pageIndex = pageIndex;
    this.presenter = new ModuleLayoutPresenter(this, {
      fetchModules,
      fetchModuleDetail,
      fetchContent,
      saveUserProgress,
      fetchUserProgress,
    });
  }

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
    await this.presenter.init(this.contentId, this.pageIndex);
    this.addEventListeners();
  }

  renderNavbar(moduleTitle) {
    const navbar = document.querySelector('#module-navbar');
    if (navbar) navbar.innerHTML = generateModuleNavbarTemplate(moduleTitle);
  }

  renderSidebar(moduleDetail, currentTopicId, userProgress = null) {
    const sidebar = document.querySelector('#module-sidebar-wrapper');
    if (sidebar) {
      sidebar.innerHTML = generateModuleSidebarTemplate(moduleDetail, currentTopicId, userProgress);
      this.addSidebarToggleListener();
    }
  }

  renderContent(content, currentPageIndex) {
    const contentArea = document.querySelector('#module-content');
    if (contentArea)
      contentArea.innerHTML = generateModuleContentTextTemplate(content, currentPageIndex);
  }

  renderFooter(moduleTitle, currentIndex, total, nextTopicId) {
    const footer = document.querySelector('#module-footer');
    if (footer) {
      footer.innerHTML = generateModuleFooterTemplate(
        this.presenter.content.title,  
        currentIndex,
        total,
        nextTopicId
      );
    }
  }

  showError(message) {
    const contentArea = document.querySelector('#module-content');
    if (contentArea) {
      contentArea.innerHTML = `<p class="text-center mt-20 text-red-500">Gagal memuat modul: ${message}</p>`;
    }
  }

  navigateToQuiz() {
    window.location.href = '#/quiz-modul';
  }

  addSidebarToggleListener() {
    document.querySelector('#toggleSidebar')?.addEventListener('click', () => {
      const sidebarWrapper = document.querySelector('#module-sidebar-wrapper');
      const contentArea = document.querySelector('#module-content');
      if (!sidebarWrapper || !contentArea) return;

      const isHidden = sidebarWrapper.classList.contains('-translate-x-full');

      if (isHidden) {
        sidebarWrapper.classList.remove('-translate-x-full');
        contentArea.classList.add('ml-64'); 
      } else {
        sidebarWrapper.classList.add('-translate-x-full');
        contentArea.classList.remove('ml-64'); 
      }
    });
  }

  addEventListeners() {
    this.addSidebarToggleListener();

    document.querySelector('#backBtn')?.addEventListener('click', () => {
      window.history.back();
    });

    document.querySelector('#module-footer')?.addEventListener('click', (event) => {
      if (event.target.closest('#next-button')) {
        this.presenter.onNextPage();
      } else if (event.target.closest('#prev-button')) {
        this.presenter.onPrevPage();
      }
    });
  }
}
