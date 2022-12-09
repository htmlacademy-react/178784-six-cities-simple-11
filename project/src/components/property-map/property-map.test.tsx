import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { getFakeStoreCreator, makeFakeOffer, makeFakeOffers } from '../../mocks/mocks';
import HistoryRouter from '../history-router/history-router';
import PropertyMap, { PropertyMapProps } from './property-map';

describe('Property map component', () => {
  const offers = makeFakeOffers();
  const offer = makeFakeOffer();
  const offerIndex = offers.findIndex((o) => o.id === offer.id);
  offers.splice(offerIndex, 1);

  const history = createMemoryHistory();
  const mockStore = getFakeStoreCreator();

  const props: PropertyMapProps = {
    currentOffer: offer,
    nearOffers: offers
  };

  it('Should be show map markers', () => {
    const store = mockStore({
      OFFER_PROCESS: { activeOfferId: offer.id },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyMap {...props} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getAllByAltText('Marker').length).toEqual(offers.length + 1);
    expect(screen.getAllByAltText('Marker').filter((x) => x.getAttribute('src') === 'img/pin-active.svg').length).toEqual(1);
  });
});

