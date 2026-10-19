import apiClient from './api';

export const departmentService = {
  // GET /api/departments
  getDepartments: async () => {
    const response = await apiClient.get('/departments');
    return response.data;
  },

  // GET /api/departments/:id
  getDepartmentById: async (id) => {
    const response = await apiClient.get(`/departments/${id}`);
    return response.data;
  },

  // GET /api/laboratories (supports ?department=... and ?search=...)
  getLaboratories: async (params = {}) => {
    const response = await apiClient.get('/laboratories', { params });
    return response.data;
  },

  // GET /api/laboratories/department/:departmentId
  getLaboratoriesByDepartment: async (departmentId) => {
    const response = await apiClient.get(`/laboratories/department/${departmentId}`);
    return response.data;
  },

  // GET /api/laboratories/:id
  getLaboratoryById: async (id) => {
    const response = await apiClient.get(`/laboratories/${id}`);
    return response.data;
  },

  // GET /api/categories
  getCategories: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  // GET /api/categories/:id
  getCategoryById: async (id) => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },
};

export default departmentService;
