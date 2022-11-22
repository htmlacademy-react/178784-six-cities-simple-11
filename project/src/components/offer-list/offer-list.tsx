import { Offer } from '../../types/types';
import OfferItem from '../offer-item/offer-item';

export type OffersProps = {
  offers: Offer[];
};

function OfferList({ offers }: OffersProps) {

  return (
    <div className="cities__places-list places__list tabs__content" >
      {offers.map((offer) => <OfferItem key={offer.id} offer={offer}/>)}
    </div>
  );
}

export default OfferList;
