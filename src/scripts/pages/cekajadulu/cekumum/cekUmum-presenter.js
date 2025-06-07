import { processScreenshot, detectLink } from '../../../data/api-ml';

export default class CekUmumPresenter {
  constructor({ onResult, onError }) {
    this.onResult = onResult;
    this.onError = onError;
  }

  async handleSubmit(imageFile) {
    try {
      const response = await processScreenshot({ imageFile });

      // Hasil dari model spam
      const spamResult = response?.spam_detection_results?.[0]?.detection_result;
      const smsText = response?.llm_extraction?.potential_sms_content || '';
      const urls = response?.llm_extraction?.extracted_urls?.map((item) => item.url) || [];

      // Inisialisasi prediksi
      let prediction = '';
      let probability = 0;
      let keywords = [];

      // Jika ada spam
      if (spamResult) {
        prediction = spamResult.prediction;
        probability = spamResult.probability;
        keywords = spamResult.explanation.map((item) => item[0]);
      }

      // Jika ada URL, lakukan deteksi phishing juga (gunakan yang pertama saja untuk sekarang)
      let phishingResults = [];
      if (urls.length > 0) {
        phishingResults = await Promise.all(
          urls.map(async (url) => {
            try {
              const result = await detectLink({ url });
              return {
                url,
                predicted_type: result.predicted_type,
                probability: result.phishing_probability,
              };
            } catch (e) {
              return {
                url,
                predicted_type: 'Gagal mendeteksi',
                probability: 0,
              };
            }
          })
        );
      }

      // Kirim ke UI
      this.onResult({
        prediction,
        probability,
        keywords,
        smsText,
        urls,
        phishingResults,
      });

    } catch (err) {
      this.onError(err.message);
    }
  }
}