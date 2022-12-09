import { AuthorizationStatus } from '../enums/authorization-status.enum';
import { SortType } from '../enums/sort-type.enum';
import { store } from '../store';
import { UserData } from './auth-data';
import { Nullable, Offer, Comment, City } from './types';

export type UserProcess = {
  authStatus: AuthorizationStatus;
  user: Nullable<UserData>;
}

export type OfferData = {
  offers: Offer[];
  cities: City[];
  error: Nullable<string>;
  isLoading: boolean;
  comments: Comment[];
  isCommentSending: boolean;
  nearOffers: Offer[];
}

export type OfferProcess = {
  activeOfferId: Nullable<number>;
  activeCity: Nullable<City>;
  isSortOpened: boolean;
  currentSort: SortType;
  defaultCityName: Nullable<string>;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
