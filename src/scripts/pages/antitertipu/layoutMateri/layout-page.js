import {
  generateModuleNavbarTemplate,
  generateModuleSidebarTemplate,
  generateModuleContentTextTemplate,
  generateModuleFooterTemplate,
  generateIntroQuizTemplate,
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
        <!-- Navbar sticky -->
        <header id="module-navbar" class="sticky top-0 z-30 bg-white shadow-md"></header>
        
        <!-- Container utama -->
        <div class="flex-1 flex overflow-hidden" style="padding-bottom: 80px"> <!-- Beri space untuk footer -->
          <!-- Sidebar (tidak diubah dari yang sudah bekerja) -->
          <aside id="module-sidebar-wrapper" class="absolute top-16 left-0 w-64 transform -translate-x-full transition-transform duration-300 z-20 bg-white border-r border-[#DFF0F5] overflow-y-auto shadow-md rounded-r-2xl" style="height: calc(100vh - 8rem);"></aside>
          
          <!-- Konten utama -->
          <main id="module-content" class="flex-1 overflow-y-auto px-4 pt-4"></main>
        </div>
        
        <!-- Footer fixed di bawah -->
        <footer id="module-footer" class="fixed bottom-0 left-0 right-0 bg-white shadow-sm z-20 h-20"></footer>
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
    if (!contentArea) return;

    const isIntroQuiz = content.title?.toLowerCase().includes('kuis evaluasi');

    if (isIntroQuiz) {
      contentArea.innerHTML = generateIntroQuizTemplate(this.moduleTitle);

      // Aktifkan tombol setelah render
      document.querySelector('#start-quiz-button')?.addEventListener('click', () => {
        const modId = this.presenter.moduleDetail?.modId;
        if (modId) {
          window.location.hash = `#/quiz-modul/${modId}`;
        } else {
          console.error('Module ID tidak ditemukan untuk quiz');
        }
      });

      return; // STOP, jangan render konten biasa!
    }

    // Konten biasa
    contentArea.innerHTML = generateModuleContentTextTemplate(content, currentPageIndex);
  }

  renderFooter(moduleTitle, currentIndex, total, nextTopicId) {
    const footer = document.querySelector('#module-footer');

    const isIntroQuiz = this.presenter.content?.title?.toLowerCase().includes('kuis evaluasi');

    if (footer) {
      footer.innerHTML = generateModuleFooterTemplate(
        this.presenter.content.title,
        isIntroQuiz // ini nilai untuk hideNext
      );
    }
  }

  showError(message) {
    const contentArea = document.querySelector('#module-content');
    if (contentArea) {
      contentArea.innerHTML = `<p class="text-center mt-20 text-red-500">Gagal memuat modul: ${message}</p>`;
    }
  }

  navigateToQuiz(modId) {
    window.location.href = `#/quiz-modul/${modId}`; // Kirim modId ke URL
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
      const moduleId = this.presenter.moduleDetail?.modId;
      if (moduleId) {
        window.location.hash = `#/module-overview/detail-module-${moduleId}`;
      } else {
        console.error('Module ID tidak ditemukan');
      }
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
