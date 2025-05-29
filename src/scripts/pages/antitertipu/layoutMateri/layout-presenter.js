export default class ModuleLayoutPresenter {
  constructor(view, api) {
    this.view = view;
    this.api = api;
    this.currentTopicIndex = 0;
    this.moduleDetail = null;
    this.content = null;
    this.moduleTitle = '';
  }

  async init() {
    try {
      const modules = await this.api.fetchModules();
      if (!modules.length) throw new Error('Tidak ada modul tersedia');
      
      const module = modules[0];
      this.moduleTitle = module.title;

      this.moduleDetail = await this.api.fetchModuleDetail(module.id);

      try {
        this.userProgress = await this.api.fetchUserProgress(module.id);
      } catch (err) {
        console.warn('Gagal mengambil progress:', err.message);
        this.userProgress = null;
      }

      await this.loadTopicContent(this.currentTopicIndex);

      this.view.renderSidebar(this.moduleDetail, this.moduleDetail.topics[this.currentTopicIndex].id, this.userProgress);
      this.view.renderFooter(
        this.moduleTitle,
        this.currentTopicIndex,
        this.moduleDetail.topics.length,
        this.getNextTopicId()
      );
      this.view.renderNavbar(this.moduleTitle);

    } catch (err) {
      this.view.showError(err.message);
    }
  }

  async loadTopicContent(topicIndex) {
    const topic = this.moduleDetail.topics[topicIndex];
    this.content = await this.api.fetchContent(topic.contentId);
    this.view.renderContent(this.content, 0);
    this.currentTopicIndex = topicIndex;
  }

  getNextTopicId() {
    if (this.currentTopicIndex + 1 < this.moduleDetail.topics.length) {
      return this.moduleDetail.topics[this.currentTopicIndex + 1].id;
    }
    return null;
  }

  // Simpan progress di backend sesuai topik yang sedang dibuka
  async saveProgress() {
    // Sesuaikan payload ke format backend:
    const progressPayload = this.moduleDetail.topics.map((topic, index) => ({
      topicId: topic.id,
      checkpoint: index <= this.currentTopicIndex,  // gunakan 'checkpoint' sesuai backend
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

  async onNextTopic() {
    if (this.currentTopicIndex + 1 < this.moduleDetail.topics.length) {
      await this.loadTopicContent(this.currentTopicIndex + 1);
      this.view.renderSidebar(this.moduleDetail, this.moduleDetail.topics[this.currentTopicIndex].id, this.userProgress);
      this.view.renderFooter(this.moduleTitle, this.currentTopicIndex, this.moduleDetail.topics.length, this.getNextTopicId());
      await this.saveProgress();
    } else {
      this.view.navigateToQuiz();
    }
  }

  async onPrevTopic() {
    if (this.currentTopicIndex > 0) {
      await this.loadTopicContent(this.currentTopicIndex - 1);
      this.view.renderSidebar(this.moduleDetail, this.moduleDetail.topics[this.currentTopicIndex].id, this.userProgress);
      this.view.renderFooter(this.moduleTitle, this.currentTopicIndex, this.moduleDetail.topics.length, this.getNextTopicId());
      await this.saveProgress();
    }
  }
}