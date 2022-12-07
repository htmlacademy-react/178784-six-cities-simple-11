import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { COMMENT_DATE_FORMAT } from '../../constants/const';
import { makeFakeComment } from '../../mocks/mocks';
import Review, { ReviewProps } from './review';

describe('Review component', () => {
  it('Should be show review', () => {
    const comment = makeFakeComment();
    const props: ReviewProps = {
      comment
    };
    render(
      <Review {...props}>
      </Review>
    );

    expect(screen.getByAltText(comment.user.name)).toBeInTheDocument();
    expect(screen.getByText(comment.user.name)).toBeInTheDocument();
    expect(screen.getByText(comment.comment)).toBeInTheDocument();
    const commentDate = dayjs(comment.date).format(COMMENT_DATE_FORMAT);
    expect(screen.getByText(commentDate)).toBeInTheDocument();
  });
});
