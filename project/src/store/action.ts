import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../enums/authorization-status.enum';
import { AppRoute } from '../router/app-routers';
import { Nullable, Offer } from '../types/types';

export const cityChangeAction = createAction<string>('offer/change-city');

export const activeOfferChangeAction = createAction<Nullable<number>>('offer/change-active');

export const loadAllOffersAction = createAction<Offer[]>('data/load-all-offers');

export const changeAuthStatusAction = createAction<AuthorizationStatus>('user/change-auth-status');

export const setErrorAction = createAction<Nullable<string>>('offer/error');

export const setLoadingAction = createAction<boolean>('data/loading');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
