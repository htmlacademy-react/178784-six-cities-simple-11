import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Host from '../../components/host/host';
import IsPremium from '../../components/is-premium/is-premium';
import PropertyGalery from '../../components/property-galery/property-galary';
import PropertyInside from '../../components/property-inside/property-inside';
import Rating from '../../components/rating/rating';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import { HOTEL_TYPES, MAX_COMMENTS_COUNT } from '../../constants/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../router/app-routers';
import { getOfferById } from '../../services/helper';
import { sortComments } from '../../services/sort';
import { fetchNearOffersAction, fetchOfferCommentsAction } from '../../store/api-actions';
import { getNearOffers, getOfferComments, getOffers } from '../../store/offer-data/selectors';
import { getUser } from '../../store/user-process/selectors';
import PropertyMap from '../../components/property-map/property-map';
import NearOfferItem from '../../components/near-offer-item/near-offer-item';

function RoomPage(): JSX.Element {
  const { id } = useParams();
  const allOffers = useAppSelector(getOffers);
  const user = useAppSelector(getUser);
  const offer = getOfferById(allOffers, id);
  const allComments = useAppSelector(getOfferComments);
  const nearOffers = useAppSelector(getNearOffers);
  const comments = allComments
    .map((comment) => comment)
    .sort(sortComments)
    .slice(0, MAX_COMMENTS_COUNT);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferCommentsAction(offer.id));
      dispatch(fetchNearOffersAction(offer.id));
    }
  }, [id]);

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
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="20" height="20"
                        alt={user.name}
                      >
                      </img>
                    </div>
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
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{allComments.length}</span></h2>
                <ReviewList comments={comments} />
                <ReviewForm offerId={offer.id} />
              </section>
            </div>
          </div>
          <PropertyMap currentOffer={offer} nearOffers={nearOffers} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                nearOffers.map((nearOffer) => <NearOfferItem key={nearOffer.id} offer={nearOffer}></NearOfferItem>)
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomPage;


