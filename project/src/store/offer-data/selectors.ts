import { NameSpace } from '../../constants/const';
import { State } from '../../types/state';
import { Nullable, Offer, Comment } from '../../types/types';

export const getOffers = (state: State): Offer[] => state[NameSpace.OfferData].offers;
export const getError = (state: State): Nullable<string> => state[NameSpace.OfferData].error;
export const getIsLoading = (state: State): boolean => state[NameSpace.OfferData].isLoading;
export const getOfferComments = (state: State): Comment[] => state[NameSpace.OfferData].comments;
export const getIsCommentSending = (state: State): boolean => state[NameSpace.OfferData].isCommentSending;
export const getNearOffers = (state: State): Offer[] => state[NameSpace.OfferData].nearOffers;
