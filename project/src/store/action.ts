import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../router/app-routers';

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
