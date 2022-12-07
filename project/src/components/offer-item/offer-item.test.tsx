import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HOTEL_TYPES } from '../../constants/const';
import { getFakeStoreCreator, makeFakeOffer } from '../../mocks/mocks';
import { WithOfferProps } from '../../types/props';
import HistoryRouter from '../history-route/history-route';
import OfferItem from './offer-item';

describe('Offer item component', () => {
  const history = createMemoryHistory();
  const mockStore = getFakeStoreCreator();
  const store = mockStore({
  });
  it('Should be show offer item', () => {
    const offer = makeFakeOffer();
    const props: WithOfferProps = {
      offer
    };
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferItem {...props}>
          </OfferItem>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(offer.description)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(offer.price.toString(), 'i'))).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(HOTEL_TYPES[offer.type])).toBeInTheDocument();
  });
});
