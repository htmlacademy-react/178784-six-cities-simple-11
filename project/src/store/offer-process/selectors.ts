import { NameSpace } from '../../constants/const';
import { SortType } from '../../enums/sort-type.enum';
import { State } from '../../types/state';
import { Nullable } from '../../types/types';

export const getActiveCityName = (state: State): string => state[NameSpace.OfferProcess].activeCityName;
export const getActiveOfferId = (state: State): Nullable<number> => state[NameSpace.OfferProcess].activeOfferId;
export const getIsSortOpened = (state: State): boolean => state[NameSpace.OfferProcess].isSortOpened;
export const getCurrentSort = (state: State): SortType => state[NameSpace.OfferProcess].currentSort;
