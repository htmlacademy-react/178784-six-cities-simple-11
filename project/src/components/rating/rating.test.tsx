import { render, screen } from '@testing-library/react';
import Rating, { RatingProps } from './rating';

describe('Rating component', () => {
  it('Should be show rating if isShowValue true', () => {
    const props: RatingProps = {
      rating: 2,
      isReview: false,
      isShowValue: true
    };
    render(
      <Rating {...props}>
      </Rating>
    );

    expect(screen.getByTestId('rating').textContent).toEqual(props.rating.toString());
  });

  it('Should not be show rating if isShowValue false', () => {
    const props: RatingProps = {
      rating: 3,
      isReview: false,
      isShowValue: false
    };
    render(
      <Rating {...props}>
      </Rating>
    );

    expect(screen.queryByTestId('rating')).not.toBeInTheDocument();
  });

  it('Should be correct class if isReview true', () => {
    const props: RatingProps = {
      rating: 4,
      isReview: true,
      isShowValue: false
    };
    render(
      <Rating {...props}>
      </Rating>
    );

    const ratingContainer = screen.getByTestId('rating-container');
    expect(ratingContainer).toHaveClass('reviews__rating');
    expect(ratingContainer).not.toHaveClass('place-card__rating');

    const ratingStars = screen.getByTestId('rating-stars');
    expect(ratingStars).toHaveClass('reviews__stars');
    expect(ratingStars).not.toHaveClass('place-card__stars');
  });

  it('Should be correct class if isReview false', () => {
    const props: RatingProps = {
      rating: 6,
      isReview: false,
      isShowValue: false
    };
    render(
      <Rating {...props}>
      </Rating>
    );

    const ratingContainer = screen.getByTestId('rating-container');
    expect(ratingContainer).toHaveClass('place-card__rating');
    expect(ratingContainer).not.toHaveClass('reviews__rating');

    const ratingStars = screen.getByTestId('rating-stars');
    expect(ratingStars).toHaveClass('place-card__stars');
    expect(ratingStars).not.toHaveClass('reviews__stars');
  });
});
