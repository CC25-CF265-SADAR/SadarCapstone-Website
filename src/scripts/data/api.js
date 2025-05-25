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

  // Set max-age tergantung remember
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
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// === BUAT MODULES ===
export const fetchModules = async () => {
  const response = await fetch(`${BASE_URL}/modules`, {
    headers: authHeader(),
  });

  if (!response.ok) throw new Error('Gagal mengambil daftar modul');
  return await response.json();
};

export const fetchModuleDetail = async (moduleId) => {
  const response = await fetch(`${BASE_URL}/modules/${moduleId}/details`, {
    headers: authHeader(),
  });

  if (!response.ok) throw new Error('Detail modul tidak ditemukan');
  return await response.json();
};

// === CONTENT ===
export const fetchContent = async (contentId) => {
  const response = await fetch(`${BASE_URL}/content/${contentId}`, {
    headers: authHeader(),
  });

  if (!response.ok) throw new Error('Konten tidak ditemukan');
  return await response.json();
};

// === UTILITY ===
export const logout = () => {
  localStorage.removeItem('token');
};
