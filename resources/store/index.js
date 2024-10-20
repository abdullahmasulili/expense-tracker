import { combineReducers, configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expense';
import persistStore from 'redux-persist/es/persistStore';

const reducer = combineReducers({
  expense: expenseReducer,
});

const store = configureStore({
  reducer: reducer,
});

export const persistor = persistStore(store);

export default store;
