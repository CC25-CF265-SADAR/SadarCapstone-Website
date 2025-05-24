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

export const login = async ({ email, password }) => {
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
  localStorage.setItem('token', data.token);
  return data.token;
};

// === AUTH HEADER ===
const authHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
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