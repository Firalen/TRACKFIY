import { create } from 'zustand';
import { budgetService } from '../services/budgetService';

const useBudgetStore = create((set) => ({
  budget: null,
  loading: false,
  error: null,

  // Fetch current budget
  fetchBudgets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await budgetService.getCurrentBudget();
      set({ budget: response, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch budget', 
        loading: false 
      });
    }
  },

  // Create or update budget
  createBudget: async (budgetData) => {
    set({ loading: true, error: null });
    try {
      const budget = await budgetService.createBudget(budgetData);
      set({ budget, loading: false });
      return { success: true };
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to set budget', 
        loading: false 
      });
      return { success: false, error: error.message };
    }
  },

  clearError: () => set({ error: null }),
}));

export default useBudgetStore; 