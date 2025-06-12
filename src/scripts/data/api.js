import CONFIG from '../config.js';

const BASE_URL = CONFIG.BASE_URL;

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

  document.cookie = `${CONFIG.ACCESS_TOKEN_KEY}=; path=/; max-age=0`;

  localStorage.setItem('token', data.token);

  const maxAge = remember ? 7 * 86400 : 86400;
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

  document.cookie = `${CONFIG.ACCESS_TOKEN_KEY}=; path=/; max-age=0`;

  localStorage.setItem('token', data.token);

  const maxAge = remember ? 7 * 86400 : 86400;
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

const authHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) return { 'Content-Type': 'application/json' }; // tanpa auth header
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const fetchModules = async () => {
  const response = await fetch(`${BASE_URL}/modules`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
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

  if (response.status === 401) {
    throw new Error('Expired token');
  }

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || 'Konten tidak ditemukan');
  }

  return await response.json();
};

export const fetchQuestionsByModuleId = async (modId) => {
  const response = await fetch(`${BASE_URL}/modules/${modId}/questions`, {
    method: 'GET',
    headers: authHeader(),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || 'Gagal mengambil pertanyaan modul');
  }
  return await response.json();
};

export const saveUserAnswers = async (data) => {
  const { modId, token, ...body } = data;
  return fetch(`${BASE_URL}/modules/${modId}/questions/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) return res.json().then((err) => Promise.reject(err));
    return res.json();
  });
};

export const fetchResultByUserId = async (modId, token) => {
  const res = await fetch(`${BASE_URL}/modules/${modId}/results`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Gagal mengambil hasil kuis');
  }

  return await res.json();
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const saveUserProgress = async ({ moduleId, topicsProgress, checkQuiz }) => {
  const response = await fetch(`${BASE_URL}/progress`, {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ moduleId, topicsProgress, checkQuiz }), // Kirim checkQuiz
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Gagal menyimpan progres belajar');
  }

  return await response.json();
};

export const fetchUserProgress = async () => {
  const response = await fetch(`${BASE_URL}/progress`, {
    method: 'GET',
    headers: authHeader(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Gagal mengambil progres belajar');
  }

  return await response.json();
};

export const checkAndUpdateQuizStatus = async (userId, moduleId) => {
  try {
    const response = await fetch(`${BASE_URL}/progress/${userId}/${moduleId}/update-checkquiz`, {
      method: 'GET',
      headers: authHeader(),
    });

    if (response.ok) {
      console.log('Quiz status berhasil diperbarui');
    } else {
      const err = await response.json();
      console.error('Gagal memperbarui quiz status:', err.message);
    }
  } catch (error) {
    console.error('Gagal memperbarui quiz status:', error);
  }
};

export const recordPhishingLink = async (url) => {
  const response = await fetch(`${BASE_URL}/leaderboard/phishing`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Gagal mencatat link phishing');
  }

  return await response.json();
};

export const recordSpamKeywords = async (keywords) => {
  const response = await fetch(`${BASE_URL}/leaderboard/spam`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ keywords }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Gagal mencatat keyword spam');
  }

  return await response.json();
};

export const fetchPhishingLeaderboard = async (monthOnly = false) => {
  const response = await fetch(`${BASE_URL}/leaderboard/phishing?monthOnly=${monthOnly}`, {
    method: 'GET',
    headers: authHeader(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Gagal mengambil leaderboard phishing');
  }

  return await response.json();
};

export const fetchSpamLeaderboard = async (monthOnly = false) => {
  const response = await fetch(`${BASE_URL}/leaderboard/spam?monthOnly=${monthOnly}`, {
    method: 'GET',
    headers: authHeader(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Gagal mengambil leaderboard spam');
  }

  return await response.json();
};
