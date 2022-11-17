import { createAction } from '@reduxjs/toolkit';
import { Nullable, Offer } from '../types/types';

export const cityChangeAction = createAction<string>('offer/change-city');
export const loadAllOffersAction = createAction<Offer[]>('offer/load-all');
export const activeOfferChangeAction = createAction<Nullable<number>>('offer/change-active');
