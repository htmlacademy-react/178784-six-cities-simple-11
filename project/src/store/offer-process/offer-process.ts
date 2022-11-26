import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace } from '../../constants/const';
import { OfferProcess } from '../../types/state';
import { Nullable } from '../../types/types';

const initialState: OfferProcess = {
  activeOfferId: null,
  activeCityName: DEFAULT_CITY,
};

export const offerProcess = createSlice({
  name: NameSpace.OfferProcess,
  initialState,
  reducers: {
    cityChangeAction: (state, action: PayloadAction<string>) => {
      state.activeCityName = action.payload;
    },
    activeOfferChangeAction: (state, action: PayloadAction<Nullable<number>>) => {
      state.activeOfferId = action.payload;
    }
  }
});

export const { activeOfferChangeAction, cityChangeAction } = offerProcess.actions;
