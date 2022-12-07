import { render, screen } from '@testing-library/react';
import { MAX_GALARY_IMG_COUNT } from '../../constants/const';
import { makeFakeOffer } from '../../mocks/mocks';
import { WithOfferProps } from '../../types/props';
import PropertyGalery from './property-galary';

describe('Property galary component', () => {
  it('Should be show offer images', () => {
    const offer = makeFakeOffer();
    const props: WithOfferProps = {
      offer
    };
    render(
      <PropertyGalery {...props}>
      </PropertyGalery>
    );

    const maxImages = offer.images.length > MAX_GALARY_IMG_COUNT
      ? MAX_GALARY_IMG_COUNT
      : offer.images.length;
    expect(screen.getAllByAltText(offer.description).length).toEqual(maxImages);
  });
});
