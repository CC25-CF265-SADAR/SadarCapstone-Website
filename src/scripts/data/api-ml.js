import CONFIG from '../config';

const BASE_URL_SPAM = CONFIG.BASE_URL_SPAM;
const BASE_URL_OCR = CONFIG.BASE_URL_OCR;
const BASE_URL_LINK = CONFIG.BASE_URL_LINK;

export const detectSpam = async ({ text }) => {
  const response = await fetch(`${BASE_URL_SPAM}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Deteksi spam gagal');
  }

  return await response.json();
};

export const processScreenshot = async ({ imageFile }) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${BASE_URL_OCR}/process_screenshot/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Gagal memproses screenshot');
  }

  return await response.json();
};

export const detectLink = async ({ url }) => {
  const response = await fetch(`${BASE_URL_LINK}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorMessage = data?.detail?.[0]?.msg || 'Deteksi link gagal. Pastikan format URL benar.';
    throw new Error(errorMessage);
  }

  return await response.json();
};
