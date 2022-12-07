import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { getFakeStoreCreator, makeFakeOffers } from '../../mocks/mocks';
import HistoryRouter from '../history-route/history-route';
import OfferList, { OffersProps } from './offer-list';

describe('Near by offer component', () => {
  const history = createMemoryHistory();
  const mockStore = getFakeStoreCreator();
  const store = mockStore({
  });
  it('Should be show near by offer', () => {
    const offers = makeFakeOffers();
    const props: OffersProps = {
      offers
    };
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferList {...props}>
          </OfferList>
        </HistoryRouter>
      </Provider>
    );

    offers.forEach((offer) => {
      expect(screen.getByAltText(offer.description)).toBeInTheDocument();
    });
  });
});
