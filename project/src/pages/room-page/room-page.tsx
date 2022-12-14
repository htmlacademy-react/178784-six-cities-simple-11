import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
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
import { getOfferById } from '../../utils/helper';
import { sortComments } from '../../utils/sort';
import { fetchNearOffersAction, fetchOfferCommentsAction } from '../../store/api-actions';
import { getNearOffers, getOfferComments, getOffers } from '../../store/offer-data/selectors';
import PropertyMap from '../../components/property-map/property-map';
import NearOfferItem from '../../components/near-offer-item/near-offer-item';
import { RatingType } from '../../enums/rating-type.enum';
import Header from '../../components/header/header';
import { getAuthStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';

function RoomPage(): JSX.Element {
  const { id } = useParams();
  const allOffers = useAppSelector(getOffers);

  const allComments = useAppSelector(getOfferComments);
  const authStatus = useAppSelector(getAuthStatus);
  const nearOffers = useAppSelector(getNearOffers);
  const comments = allComments
    .map((comment) => comment)
    .sort(sortComments)
    .slice(0, MAX_COMMENTS_COUNT);
  const dispatch = useAppDispatch();
  const offer = getOfferById(allOffers, id);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && offer) {
      dispatch(fetchOfferCommentsAction(offer.id));
      dispatch(fetchNearOffersAction(offer.id));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, id, offer]);

  if (offer === null) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  return (
    <div className="page">
      <Header/>

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
              <Rating rating={offer?.rating} ratingType={RatingType.Property} />
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
                { authStatus === AuthorizationStatus.Auth ? <ReviewForm offerId={offer.id} /> : null}
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


