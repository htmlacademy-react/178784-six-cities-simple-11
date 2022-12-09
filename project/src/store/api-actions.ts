import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../enums/api-route.enum';
import { AppRoute } from '../router/app-routers';
import { getAllCities } from '../utils/helper';
import { dropToken, saveToken } from '../services/token';
import { UserData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { Offer, Comment, NewComment, LoginData } from '../types/types';
import { redirectToRoute } from './action';
import { setAllCitiesAction, setNearOffersAction, setOfferCommentsAction } from './offer-data/offer-data';
import { changeActiveCityAction, setDefaultCity } from './offer-process/offer-process';
import { NameSpace } from '../enums/name-spaces.enum';

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
  async ([offerId, comment], {dispatch, extra: api, rejectWithValue}) => {
    const {data} = await api.post<Comment[]>(`${APIRoute.OfferComments}/${offerId}`, comment);
    dispatch(setOfferCommentsAction(data));
  }
);

export const fetchNearOffersAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(setNearOffersAction(data));
  }
);

export const fetchAllOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchAllOffers',
  async (_args, { dispatch, extra: api, getState }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    const allCities = getAllCities(data);
    dispatch(setAllCitiesAction(allCities));
    const defaultCityName = getState()[NameSpace.OfferProcess]?.defaultCityName;
    const defaultCity = allCities.find((city) => city.name === defaultCityName);
    const activeCtiy = defaultCity ? defaultCity : allCities[0];
    if (activeCtiy) {
      dispatch(changeActiveCityAction(activeCtiy));
    }

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

export const loginAction = createAsyncThunk<UserData, LoginData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({authData, defaultCity}, { dispatch, extra: api }) => {
    const { data: userData} = await api.post<UserData>(APIRoute.Login, authData);
    saveToken(userData.token);
    dispatch(setDefaultCity(defaultCity));
    dispatch(fetchAllOffersAction());
    dispatch(redirectToRoute(AppRoute.Main));
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
    dispatch(redirectToRoute(AppRoute.Login));
  }
);


