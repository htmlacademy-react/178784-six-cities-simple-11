import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../mocks/mocks';
import { WithOfferProps } from '../../types/props';
import PropertyInside from './property-inside';

describe('Property inside component', () => {
  it('Should be show offer goods', () => {
    const offer = makeFakeOffer();
    const props: WithOfferProps = {
      offer
    };
    render(
      <PropertyInside {...props}>
      </PropertyInside>
    );

    offer.goods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });
});
