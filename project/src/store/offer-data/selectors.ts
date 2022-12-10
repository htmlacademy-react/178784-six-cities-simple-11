import { NameSpace } from '../../enums/name-spaces.enum';
import { State } from '../../types/state';
import { Offer, Comment, City } from '../../types/types';

export const getOffers = (state: State): Offer[] => state[NameSpace.OfferData].offers;
export const getCities = (state: State): City[] => state[NameSpace.OfferData].cities;
export const getIsLoading = (state: State): boolean => state[NameSpace.OfferData].isLoading;
export const getOfferComments = (state: State): Comment[] => state[NameSpace.OfferData].comments;
export const getIsCommentSending = (state: State): boolean => state[NameSpace.OfferData].isCommentSending;
export const getNearOffers = (state: State): Offer[] => state[NameSpace.OfferData].nearOffers;
