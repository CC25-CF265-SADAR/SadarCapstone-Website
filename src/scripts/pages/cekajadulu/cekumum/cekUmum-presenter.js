import { processScreenshot, detectLink, processQr } from '../../../data/api-ml';
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
    console.log('[DEBUG] Mulai handleSubmit, file:', imageFile.name);
    try {
      // Jalankan paralel (QR + OCR)
      const [qrResponse, ocrResponse] = await Promise.allSettled([
        processQr({ imageFile }),
        processScreenshot({ imageFile }),
      ]);

      let urls = [];
      let phishingResults = [];
      let smsText = '';
      let prediction = '';
      let probability = 0;
      let keywords = [];

      // ✳️ Proses QR jika sukses
      if (qrResponse.status === 'fulfilled' && qrResponse.value?.decoded_url) {
        const decodedUrl = qrResponse.value.decoded_url;
        console.log('[DEBUG] QR Detected:', decodedUrl);
        urls.push(decodedUrl);
        smsText += `Ditemukan QR code yang mengarah ke: ${decodedUrl}\n`;
      }

      // ✳️ Proses OCR jika sukses
      if (ocrResponse.status === 'fulfilled') {
        const result = ocrResponse.value;

        const spamResult = result?.spam_detection_results?.[0]?.detection_result;
        smsText += result?.llm_extraction?.potential_sms_content || '';
        const extracted = result?.llm_extraction?.extracted_urls?.map(u => u.url) || [];
        urls.push(...extracted);

        if (spamResult) {
          prediction = spamResult.prediction;
          probability = spamResult.probability;
          keywords = spamResult.explanation.map((item) => item[0]);
        }
      }

      // ✅ Hilangkan duplikat URL
      urls = [...new Set(urls)];

      // Deteksi phishing untuk semua URL
      const phishingResultPromises = urls.map(async (url) => {
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
      });

      const settled = await Promise.allSettled(phishingResultPromises);
      phishingResults = settled
        .filter((res) => res.status === 'fulfilled')
        .map((res) => res.value);

      // Rekam spam keyword
      if (keywords.length > 0) {
        await recordSpamKeywords(keywords);
      }

      // Kirim ke tampilan
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