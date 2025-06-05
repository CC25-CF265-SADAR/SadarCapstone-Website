import { detectLink } from '../../../data/api-ml';

export default class CekLinkPresenter {
  constructor({ onResult, onError }) {
    this.onResult = onResult;
    this.onError = onError;
  }

  async processLink(url) {
    try {
      const result = await detectLink({ url });

      this.onResult({
        url: result.url,
        prediction: result.predicted_type,
        probability: result.phishing_probability,
      });
    } catch (error) {
      this.onError(error.message);
    }
  }
}
