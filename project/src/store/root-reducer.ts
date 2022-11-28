import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants/const';
import { offerData } from './offer-data/offer-data';
import { offerProcess } from './offer-process/offer-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.OfferData]: offerData.reducer,
  [NameSpace.OfferProcess]: offerProcess.reducer,
  [NameSpace.UserProcess]: userProcess.reducer,
});
