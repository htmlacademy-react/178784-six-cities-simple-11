import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Host from '../../components/host/host';
import IsPremium from '../../components/is-premium/is-premium';
import PropertyGalery from '../../components/property-galery/property-galary';
import PropertyInside from '../../components/property-inside/property-inside';
import Rating from '../../components/rating/rating';
import ReviewForm from '../../components/review-form/review-form';
import Review from '../../components/review/review';
import { HOTEL_TYPES, MAX_COMMENTS_COUNT } from '../../constants/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../router/app-routers';
import { getOfferById } from '../../services/helper';
import { sortComments } from '../../services/sort';
import { fetchOfferCommentsAction } from '../../store/api-actions';
import { getOfferComments, getOffers } from '../../store/offer-data/selectors';
import { getUser } from '../../store/user-process/selectors';


function RoomPage(): JSX.Element {
  const { id } = useParams();
  const allOffers = useAppSelector(getOffers);
  const user = useAppSelector(getUser);
  const offer = getOfferById(allOffers, id);
  const comments = useAppSelector(getOfferComments);
  const viewComments = comments
    .map((comment) => comment)
    .sort(sortComments)
    .slice(0, MAX_COMMENTS_COUNT);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferCommentsAction(offer.id));
  }, []);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.MAIN}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">{user.name}</span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <PropertyGalery offer={offer} />
          <div className="property__container container">
            <div className="property__wrapper">
              <IsPremium offer={offer} />
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
              </div>
              <Rating rating={offer?.rating} isShowValue isReview={false} />
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {HOTEL_TYPES[offer.type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <PropertyInside offer={offer} />
              <Host host={offer.host} />
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>

                {
                  viewComments.length
                    ?
                    <ul className="reviews__list">
                      {viewComments.map((comment) => <Review key={comment.id} comment={comment} />)}
                    </ul>
                    : ''
                }

                <ReviewForm offerId={offer.id} />
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place image" />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;80</b>
                      <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Wood and stone place</a>
                  </h2>
                  <p className="place-card__type">Private room</p>
                </div>
              </article>

              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img className="place-card__image" src="img/apartment-02.jpg" width="260" height="200" alt="Place image" />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;132</b>
                      <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Canal View Prinsengracht</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>

              <article className="near-places__card place-card">
                <div className="place-card__mark">
                  <span>Premium</span>
                </div>
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img className="place-card__image" src="img/apartment-03.jpg" width="260" height="200" alt="Place image" />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;180</b>
                      <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '100%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Nice, cozy, warm big bed apartment</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomPage;


