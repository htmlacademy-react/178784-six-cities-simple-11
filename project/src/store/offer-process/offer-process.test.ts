import { SortType } from '../../enums/sort-type.enum';
import { makeFakeCity, makeFakeOffer, makeFakeSort } from '../../mocks/mocks';
import { OfferProcess } from '../../types/state';
import { getRandomCity } from '../../utils/helper';
import { activeOfferChangeAction, changeActiveCityAction, changeSortAction, offerProcess, setDefaultCity, toggleSortOpenedAction } from './offer-process';

const initialState: OfferProcess = {
  activeOfferId: null,
  activeCity: null,
  isSortOpened: false,
  currentSort: SortType.Pupular,
  defaultCityName: null
};

describe('Reducer: offerProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(offerProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ ...initialState });
  });

  it('should set active offer id', () => {
    const state = { ...initialState };
    const offer = makeFakeOffer();
    expect(offerProcess.reducer(state, activeOfferChangeAction(offer.id)))
      .toEqual({ ...initialState, activeOfferId: offer.id });
  });

  it('should set active city', () => {
    const state = { ...initialState };
    const city = makeFakeCity();
    expect(offerProcess.reducer(state, changeActiveCityAction(city)))
      .toEqual({ ...initialState, activeCity: city });
  });

  it('should toggle sort opened', () => {
    const state = { ...initialState };
    const newState = offerProcess.reducer(state, toggleSortOpenedAction());
    expect(newState)
      .toEqual({ ...initialState, isSortOpened: true });
    expect(offerProcess.reducer(newState, toggleSortOpenedAction()))
      .toEqual({ ...initialState, isSortOpened: false });
  });

  it('should change sort', () => {
    const state = { ...initialState };
    const sortType = makeFakeSort();
    expect(offerProcess.reducer(state, changeSortAction(sortType)))
      .toEqual({ ...initialState, currentSort: sortType });
  });

  it('should change default city', () => {
    const state = { ...initialState };
    const defaultCity = getRandomCity();
    expect(offerProcess.reducer(state, setDefaultCity(defaultCity)))
      .toEqual({ ...initialState, defaultCityName: defaultCity });
  });
});
