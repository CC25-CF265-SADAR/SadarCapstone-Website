import { processScreenshot } from '../../../data/api-ml';

export default class CekUmumPresenter {
  constructor({ onResult, onError }) {
    this.onResult = onResult;
    this.onError = onError;
  }

  async handleSubmit(imageFile) {
    try {
      const response = await processScreenshot({ imageFile });

      const spamResult = response?.spam_detection_results?.[0]?.detection_result;
      const smsText = response?.llm_extraction?.potential_sms_content;
      const urls = response?.llm_extraction?.extracted_urls?.map((item) => item.url) || [];

      this.onResult({
        prediction: spamResult?.prediction,
        probability: spamResult?.probability,
        keywords: spamResult?.explanation.map((item) => item[0]),
        smsText,
        urls,
      });
    } catch (err) {
      this.onError(err.message);
    }
  }
}
