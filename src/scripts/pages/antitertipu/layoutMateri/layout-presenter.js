export default class ModuleLayoutPresenter {
  constructor(view, api) {
    this.view = view;
    this.api = api;

    this.currentTopicIndex = 0;
    this.pageIndex = 1; // halaman saat ini (1-based)
    this.moduleDetail = null;
    this.content = null;
    this.moduleTitle = '';
    this.userProgress = null;
  }

  async init(contentId, pageIndex = 1) {
    try {
      const modules = await this.api.fetchModules();
      if (!modules.length) throw new Error('Tidak ada modul tersedia');

      // Cari modul dan topic sesuai contentId
      let foundModule = null;
      let topicIndex = -1;

      for (const module of modules) {
        const detail = await this.api.fetchModuleDetail(module.id);
        const index = detail.topics.findIndex((topic) => topic.contentId === contentId);
        if (index !== -1) {
          this.moduleTitle = module.title;
          this.moduleDetail = detail;
          this.currentTopicIndex = index;
          foundModule = module;
          break;
        }
      }
      if (!foundModule) throw new Error(`Konten dengan ID "${contentId}" tidak ditemukan`);

      this.pageIndex = pageIndex;

      try {
        this.userProgress = await this.api.fetchUserProgress(this.moduleDetail.modId);
      } catch (err) {
        console.warn('Gagal mengambil progress:', err.message);
        this.userProgress = null;
      }

      this.content = await this.api.fetchContent(contentId);

      this.view.renderSidebar(
        this.moduleDetail,
        this.moduleDetail.topics[this.currentTopicIndex].id,
        this.userProgress,
      );
      this.view.renderFooter(
        this.moduleTitle,
        this.currentTopicIndex,
        this.moduleDetail.topics.length,
        this.getNextTopicId(),
      );
      this.view.renderNavbar(this.moduleTitle);
      this.view.renderContent(this.content, this.pageIndex - 1);
    } catch (err) {
      this.view.showError(err.message);
    }
  }

  getNextTopicId() {
    if (this.currentTopicIndex + 1 < this.moduleDetail.topics.length) {
      return this.moduleDetail.topics[this.currentTopicIndex + 1].id;
    }
    return null;
  }

  async saveProgress() {
    const progressPayload = this.moduleDetail.topics.map((topic, index) => ({
      topicId: topic.id,
      checkpoint: index <= this.currentTopicIndex,
    }));

    try {
      await this.api.saveUserProgress({
        moduleId: this.moduleDetail.modId,
        topicsProgress: progressPayload,
      });
    } catch (err) {
      console.error('Gagal menyimpan progress:', err.message);
    }
  }

  async onNextPage() {
    const totalPages = this.content.pages.length;

    if (this.pageIndex < totalPages) {
      // Masih ada halaman berikutnya di konten ini
      this.pageIndex++;
    } else if (this.currentTopicIndex + 1 < this.moduleDetail.topics.length) {
      // Pindah ke konten berikutnya, mulai dari halaman 1
      this.currentTopicIndex++;
      this.pageIndex = 1;

      const nextContentId = this.moduleDetail.topics[this.currentTopicIndex].contentId;
      this.content = await this.api.fetchContent(nextContentId);
    } else {
      // Semua konten habis, lanjut ke quiz
      this.view.navigateToQuiz();
      return;
    }

    // Update URL
    const currentContentId = this.moduleDetail.topics[this.currentTopicIndex].contentId;
    window.location.hash = `#/modul-belajar/${currentContentId}/pages${this.pageIndex}`;

    // Render ulang konten
    this.view.renderContent(this.content, this.pageIndex - 1);

    // Update sidebar dan footer
    this.view.renderSidebar(
      this.moduleDetail,
      this.moduleDetail.topics[this.currentTopicIndex].id,
      this.userProgress,
    );
    this.view.renderFooter(
      this.moduleTitle,
      this.currentTopicIndex,
      this.moduleDetail.topics.length,
      this.getNextTopicId(),
    );

    await this.saveProgress();
  }

  async onPrevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
    } else if (this.currentTopicIndex > 0) {
      // Pindah ke konten sebelumnya dan halaman terakhirnya
      this.currentTopicIndex--;
      const prevContentId = this.moduleDetail.topics[this.currentTopicIndex].contentId;
      this.content = await this.api.fetchContent(prevContentId);
      this.pageIndex = this.content.pages.length;
    } else {
      // Sudah di halaman pertama konten pertama, bisa kembali atau tidak lakukan apa-apa
      return;
    }

    // Update URL
    const currentContentId = this.moduleDetail.topics[this.currentTopicIndex].contentId;
    window.location.hash = `#/modul-belajar/${currentContentId}/pages${this.pageIndex}`;

    // Render ulang konten
    this.view.renderContent(this.content, this.pageIndex - 1);

    // Update sidebar dan footer
    this.view.renderSidebar(
      this.moduleDetail,
      this.moduleDetail.topics[this.currentTopicIndex].id,
      this.userProgress,
    );
    this.view.renderFooter(
      this.moduleTitle,
      this.currentTopicIndex,
      this.moduleDetail.topics.length,
      this.getNextTopicId(),
    );

    await this.saveProgress();
  }
}
