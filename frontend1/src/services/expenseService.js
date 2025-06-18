import api from './api';

export const expenseService = {
  // Get all expenses with optional filters
  getExpenses: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.month) params.append('month', filters.month);
    if (filters.category) params.append('category', filters.category);
    
    const response = await api.get(`/expenses?${params}`);
    return response.data;
  },

  // Get expense by ID
  getExpenseById: async (id) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  // Create new expense
  createExpense: async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },

  // Update expense
  updateExpense: async (id, expenseData) => {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data;
  },

  // Delete expense
  deleteExpense: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },

  // Get expense statistics
  getExpenseStats: async (month) => {
    const params = month ? `?month=${month}` : '';
    const response = await api.get(`/expenses/stats${params}`);
    return response.data;
  }
}; 