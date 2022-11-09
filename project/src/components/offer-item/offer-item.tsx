import { Link } from 'react-router-dom';
import { HOTEL_TYPES } from '../../mocks/offers';
import { Offer } from '../../types/types';
import IsPremium from '../is-premium/is-premium';
import Rating from '../rating/rating';

export type OfferProp = {
  offer: Offer;
  setActive: (offer: Offer | null) => void;
}

function OfferItem({ offer, setActive }: OfferProp): JSX.Element {
  return (
    <article className="cities__card place-card"
      onMouseEnter={() => setActive(offer)}
      onMouseLeave={() => setActive(null)}
    >
      <IsPremium offer={offer} />
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt={offer.description} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <Rating rating={offer.rating} isShowValue={false}/>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{HOTEL_TYPES[offer.type]}</p>
      </div>
    </article>
  );
}

export default OfferItem;
