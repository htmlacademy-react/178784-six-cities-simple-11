import { useState } from 'react';
import OfferItem from '../offer-item/offer-item';
import { OffersProps } from '../../pages/main-page/main-page';
import { Offer } from '../../types/types';

function OfferList({ offers }: OffersProps) {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);

  // eslint-disable-next-line no-console
  console.log('active:', activeCard);
  return (
    <div className="cities__places-list places__list tabs__content" >
      {offers.map((offer) => <OfferItem key={offer.id} offer={offer} setActive={setActiveCard}/>)}
    </div>
  );
}

export default OfferList;
