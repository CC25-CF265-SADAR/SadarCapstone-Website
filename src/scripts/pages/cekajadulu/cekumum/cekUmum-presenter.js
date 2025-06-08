import { processScreenshot, detectLink } from '../../../data/api-ml';
import { recordPhishingLink, recordSpamKeywords } from '../../../data/api';

function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

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

      // Deteksi phishing link
      const phishingResults = await Promise.allSettled(
        urls.map(async (url) => {
          try {
            const result = await detectLink({ url });
            if (
              isValidHttpUrl(url) &&
              result.predicted_type?.toLowerCase() === 'phishing'
            ) {
              try {
                await recordPhishingLink(url);
              } catch (e) {
                console.warn(`Gagal mencatat ke leaderboard untuk: ${url}`, e.message);
              }
            }
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

      const validResults = phishingResults
        .filter((res) => res.status === 'fulfilled' || res.value)
        .map((res) => res.value || res);

      // ⬇️ Catat keywords spam (jika ada)
      if (keywords.length > 0) {
        await recordSpamKeywords(keywords);
      }

      // Kirim ke UI
      this.onResult({
        prediction,
        probability,
        keywords,
        smsText,
        urls,
        phishingResults: validResults,
      });

    } catch (err) {
      this.onError(err.message);
    }
  }
}