import { NameSpace } from '../../enums/name-spaces.enum';
import { SortType } from '../../enums/sort-type.enum';
import { State } from '../../types/state';
import { City, Nullable } from '../../types/types';

export const getActiveCity = (state: State): Nullable<City> => state[NameSpace.OfferProcess].activeCity;
export const getActiveOfferId = (state: State): Nullable<number> => state[NameSpace.OfferProcess].activeOfferId;
export const getIsSortOpened = (state: State): boolean => state[NameSpace.OfferProcess].isSortOpened;
export const getCurrentSort = (state: State): SortType => state[NameSpace.OfferProcess].currentSort;
