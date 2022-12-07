import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { getFakeStoreCreator, makeFakeCity, makeFakeOffers } from '../../mocks/mocks';
import HistoryRouter from '../history-route/history-route';
import CityPlaces from './city-places';

describe('City places component', () => {
  const city = makeFakeCity();
  const offers = makeFakeOffers();
  const cityOffersCount = offers.filter((offer) => offer.city.name === city.name).length;
  const history = createMemoryHistory();
  const mockStore = getFakeStoreCreator();
  const store = mockStore({
    OFFER_PROCESS: { activeCity: city },
    OFFER_DATA: { offers },
  });

  it('Should be show city places', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityPlaces/>
        </HistoryRouter>
      </Provider>);

    const expected = `${cityOffersCount} places to stay in ${city.name}`;
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});
