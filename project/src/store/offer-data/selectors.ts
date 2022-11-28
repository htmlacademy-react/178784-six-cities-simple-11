import { NameSpace } from '../../constants/const';
import { State } from '../../types/state';
import { Nullable, Offer } from '../../types/types';

export const getOffers = (state: State): Offer[] => state[NameSpace.OfferData].offers;
export const getError = (state: State): Nullable<string> => state[NameSpace.OfferData].error;
export const getIsLoading = (state: State): boolean => state[NameSpace.OfferData].isLoading;
