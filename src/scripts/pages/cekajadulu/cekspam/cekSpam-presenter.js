import { detectSpam } from '../../../data/api-ml';
import { recordSpamKeywords } from '../../../data/api';


class CekSpamPresenter {
  constructor({ onResult, onError }) {
    this.onResult = onResult;
    this.onError = onError;
  }

  async handleTextSubmit(text) {
    if (!text || text.trim() === '') {
      this.onError('Teks tidak boleh kosong.');
      return;
    }

    try {
      const response = await detectSpam({ text });

      const result = {
        prediction: response.prediction,
        probability: (response.probability * 100).toFixed(2),
        keywords: response.explanation.map(([word]) => word),
      };

      if (result.keywords.length > 0) {
        await recordSpamKeywords(result.keywords);
      }

      this.onResult(result);
    } catch (error) {
      this.onError(error.message || 'Terjadi kesalahan saat deteksi.');
    }
  }
}

export default CekSpamPresenter;
