import apiClient from './api';

export const bookingService = {
  // POST /api/bookings (Create booking)
  createBooking: async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  },

  // GET /api/bookings/my (Student own bookings)
  getMyBookings: async (params = {}) => {
    const response = await apiClient.get('/bookings/my', { params });
    return response.data;
  },

  // GET /api/bookings (Staff / Admin all bookings)
  getAllBookings: async (filters = {}) => {
    const response = await apiClient.get('/bookings', { params: filters });
    return response.data;
  },

  // GET /api/bookings/:id
  getBookingById: async (id) => {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data;
  },

  // PATCH /api/bookings/:id/approve
  approveBooking: async (id) => {
    const response = await apiClient.patch(`/bookings/${id}/approve`);
    return response.data;
  },

  // PATCH /api/bookings/:id/reject
  rejectBooking: async (id, reason) => {
    const response = await apiClient.patch(`/bookings/${id}/reject`, { reason });
    return response.data;
  },

  // PATCH /api/bookings/:id/cancel
  cancelBooking: async (id) => {
    const response = await apiClient.patch(`/bookings/${id}/cancel`);
    return response.data;
  },

  // PATCH /api/bookings/:id/collect (Mark equipment collected)
  markEquipmentCollected: async (id) => {
    const response = await apiClient.patch(`/bookings/${id}/collect`);
    return response.data;
  },

  // PATCH /api/bookings/:id/return (Mark equipment returned)
  markEquipmentReturned: async (id) => {
    const response = await apiClient.patch(`/bookings/${id}/return`);
    return response.data;
  },
};

export default bookingService;
