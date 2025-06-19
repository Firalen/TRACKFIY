import { create } from 'zustand';
import { budgetService } from '../services/budgetService';

const useBudgetStore = create((set, get) => ({
  budgets: [],
  currentBudget: null,
  budgetHistory: [],
  loading: false,
  error: null,

  // Fetch all budgets
  fetchBudgets: async () => {
    set({ loading: true, error: null });
    try {
      const budgets = await budgetService.getBudgetHistory();
      set({ budgets, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch current budget
  fetchCurrentBudget: async () => {
    set({ loading: true, error: null });
    try {
      const budgetData = await budgetService.getCurrentBudget();
      set({ currentBudget: budgetData, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create or update budget
  createBudget: async (budgetData) => {
    set({ loading: true, error: null });
    try {
      const budget = await budgetService.createBudget(budgetData);
      set(state => ({
        budgets: [...state.budgets, budget],
        currentBudget: budget,
        loading: false
      }));
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Fetch budget history
  fetchBudgetHistory: async () => {
    set({ loading: true, error: null });
    try {
      const history = await budgetService.getBudgetHistory();
      set({ budgetHistory: history, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useBudgetStore; 