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
        this.pageIndex,
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

  isQuizCompleted() {
    const currentTopic = this.moduleDetail.topics[this.currentTopicIndex];
    if (currentTopic.id === 'quiz_topic_id') {
      // Cek status quiz
      return this.userProgress.modulesProgress.some(moduleProgress => moduleProgress.checkQuiz);
    }
    return false;
  }

  async saveProgress() {
    const currentModuleId = this.moduleDetail.modId;

    // Ambil progress sebelumnya dari state
    const existingProgress = this.userProgress?.data?.modulesProgress?.find(
      (m) => m.moduleId === currentModuleId
    );

    const mergedProgress = this.moduleDetail.topics.map((topic, index) => {
      const topicId = topic.id;
      const alreadyCheckpointed = existingProgress?.topicsProgress?.find((t) => t.topicId === topicId)?.checkpoint;
      const nowCheckpoint = index <= this.currentTopicIndex;
      return {
        topicId,
        checkpoint: alreadyCheckpointed || nowCheckpoint, // ambil yang lebih "jauh"
      };
    });

    const checkQuiz = this.isQuizCompleted();

    try {
      await this.api.saveUserProgress({
        moduleId: currentModuleId,
        topicsProgress: mergedProgress,
        checkQuiz,
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
      await this.saveProgress();

      // Ambil ulang progress terbaru setelah simpan
      try {
        this.userProgress = await this.api.fetchUserProgress(this.moduleDetail.modId);
      } catch (err) {
        console.warn('Gagal memperbarui progress:', err.message);
        this.userProgress = null;
      }

      this.currentTopicIndex++;
      this.pageIndex = 1;
      const nextContentId = this.moduleDetail.topics[this.currentTopicIndex].contentId;
      this.content = await this.api.fetchContent(nextContentId);
    } else {
      await this.saveProgress();

      this.view.navigateToQuiz(this.moduleDetail.modId);
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
      this.pageIndex,
    );
  }

  async onPrevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
    } else if (this.currentTopicIndex > 0) {
      this.currentTopicIndex--;
      const prevContentId = this.moduleDetail.topics[this.currentTopicIndex].contentId;
      this.content = await this.api.fetchContent(prevContentId);
      this.pageIndex = this.content.pages.length;
    } else {
      return;
    }

    const currentContentId = this.moduleDetail.topics[this.currentTopicIndex].contentId;
    window.location.hash = `#/modul-belajar/${currentContentId}/pages${this.pageIndex}`;

    this.view.renderContent(this.content, this.pageIndex - 1);

    // Update sidebar dan footer TETAP pakai progress sebelumnya
    this.view.renderSidebar(
      this.moduleDetail,
      this.moduleDetail.topics[this.currentTopicIndex].id,
      this.userProgress, // tetap pakai yang lama
    );
    this.view.renderFooter(
      this.moduleTitle,
      this.currentTopicIndex,
      this.moduleDetail.topics.length,
      this.getNextTopicId(),
      this.pageIndex,
    );
  }
}