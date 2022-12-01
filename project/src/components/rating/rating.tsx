import classNames from 'classnames';

const maxRating = 5;

type RatingProps = {
  rating: number;
  isShowValue: boolean;
  isReview: boolean;
}

function Rating({ rating, isShowValue, isReview }: RatingProps) {
  return (
    <div className={
      classNames({ 'place-card__rating': !isReview },
        { 'reviews__rating': isReview },
        'rating')
    }
    >
      <div className={
        classNames({ 'place-card__stars': !isReview },
          { 'reviews__stars': isReview },
          'rating__stars')
      }
      >
        <span style={{ width: getWidthByRating(rating) }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {isShowValue && <span className="property__rating-value rating__value">{rating}</span>}
    </div>
  );
}

function getWidthByRating(rating: number): number {
  const res = Math.round(rating) / maxRating * 100;
  return res;
}

export default Rating;
