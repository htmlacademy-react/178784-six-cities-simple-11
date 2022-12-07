import { render, screen } from '@testing-library/react';
import { makeFakeComments } from '../../mocks/mocks';
import ReviewList, { ReviewListProps } from './review-list';

describe('Review list component', () => {
  it('Should be show review list', () => {
    const comments = makeFakeComments();
    const props: ReviewListProps = {
      comments
    };
    render(
      <ReviewList {...props}>
      </ReviewList>
    );

    comments.forEach((comment) => {
      expect(screen.getByText(comment.comment)).toBeInTheDocument();
    });
  });
});
