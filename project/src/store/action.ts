import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../router/app-routers';
import { Nullable } from '../types/types';

export const setErrorAction = createAction<Nullable<string>>('app/error');
export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
