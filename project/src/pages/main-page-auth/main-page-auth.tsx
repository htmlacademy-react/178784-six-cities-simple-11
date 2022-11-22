import { Point } from '../../types/types';
import CityList from '../../components/city-list/city-list';
import OfferList from '../../components/offer-list/offer-list';
import { CITIES } from '../../constants/city';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Map from '../../components/map/map';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { AppRouters } from '../../router/app-routers';


export function MainPageAuth(): JSX.Element {
  const activeOfferId = useAppSelector((state) => state.activeOfferId);
  const selectedCity = useAppSelector((state) => state.activeCityName);
  const allOffers = useAppSelector((state) => state.offers);
  const cityOffers = allOffers.filter((offer) => offer.city.name === selectedCity);
  const activeCity = CITIES.find((city) => city.name === selectedCity);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSingOut = () => {
    dispatch(logoutAction);
    navigate(AppRouters.LOGIN);
  };

  if (!activeCity) {
    throw new Error('Could not get active city');
  }

  const points: Point[] = cityOffers.map((offer) => ({ id: offer.id, ...offer.location }));

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" onClick={onSingOut}>
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>


      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList cities={CITIES}></CityList>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferList offers={cityOffers} />
            </section>
            <div className="cities__right-section">
              <Map points={points} activePointId={activeOfferId} center={activeCity.location} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );


}