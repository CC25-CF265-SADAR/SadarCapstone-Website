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
          <aside id="module-sidebar-wrapper"
            class="fixed top-16 left-0 w-full sm:w-64 transform -translate-x-full transition-transform duration-300 z-30 bg-white border-r border-[#DFF0F5] overflow-y-auto shadow-md rounded-r-2xl h-[calc(100vh-8rem)]">
          </aside>

          <!-- Konten utama -->
          <main id="module-content" class="flex-1 overflow-y-auto px-4 pt-4">
            <div id="module-content-inner"></div>
          </main>
        </div>

        <!-- Modal sesi habis -->
        <div id="session-expired-modal" class="fixed inset-0 z-50 hidden bg-gray-200 bg-opacity-40 flex items-center justify-center">
          <div class="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
            <h2 class="text-lg font-semibold text-gray-900">Sesi Anda telah berakhir</h2>
              <p class="text-sm text-gray-600 mt-2">Harap masuk lagi.</p>
              <div class="mt-4">
                <button id="ok-button" class="px-4 py-2 bg-[#42A7C3] hover:bg-[#2C6F82] text-white rounded focus:outline-none">
                OK
                </button>
              </div>
          </div>
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
      
      // Menambahkan listener untuk klik pada sidebar
      sidebar.addEventListener('click', (event) => {
        const listItem = event.target.closest('li[data-content-id]');
        if (!listItem) return;

        const contentId = listItem.getAttribute('data-content-id');
        if (contentId && contentId !== this.contentId) {
          this.contentId = contentId;
          this.pageIndex = 1;

          // Menutup sidebar jika sudah pindah halaman
          this.handleSidebarToggle(); // Menutup sidebar saat topik baru dipilih

          this.presenter.loadContent(contentId, 1);
        }
      });
    }
  }

  handleSidebarToggle() {
    const sidebarWrapper = document.querySelector('#module-sidebar-wrapper');
    const contentArea = document.querySelector('#module-content');
    if (!sidebarWrapper || !contentArea) return;

    const isMobile = window.innerWidth < 640; // Tailwind sm breakpoint
    const isHidden = sidebarWrapper.classList.contains('-translate-x-full');

    if (isHidden) {
      sidebarWrapper.classList.remove('-translate-x-full');
      if (!isMobile) contentArea.classList.add('ml-64');
    } else {
      sidebarWrapper.classList.add('-translate-x-full');
      if (!isMobile) contentArea.classList.remove('ml-64');
    }
  }

  renderContent(content, currentPageIndex) {
    const container = document.querySelector('#module-content-inner');
    if (!container) return;

    const isIntroQuiz = content.title?.toLowerCase().includes('kuis evaluasi');
    if (isIntroQuiz) {
      container.innerHTML = generateIntroQuizTemplate(this.presenter.moduleTitle);
      document.querySelector('#start-quiz-button')?.addEventListener('click', () => {
        const modId = this.presenter.moduleDetail?.modId;
        if (modId) window.location.hash = `#/quiz-modul/${modId}`;
      });
      return;
    }

    // Modifikasi bagian konten dengan kelas responsif
    container.innerHTML = `
      <div class="text-sm sm:text-base md:text-lg lg:text-xl">
        ${generateModuleContentTextTemplate(content, currentPageIndex)}
      </div>
    `;
  }

  renderSessionExpired() {
    const modal = document.querySelector('#session-expired-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    const okBtn = document.querySelector('#ok-button');
    okBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = '/#/login';
    });
  }

  renderFooter(moduleTitle, currentIndex, total, nextTopicId, pageIndex) {
    const footer = document.querySelector('#module-footer');
    const isIntroQuiz = this.presenter.content?.title?.toLowerCase().includes('kuis evaluasi');
    const isFirstPage = currentIndex === 0 && pageIndex === 1;

    if (footer) {
      footer.innerHTML = generateModuleFooterTemplate(
        this.presenter.content.title,
        isIntroQuiz,      // hideNext
        isFirstPage        // hidePrev
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
    const toggleButton = document.querySelector('#toggleSidebar');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        this.handleSidebarToggle(); // Panggil handleSidebarToggle saat tombol toggle ditekan
      });
    }
  }

  addEventListeners() {
    this.addSidebarToggleListener();  // Pastikan toggle tetap berfungsi setelah pindah halaman

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