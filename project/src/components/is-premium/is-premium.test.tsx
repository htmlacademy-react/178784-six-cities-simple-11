import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../mocks/mocks';
import { WithOfferProps } from '../../types/props';
import IsPremium from './is-premium';

describe('Is premium component', () => {
  it('Should be show is premium', () => {
    const offer = makeFakeOffer();
    offer.isPremium = true;
    const props: WithOfferProps = {
      offer
    };
    render(
      <IsPremium {...props}>
      </IsPremium>
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });

  it('Should be show is not premium', () => {
    const offer = makeFakeOffer();
    offer.isPremium = false;
    const props: WithOfferProps = {
      offer
    };
    render(
      <IsPremium {...props}>
      </IsPremium>
    );

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
  });
});
