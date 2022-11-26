import { NameSpace } from '../../constants/const';
import { State } from '../../types/state';
import { Nullable } from '../../types/types';

export const getActiveCityName = (state: State): string => state[NameSpace.OfferProcess].activeCityName;
export const getActiveOfferId = (state: State): Nullable<number> => state[NameSpace.OfferProcess].activeOfferId;
