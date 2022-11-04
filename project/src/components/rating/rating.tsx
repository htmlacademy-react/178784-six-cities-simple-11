const maxRating = 5;

export type RatingProps = {
  rating: number;
  isShowValue: boolean;
}

function Rating({rating, isShowValue}: RatingProps) {
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
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
