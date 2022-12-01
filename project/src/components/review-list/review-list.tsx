import { Comment, Nullable } from '../../types/types';
import Review from '../review/review';

type ReviewListProps = {
  comments: Comment[];
}

function ReviewList({ comments }: ReviewListProps): Nullable<JSX.Element> {
  return (
    comments.length
      ?
      <ul className="reviews__list">
        {comments.map((comment) => <Review key={comment.id} comment={comment} />)}
      </ul>
      : null
  );

}

export default ReviewList;
