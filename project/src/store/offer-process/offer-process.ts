import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace } from '../../constants/const';
import { SortType } from '../../enums/sort-type.enum';
import { OfferProcess } from '../../types/state';
import { Nullable } from '../../types/types';

const initialState: OfferProcess = {
  activeOfferId: null,
  activeCityName: DEFAULT_CITY,
  isSortOpened: false,
  currentSort: SortType.Pupular,
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
    },
    toggleSortOpenedAction: (state) => {
      state.isSortOpened = !state.isSortOpened;
    },
    changeSortAction: (state, action: PayloadAction<SortType>) => {
      state.currentSort = action.payload;
    }
  }
});

export const { activeOfferChangeAction, cityChangeAction, toggleSortOpenedAction, changeSortAction } = offerProcess.actions;
