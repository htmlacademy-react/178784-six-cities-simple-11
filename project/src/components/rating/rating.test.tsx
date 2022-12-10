import { render, screen } from '@testing-library/react';
import { RatingType } from '../../enums/rating-type.enum';
import Rating, { RatingProps } from './rating';

describe('Rating component', () => {
  it('Should be correct class if rating type is Review', () => {
    const props: RatingProps = {
      rating: 4,
      ratingType: RatingType.Review,
    };
    render(
      <Rating {...props}>
      </Rating>
    );

    const ratingContainer = screen.getByTestId('rating-container');
    expect(ratingContainer).toHaveClass('reviews__rating');
    expect(ratingContainer).not.toHaveClass('place-card__rating');
    expect(ratingContainer).not.toHaveClass('property-card__rating');

    const ratingStars = screen.getByTestId('rating-stars');
    expect(ratingStars).toHaveClass('reviews__stars');
    expect(ratingStars).not.toHaveClass('place-card__stars');
    expect(ratingStars).not.toHaveClass('property-card__stars');

    expect(screen.queryByTestId('rating')).not.toBeInTheDocument();
  });

  it('Should be correct class if rating type is PlaceCard', () => {
    const props: RatingProps = {
      rating: 6,
      ratingType: RatingType.PlaceCard,
    };
    render(
      <Rating {...props}>
      </Rating>
    );

    const ratingContainer = screen.getByTestId('rating-container');
    expect(ratingContainer).toHaveClass('place-card__rating');
    expect(ratingContainer).not.toHaveClass('reviews__rating');
    expect(ratingContainer).not.toHaveClass('property__rating');

    const ratingStars = screen.getByTestId('rating-stars');
    expect(ratingStars).toHaveClass('place-card__stars');
    expect(ratingStars).not.toHaveClass('reviews__stars');
    expect(ratingStars).not.toHaveClass('property__stars');

    expect(screen.queryByTestId('rating')).not.toBeInTheDocument();
  });

  it('Should be correct class if rating type is Property', () => {
    const props: RatingProps = {
      rating: 4,
      ratingType: RatingType.Property,
    };
    render(
      <Rating {...props}>
      </Rating>
    );

    const ratingContainer = screen.getByTestId('rating-container');
    expect(ratingContainer).toHaveClass('property__rating');
    expect(ratingContainer).not.toHaveClass('reviews__rating');
    expect(ratingContainer).not.toHaveClass('place-card__rating');

    const ratingStars = screen.getByTestId('rating-stars');
    expect(ratingStars).toHaveClass('property__stars');
    expect(ratingStars).not.toHaveClass('reviews__stars');
    expect(ratingStars).not.toHaveClass('place-card__stars');

    expect(screen.getByTestId('rating').textContent).toEqual(props.rating.toString());
  });
});
