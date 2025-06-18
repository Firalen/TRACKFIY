import api from './api';

export const budgetService = {
  // Get current month budget
  getCurrentBudget: async () => {
    const response = await api.get('/budgets/current');
    return response.data;
  },

  // Create or update budget
  createBudget: async (budgetData) => {
    const response = await api.post('/budgets', budgetData);
    return response.data;
  },

  // Get budget by month
  getBudgetByMonth: async (month) => {
    const response = await api.get(`/budgets/${month}`);
    return response.data;
  },

  // Get budget history
  getBudgetHistory: async () => {
    const response = await api.get('/budgets');
    return response.data;
  },

  // Delete budget
  deleteBudget: async (id) => {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  }
}; 