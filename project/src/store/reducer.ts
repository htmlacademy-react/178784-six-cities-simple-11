import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../constants/const';
import { ReduceState } from '../types/reduce';
import { activeOfferChangeAction, cityChangeAction, loadAllOffersAction } from './action';

const initialState: ReduceState = {
  activeCityName: DEFAULT_CITY,
  offers: [],
  activeOfferId: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(cityChangeAction, (state, action) => {
    state.activeCityName = action.payload;
  });
  builder.addCase(loadAllOffersAction, (state, action) => {
    state.offers = action.payload;
  });
  builder.addCase(activeOfferChangeAction, (state, action) => {
    state.activeOfferId = action.payload;
  });
});
