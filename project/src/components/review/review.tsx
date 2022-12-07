import dayjs from 'dayjs';
import { COMMENT_DATE_FORMAT } from '../../constants/const';
import { Comment } from '../../types/types';
import Rating from '../rating/rating';

export type ReviewProps = {
  comment: Comment;
}

function Review({ comment }: ReviewProps): JSX.Element {
  const commentDate = dayjs(comment.date).format(COMMENT_DATE_FORMAT);
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54"
            alt={comment.user.name}
          />
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <Rating rating={comment.rating} isShowValue={false} isReview />
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{commentDate}</time>
      </div>
    </li>
  );
}

export default Review;
