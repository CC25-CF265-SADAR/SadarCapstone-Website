import { fetchModuleDetail, fetchModules, fetchUserProgress } from '../../../data/api';

export default class ModuleDetailPresenter {
  constructor(moduleId) {
    this.moduleId = moduleId;
  }

  async getModuleData() {
    const modules = await fetchModules();
    return modules.find((mod) => mod.id === this.moduleId);
  }

  async getModuleDetail() {
    return await fetchModuleDetail(this.moduleId);
  }

  async getTopicProgressArray() {
    try {
      const progressResponse = await fetchUserProgress(this.moduleId);
      const topicsProgress =
        progressResponse.data?.modulesProgress?.find((mod) => mod.moduleId === this.moduleId)
          ?.topicsProgress || [];

      return topicsProgress.map((tp) => (tp.checkpoint ? 100 : 0));
    } catch {
      return [];
    }
  }
  async getNextIncompleteTopicId() {
    try {
      const progressResponse = await fetchUserProgress(this.moduleId);
      const topicsProgress =
        progressResponse.data?.modulesProgress?.find((mod) => mod.moduleId === this.moduleId)
          ?.topicsProgress || [];

      const next = topicsProgress.find((tp) => tp.checkpoint === false);
      return next?.topicId || null;
    } catch (err) {
      console.warn('Gagal ambil topik belum selesai:', err.message);
      return null;
    }
  }
}
