import { detectLink } from '../../../data/api-ml';
import { recordPhishingLink } from '../../../data/api';

function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

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

      if (result.predicted_type?.toLowerCase() === 'phishing' && isValidHttpUrl(result.url)) {
        await recordPhishingLink(result.url);
        console.log('[recorded to leaderboard]', result.url);
      }
    } catch (error) {
      this.onError(error.message);
    }
  }
}
