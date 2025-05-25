import CONFIG from '../config';

export function getAccessToken() {
  const match = document.cookie.match(new RegExp('(^| )' + CONFIG.ACCESS_TOKEN_KEY + '=([^;]+)'));
  return match ? match[2] : null;
}

export function putAccessToken(token) {
  try {
    document.cookie = `${CONFIG.ACCESS_TOKEN_KEY}=${token}; path=/; max-age=86400`;
    return true;
  } catch (error) {
    console.error('putAccessToken: error:', error);
    return false;
  }
}

export function removeAccessToken() {
  try {
    document.cookie = `${CONFIG.ACCESS_TOKEN_KEY}=; path=/; max-age=0`;
    return true;
  } catch (error) {
    console.error('removeAccessToken: error:', error);
    return false;
  }
}
export function getLogout() {
  removeAccessToken();
}
export function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (error) {
    console.error('parseJwt: invalid token', error);
    return null;
  }
}
