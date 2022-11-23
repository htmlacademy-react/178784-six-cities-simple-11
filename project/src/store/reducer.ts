import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../constants/const';
import { AuthorizationStatus } from '../enums/authorization-status.enum';
import { Offer, Nullable } from '../types/types';
import { activeOfferChangeAction, changeAuthStatusAction, cityChangeAction, loadAllOffersAction, setErrorAction, setLoadingAction } from './action';

export type ReduceState = {
  activeCityName: string;
  offers: Offer[];
  activeOfferId: Nullable<number>;
  authStatus: AuthorizationStatus;
  error: Nullable<string>;
  isLoading: boolean;
}

const initialState: ReduceState = {
  activeCityName: DEFAULT_CITY,
  offers: [],
  activeOfferId: null,
  authStatus: AuthorizationStatus.Unknown,
  error: null,
  isLoading: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(cityChangeAction, (state, action) => {
    state.activeCityName = action.payload;
  });
  builder.addCase(activeOfferChangeAction, (state, action) => {
    state.activeOfferId = action.payload;
  });
  builder.addCase(loadAllOffersAction, (state, action) => {
    state.offers = action.payload;
  });
  builder.addCase(changeAuthStatusAction, (state, action) => {
    state.authStatus = action.payload;
  });
  builder.addCase(setLoadingAction, (state, action) => {
    state.isLoading = action.payload;
  });
  builder.addCase(setErrorAction, (state, action) => {
    state.error = action.payload;
  });
});
