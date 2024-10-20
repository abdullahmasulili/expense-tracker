import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'expense',
  storage: AsyncStorage,
  whitelist: ['item', 'categories'],
};

const initialState = {
  items: [],
  currentExpense: {},
  categories: [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setCurrentExpense(state, action) {
      state.currentExpense = action.payload;
    },
    addExpenseItem(state, action) {
      state.items.unshift(action.payload);
    },
    updateExpenseItem(state, action) {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1, action.payload);
      }
    },
    deleteExpenseItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    addExpenseCategory(state, action) {
      state.categories.push(action.payload);
    },
    updateExpenseCategory(state, action) {
      const itemIndex = state.categories.findIndex(
        item => item.id === action.payload.id,
      );

      if (itemIndex !== -1) {
        state.categories.splice(itemIndex, 1, action.payload);
      }
    },
    removeExpenseCategory(state, action) {
      state.categories = state.categories.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

const expenseReducer = persistReducer(persistConfig, expenseSlice.reducer);

export default expenseReducer;
