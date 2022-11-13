import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/types';

export const changeCityAction = createAction('changeCity', (value: City) => ({
  payload: value
}));
export const loadOffersAction = createAction('loadOffers');
