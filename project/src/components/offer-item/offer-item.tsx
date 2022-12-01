import { Link } from 'react-router-dom';
import { HOTEL_TYPES } from '../../constants/const';
import { useAppDispatch } from '../../hooks';
import { activeOfferChangeAction } from '../../store/offer-process/offer-process';
import { OfferProps } from '../../types/props';
import IsPremium from '../is-premium/is-premium';
import Rating from '../rating/rating';

function OfferItem({ offer }: OfferProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <article className="cities__card place-card"
      onMouseEnter={() => dispatch(activeOfferChangeAction(offer.id))}
      onMouseLeave={() => dispatch(activeOfferChangeAction(null))}
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
        <Rating rating={offer.rating} isShowValue={false} isReview={false}/>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{HOTEL_TYPES[offer.type]}</p>
      </div>
    </article>
  );
}

export default OfferItem;
