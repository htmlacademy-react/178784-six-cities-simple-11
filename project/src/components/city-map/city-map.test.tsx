import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { getFakeStoreCreator, makeFakeOffer, makeFakeOffers } from '../../mocks/mocks';
import { getPoints } from '../../utils/helper';
import HistoryRouter from '../history-router/history-router';
import CityMap, { CityMapProps } from './city-map';

describe('Citi map component', () => {
  const offers = makeFakeOffers();
  const offer = makeFakeOffer();
  const points = getPoints(offers);
  const history = createMemoryHistory();
  const mockStore = getFakeStoreCreator();

  const props: CityMapProps = {
    center: offer.city.location,
    points
  };

  it('Should be show map markers with active', () => {
    const store = mockStore({
      OFFER_PROCESS: { activeOfferId: offer.id },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityMap {...props} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getAllByAltText('Marker').length).toEqual(offers.length);
    expect(screen.getAllByAltText('Marker').filter((x) => x.getAttribute('src') === 'img/pin-active.svg').length).toEqual(1);
  });

  it('Should be show map markers without active', () => {
    const store = mockStore({
      OFFER_PROCESS: { },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityMap {...props} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getAllByAltText('Marker').length).toEqual(offers.length);
    expect(screen.getAllByAltText('Marker').filter((x) => x.getAttribute('src') === 'img/pin-active.svg').length).toEqual(0);
  });
});

