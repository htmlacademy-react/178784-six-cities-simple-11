import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../constants/const';
import { CITIES } from '../mocks/city';
import { OFFERS } from '../mocks/offers';
import { ReduceState } from '../types/reduce';
import { changeCityAction, loadOffersAction } from './action';

const initialState: ReduceState = {
  city: CITIES.find((city) => city.name === DEFAULT_CITY),
  offers: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCityAction, (state, action) => {
    state.city = action.payload;
  });
  builder.addCase(loadOffersAction, (state) => {
    state.offers = OFFERS;
  });
});
