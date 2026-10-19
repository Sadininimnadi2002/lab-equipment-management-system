// Equipment condition reporting service
import apiClient from './api';

export const conditionService = {
  getConditionReports: async () => {
    try {
      const response = await apiClient.get('/condition-reports');
      return response.data;
    } catch {
      return null;
    }
  },

  createConditionReport: async (reportData) => {
    try {
      const response = await apiClient.post('/condition-reports', reportData);
      return response.data;
    } catch {
      return reportData;
    }
  },
};
