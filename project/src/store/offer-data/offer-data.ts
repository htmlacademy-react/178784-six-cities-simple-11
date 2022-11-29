import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants/const';
import { OfferData } from '../../types/state';
import { fetchAllOffersAction, setCommentAction } from '../api-actions';
import { Comment, Offer } from '../../types/types';

const initialState: OfferData = {
  offers: [],
  error: null,
  isLoading: false,
  comments: [],
  isCommentSending: false,
  nearOffers: [],
};

export const offerData = createSlice({
  name: NameSpace.OfferData,
  initialState,
  reducers: {
    setOfferCommentsAction: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setNearOffersAction: (state, action: PayloadAction<Offer[]>) => {
      state.nearOffers = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setCommentAction.pending, (state) => {
        state.isCommentSending = true;
      })
      .addCase(setCommentAction.fulfilled, (state) => {
        state.isCommentSending = false;
      })
      .addCase(setCommentAction.rejected, (state) => {
        state.isCommentSending = false;
      });
  }
});

export const {setOfferCommentsAction, setNearOffersAction} = offerData.actions;
