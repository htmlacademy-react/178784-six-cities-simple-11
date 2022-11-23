import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { redirect } from './middlewares/redirect';
import { reducer } from './reducer';

export const api = createApi();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
});
