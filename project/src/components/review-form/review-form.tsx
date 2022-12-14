import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { LOW_COMMENT_LIMIT, MAX_COMMENT_LENGTH } from '../../constants/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCommentAction } from '../../store/api-actions';
import { getIsCommentSending } from '../../store/offer-data/selectors';
import { NewComment } from '../../types/types';

type ReviewFormProps = {
  offerId: number;
}

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    review: '',
    rating: ''
  });

  const handleFileldChanged = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCommnetFileldChanged = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, maxLength } = evt.target;

    const trimCommnet = value.length > maxLength ? value.slice(0, maxLength) : value;

    setFormData({ ...formData, [name]: trimCommnet });
  };

  const isCommentSending = useAppSelector(getIsCommentSending);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const comment: NewComment = {
      comment: formData.review,
      rating: +formData.rating
    };

    dispatch(setCommentAction([offerId, comment])).unwrap()
      .then(() => {
        setFormData({ rating: '', review: '' });
      })
      .catch(() => {
        toast.error('Ошибка при отправке комментария');
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
          disabled={isCommentSending}
          onChange={handleFileldChanged} checked={formData.rating === '5'}
          data-testid="5-stars"
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
          disabled={isCommentSending}
          onChange={handleFileldChanged} checked={formData.rating === '4'}
          data-testid="4-stars"
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
          disabled={isCommentSending}
          onChange={handleFileldChanged} checked={formData.rating === '3'}
          data-testid="3-stars"
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
          disabled={isCommentSending}
          onChange={handleFileldChanged} checked={formData.rating === '2'}
          data-testid="2-stars"
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
          disabled={isCommentSending}
          onChange={handleFileldChanged} checked={formData.rating === '1'}
          data-testid="1-stars"
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        readOnly={isCommentSending}
        onChange={handleCommnetFileldChanged} value={formData.review} maxLength={MAX_COMMENT_LENGTH}
        data-testid="review"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">{`${LOW_COMMENT_LIMIT } characters`}</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit"
          disabled={
            formData.review.length <= LOW_COMMENT_LIMIT ||
            !formData.rating?.length ||
            isCommentSending
          }
          data-testid="submit"
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
