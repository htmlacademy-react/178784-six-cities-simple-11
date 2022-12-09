import classNames from 'classnames';
import { RatingType } from '../../enums/rating-type.enum';
import { getWidthByRating } from '../../utils/helper';

export type RatingProps = {
  rating: number;
  ratingType: RatingType;
}

function Rating({ rating, ratingType }: RatingProps) {
  return (
    <div className={
      classNames({ 'place-card__rating': ratingType === RatingType.PlaceCard },
        { 'reviews__rating': ratingType === RatingType.Review },
        { 'property__rating': ratingType === RatingType.Property },
        'rating')
    }
    data-testid="rating-container"
    >
      <div className={
        classNames({ 'place-card__stars': ratingType === RatingType.PlaceCard },
          { 'reviews__stars': ratingType === RatingType.Review },
          { 'property__stars': ratingType === RatingType.Property },
          'rating__stars')
      }
      data-testid="rating-stars"
      >
        <span style={{ width: getWidthByRating(rating) }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {ratingType === RatingType.Property && <span className="property__rating-value rating__value" data-testid="rating">{rating}</span>}
    </div>
  );
}

export default Rating;
