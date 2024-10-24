import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'expense',
  storage: AsyncStorage,
  whitelist: ['items', 'categories'],
};

const initialState = {
  items: [],
  currentExpense: {},
  categories: [],
  isSubmitting: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpenseItems(state, action) {
      state.items = action.payload;
    },
    setCurrentExpense(state, action) {
      state.currentExpense = action.payload;
    },
    setIsSubmitting(state, action) {
      state.isSubmitting = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    addItem(state, action) {
      state.items.unshift(action.payload);
    },
    updateItem(state, action) {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1, action.payload);
      }
    },
    deleteItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    updateCategory(state, action) {
      const itemIndex = state.categories.findIndex(
        item => item.id === action.payload.id,
      );

      if (itemIndex !== -1) {
        state.categories.splice(itemIndex, 1, action.payload);
      }
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

export const expenseActions = expenseSlice.actions;

const expenseReducer = persistReducer(persistConfig, expenseSlice.reducer);

export default expenseReducer;
