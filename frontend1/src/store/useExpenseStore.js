import { create } from 'zustand';
import { expenseService } from '../services/expenseService';

const useExpenseStore = create((set, get) => ({
  expenses: [],
  stats: null,
  loading: false,
  error: null,

  // Fetch expenses
  fetchExpenses: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const expenses = await expenseService.getExpenses(filters);
      set({ expenses, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create expense
  createExpense: async (expenseData) => {
    set({ loading: true, error: null });
    try {
      const newExpense = await expenseService.createExpense(expenseData);
      set(state => ({
        expenses: [newExpense, ...state.expenses],
        loading: false
      }));
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Update expense
  updateExpense: async (id, expenseData) => {
    set({ loading: true, error: null });
    try {
      const updatedExpense = await expenseService.updateExpense(id, expenseData);
      set(state => ({
        expenses: state.expenses.map(exp => 
          exp._id === id ? updatedExpense : exp
        ),
        loading: false
      }));
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Delete expense
  deleteExpense: async (id) => {
    set({ loading: true, error: null });
    try {
      await expenseService.deleteExpense(id);
      set(state => ({
        expenses: state.expenses.filter(exp => exp._id !== id),
        loading: false
      }));
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Fetch stats
  fetchStats: async (month) => {
    set({ loading: true, error: null });
    try {
      const stats = await expenseService.getExpenseStats(month);
      set({ stats, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useExpenseStore; 