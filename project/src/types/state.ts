import { AuthorizationStatus } from '../enums/authorization-status.enum';
import { store } from '../store';
import { Nullable, Offer } from './types';

export type UserProcess = {
  authStatus: AuthorizationStatus;
}

export type OfferData = {
  offers: Offer[];
  error: Nullable<string>;
  isLoading: boolean;
}

export type OfferProcess = {
  activeOfferId: Nullable<number>;
  activeCityName: string;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
