import CONFIG from '../config';
import Swal from 'sweetalert2';
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
    localStorage.removeItem('token');
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

export function checkAuthenticatedRoute(routeHandler) {
  return function (...params) {
    const isLogin = !!getAccessToken();

    if (!isLogin) {
      Swal.fire({
        icon: 'info',
        title: 'Anda perlu login terlebih dahulu',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      // Redirect balik ke halaman sebelumnya atau homepage
      window.location.replace('#/login');
      return false;
    }

    return routeHandler(...params);
  };
}
