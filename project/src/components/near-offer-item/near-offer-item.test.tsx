import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HOTEL_TYPES } from '../../constants/const';
import { makeFakeOffer } from '../../mocks/mocks';
import { WithOfferProps } from '../../types/props';
import HistoryRouter from '../history-router/history-router';
import NearOfferItem from './near-offer-item';

describe('Near by offer component', () => {
  const history = createMemoryHistory();

  it('Should be show near by offer', () => {
    const offer = makeFakeOffer();
    const props: WithOfferProps = {
      offer
    };
    render(
      <HistoryRouter history={history}>

        <NearOfferItem {...props}>
        </NearOfferItem>

      </HistoryRouter>
    );

    expect(screen.getByAltText(offer.description)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(offer.price.toString(), 'i'))).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(HOTEL_TYPES[offer.type])).toBeInTheDocument();
  });
});
