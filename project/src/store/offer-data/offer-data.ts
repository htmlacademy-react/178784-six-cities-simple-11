import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants/const';
import { OfferData } from '../../types/state';
import { Nullable } from '../../types/types';
import { fetchAllOffersAction } from '../api-actions';

const initialState: OfferData = {
  offers: [],
  error: null,
  isLoading: false,
};

export const offerData = createSlice({
  name: NameSpace.OfferData,
  initialState,
  reducers: {
    setErrorAction: (state, action: PayloadAction<Nullable<string>>) => {
      state.error = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllOffersAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      });
  }
});
