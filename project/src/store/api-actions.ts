import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { TIMEOUT_SHOW_ERROR } from '../constants/const';
import { APIRoute } from '../enums/api-route.enum';
import { AuthorizationStatus } from '../enums/authorization-status.enum';
import { dropToken, saveToken } from '../services/token';
import { AuthData, UserData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/types';
import { changeAuthStatusAction, loadAllOffersAction, setErrorAction, setLoadingAction } from './action';

export const clearErrorAction = createAsyncThunk(
  'offer/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setErrorAction(null)),
      TIMEOUT_SHOW_ERROR);
  }
);

export const fetchAllOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchAllOffers',
  async (_args, { dispatch, extra: api }) => {
    dispatch(setLoadingAction(true));
    try {
      const { data } = await api.get<Offer[]>(APIRoute.AllOffers);
      dispatch(loadAllOffersAction(data));
    }
    finally {
      dispatch(setLoadingAction(false));
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_args, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(changeAuthStatusAction(AuthorizationStatus.Auth));
    }
    catch {
      dispatch(changeAuthStatusAction(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, { dispatch, extra: api }) => {
    const data: AuthData = {email, password};
    const userData = await api.post<UserData>(APIRoute.Login, data);
    saveToken(userData.data.token);
    dispatch(changeAuthStatusAction(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_args, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(changeAuthStatusAction(AuthorizationStatus.NoAuth));
  }
);
