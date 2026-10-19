import apiClient from './api';

export const equipmentService = {
  // GET /api/equipment
  getAllEquipment: async (filters = {}) => {
    const response = await apiClient.get('/equipment', { params: filters });
    return response.data;
  },

  // GET /api/equipment/:id
  getEquipmentById: async (id) => {
    const response = await apiClient.get(`/equipment/${id}`);
    return response.data;
  },

  // GET /api/equipment/:id/availability
  checkAvailability: async (id, params = {}) => {
    const response = await apiClient.get(`/equipment/${id}/availability`, { params });
    return response.data;
  },

  // POST /api/equipment
  createEquipment: async (equipmentData) => {
    const response = await apiClient.post('/equipment', equipmentData);
    return response.data;
  },

  // PUT /api/equipment/:id
  updateEquipment: async (id, equipmentData) => {
    const response = await apiClient.put(`/equipment/${id}`, equipmentData);
    return response.data;
  },

  // DELETE /api/equipment/:id
  deleteEquipment: async (id) => {
    const response = await apiClient.delete(`/equipment/${id}`);
    return response.data;
  },
};

export default equipmentService;
