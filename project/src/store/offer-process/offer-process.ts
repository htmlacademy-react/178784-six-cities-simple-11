import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../enums/name-spaces.enum';
import { SortType } from '../../enums/sort-type.enum';
import { OfferProcess } from '../../types/state';
import { City, Nullable } from '../../types/types';

const initialState: OfferProcess = {
  activeOfferId: null,
  activeCity: null,
  isSortOpened: false,
  currentSort: SortType.Pupular,
};

export const offerProcess = createSlice({
  name: NameSpace.OfferProcess,
  initialState,
  reducers: {
    changeActiveCityAction: (state, action: PayloadAction<City>) => {
      state.activeCity = action.payload;
    },
    activeOfferChangeAction: (state, action: PayloadAction<Nullable<number>>) => {
      state.activeOfferId = action.payload;
    },
    toggleSortOpenedAction: (state) => {
      state.isSortOpened = !state.isSortOpened;
    },
    changeSortAction: (state, action: PayloadAction<SortType>) => {
      state.currentSort = action.payload;
    },
  }
});

export const { activeOfferChangeAction, changeActiveCityAction,
  toggleSortOpenedAction, changeSortAction } = offerProcess.actions;
