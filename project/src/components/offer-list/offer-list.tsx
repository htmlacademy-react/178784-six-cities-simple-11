import { Offer, Nullable } from '../../types/types';
import OfferItem from '../offer-item/offer-item';

export type OffersProps = {
  offers: Offer[];
  setActiveCard: (offer: Nullable<Offer>) => void;
};

function OfferList({ offers, setActiveCard }: OffersProps) {

  return (
    <div className="cities__places-list places__list tabs__content" >
      {offers.map((offer) => <OfferItem key={offer.id} offer={offer} setActive={setActiveCard}/>)}
    </div>
  );
}

export default OfferList;
