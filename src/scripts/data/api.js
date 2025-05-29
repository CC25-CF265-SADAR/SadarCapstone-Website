import CONFIG from '../config.js';

const BASE_URL = CONFIG.BASE_URL;

// === BUAT AUTH LOGIN REGIST===
export const register = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Register gagal');
  }

  return await response.json();
};

export const login = async ({ email, password, remember }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login gagal');
  }

  const data = await response.json();

  // Hapus token sebelumnya
  document.cookie = `${CONFIG.ACCESS_TOKEN_KEY}=; path=/; max-age=0`;

  
  // Simpan token di localStorage supaya authHeader bisa membaca
  localStorage.setItem('token', data.token);

  // Set max-age tergantung remember
  const maxAge = remember ? 7 * 86400 : 86400; // 7 hari atau 1 hari
  document.cookie = `${CONFIG.ACCESS_TOKEN_KEY}=${data.token}; path=/; max-age=${maxAge}`;

  return data.token;
};
export const googleLogin = async (id_token, remember = false) => {
  const response = await fetch(`${BASE_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_token }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login Google gagal');
  }

  const data = await response.json();

  // Hapus token sebelumnya
  document.cookie = `${CONFIG.ACCESS_TOKEN_KEY}=; path=/; max-age=0`;

  // Simpan token di localStorage supaya authHeader bisa membaca
  localStorage.setItem('token', data.token);

  // Set token baru di cookie
  const maxAge = remember ? 7 * 86400 : 86400; // 7 hari atau 1 hari
  document.cookie = `${CONFIG.ACCESS_TOKEN_KEY}=${data.token}; path=/; max-age=${maxAge}`;

  return data.token;
};

export const requestResetPassword = async (email) => {
  const response = await fetch(`${BASE_URL}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  return response.json();
};

export const submitNewPassword = async (token, newPassword) => {
  const response = await fetch(`${BASE_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });

  return response.json();
};

// === AUTH HEADER ===
const authHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) return { 'Content-Type': 'application/json' }; // tanpa auth header
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// === BUAT MODULES ===
export const fetchModules = async () => {
  const response = await fetch(`${BASE_URL}/modules`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || 'Gagal mengambil daftar modul');
  }
  return await response.json();
};

export const fetchModuleDetail = async (moduleId) => {
  if (!moduleId) throw new Error('Module ID harus diberikan');

  const response = await fetch(`${BASE_URL}/modules/${moduleId}/details`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || 'Detail modul tidak ditemukan');
  }
  return await response.json();
};

export const fetchContent = async (contentId) => {
  if (!contentId) throw new Error('Content ID harus diberikan');

  const response = await fetch(`${BASE_URL}/content/${contentId}`, {
    method: 'GET',
    headers: authHeader(),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || 'Konten tidak ditemukan');
  }
  return await response.json();
};

// === UTILITY ===
export const logout = () => {
  localStorage.removeItem('token');
};

// === PROGRESS ===
export const saveUserProgress = async ({ moduleId, topicsProgress }) => {
  const response = await fetch(`${BASE_URL}/progress`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ moduleId, topicsProgress }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Gagal menyimpan progres belajar');
  }

  return await response.json();
};

export const fetchUserProgress = async (moduleId) => {
  const response = await fetch(`${BASE_URL}/progress/${moduleId}`, {
    headers: authHeader(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Gagal mengambil progres belajar');
  }

  return await response.json();
};