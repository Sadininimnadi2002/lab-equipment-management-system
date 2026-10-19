import apiClient from './api';

export const authService = {
  // POST /api/auth/login
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // POST /api/auth/register
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // GET /api/auth/profile
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  // Clear local credentials
  logout: () => {
    localStorage.removeItem('unilab_auth_token');
    localStorage.removeItem('token');
    localStorage.removeItem('unilab_current_user');
  },
};

export default authService;
