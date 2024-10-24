import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'credentials',
  storage: AsyncStorage,
  whitelist: ['users', 'currentAccount', 'accessToken'],
};

const initialState = {
  users: [],
  currentAccount: {},
  accessToken: null,
  isSubmitting: false,
  error: null,
  exchangeRates: {},
};

const userSilce = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setCurrentAccount(state, action) {
      state.currentAccount = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setIsSubmitting(state, action) {
      state.isSubmitting = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setExchangeRates(state, action) {
      state.exchangeRates = action.payload;
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
    updateUser(state, action) {
      const userIndex = state.users.findIndex(
        user => user.email === action.payload.email,
      );

      if (userIndex !== -1) {
        state.users.splice(userIndex, 1, action.payload);
      }
    },
    deleteUser(state, action) {
      state.users = state.users.filter(user => user.email !== action.payload);
    },
  },
});

export const userActions = userSilce.actions;

const userReducer = persistReducer(persistConfig, userSilce.reducer);

export default userReducer;
