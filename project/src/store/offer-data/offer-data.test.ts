import { makeFakeCities, makeFakeComments, makeFakeOffers } from '../../mocks/mocks';
import { OfferData } from '../../types/state';
import { fetchAllOffersAction, setCommentAction } from '../api-actions';
import { offerData, setAllCitiesAction, setNearOffersAction, setOfferCommentsAction } from './offer-data';

const initialState: OfferData = {
  offers: [],
  isLoading: false,
  comments: [],
  isCommentSending: false,
  nearOffers: [],
  cities: []
};

describe('Reducer: offerData', () => {
  it('without additional parameters should return initial state', () => {
    expect(offerData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ ...initialState });
  });

  it('should set offer comments', () => {
    const state = { ...initialState };
    const comments = makeFakeComments();
    expect(offerData.reducer(state, setOfferCommentsAction(comments)))
      .toEqual({...initialState, comments});
  });

  it('should set near offers', () => {
    const state = { ...initialState };
    const offers = makeFakeOffers();
    expect(offerData.reducer(state, setNearOffersAction(offers)))
      .toEqual({...initialState, nearOffers: offers});
  });

  it('should set all cities', () => {
    const state = { ...initialState };
    const cities = makeFakeCities();
    expect(offerData.reducer(state, setAllCitiesAction(cities)))
      .toEqual({...initialState, cities});
  });

  it('should is loading if fetchAllOffersAction pending', () => {
    const state = { ...initialState };
    expect(offerData.reducer(state, {type: fetchAllOffersAction.pending.type}))
      .toEqual({...initialState, isLoading: true });
  });

  it('should update offers by loading offers', () => {
    const state = { ...initialState };
    const offers = makeFakeOffers();
    expect(offerData.reducer(state, {type: fetchAllOffersAction.fulfilled.type, payload: offers}))
      .toEqual({...initialState, offers, isLoading: false });
  });

  it('should not update offers if fetchAllOffersAction rejected', () => {
    const state = { ...initialState };
    expect(offerData.reducer(state, {type: fetchAllOffersAction.rejected.type}))
      .toEqual(initialState);
  });

  it('should is sending if setCommentAction pending', () => {
    const state = { ...initialState };
    expect(offerData.reducer(state, {type: setCommentAction.pending.type}))
      .toEqual({...initialState, isCommentSending: true });
  });

  it('should is not sending if setCommentAction fulfield', () => {
    const state = { ...initialState };
    expect(offerData.reducer(state, {type: setCommentAction.fulfilled.type}))
      .toEqual({...initialState, isCommentSending: false });
  });

  it('should not not sending if setCommentAction rejected', () => {
    const state = { ...initialState };
    expect(offerData.reducer(state, {type: setCommentAction.rejected.type}))
      .toEqual({...initialState, isCommentSending: false });
  });

});
