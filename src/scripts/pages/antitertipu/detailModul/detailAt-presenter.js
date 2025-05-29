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

  async getUserProgress() {
    try {
      const progressResponse = await fetchUserProgress(this.moduleId);
      return progressResponse.progress || 0;
    } catch {
      return 0;
    }
  }
}
