import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../enums/api-route.enum';
import { AppRoute } from '../router/app-routers';
import { dropToken, saveToken } from '../services/token';
import { AuthData, UserData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { Offer, Comment, NewComment } from '../types/types';
import { redirectToRoute } from './action';
import { setOfferCommentsAction } from './offer-data/offer-data';

export const fetchOfferCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferComments',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.OfferComments}/${offerId}`);
    dispatch(setOfferCommentsAction(data));
  }
);

export const setCommentAction = createAsyncThunk<void, [number, NewComment], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/setComment',
  async ([offerId, comment], {dispatch, extra: api}) => {
    const {data} = await api.post<Comment[]>(`${APIRoute.OfferComments}/${offerId}`, comment);
    dispatch(setOfferCommentsAction(data));
  }
);

export const fetchAllOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchAllOffers',
  async (_args, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.AllOffers);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_args, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const data: AuthData = { email, password };
    const { data: userData} = await api.post<UserData>(APIRoute.Login, data);
    saveToken(userData.token);
    dispatch(redirectToRoute(AppRoute.MAIN));
    return userData;
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
    dispatch(redirectToRoute(AppRoute.LOGIN));
  }
);


