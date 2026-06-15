import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Attach JWT to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirect to login on 401 only when a session token exists (expired/invalid token),
// NOT during login/register where 401 just means wrong credentials.
// This fixes vercel redirect loop when backend returns 401 for unauthenticated requests, but user is not actually logged in (no token).
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const hadToken = !!localStorage.getItem('token');
    if (err.response?.status === 401 && hadToken) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;