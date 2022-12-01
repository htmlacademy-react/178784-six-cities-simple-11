import { Link } from 'react-router-dom';
import { HOTEL_TYPES } from '../../constants/const';
import { OfferProps } from '../../types/props';
import Rating from '../rating/rating';

function NearOfferItem({ offer }: OfferProps): JSX.Element {
  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
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
        <Rating rating={offer.rating} isShowValue={false} isReview={false} />
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{HOTEL_TYPES[offer.type]}</p>
      </div>
    </article>
  );
}

export default NearOfferItem;
