import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import CityList from '../../components/city-list/city-list';
import CityPlacesEmpty from '../../components/city-places-empty/city-places-empty';
import CityPlaces from '../../components/city-places/city-places';
import { AppRoute } from '../../router/app-routers';
import { logoutAction } from '../../store/api-actions';
import { getOffers } from '../../store/offer-data/selectors';
import { getUser } from '../../store/user-process/selectors';
import { MouseEvent } from 'react';

function MainPage(): JSX.Element {
  const user = useAppSelector(getUser);
  const offers = useAppSelector(getOffers);

  const dispatch = useAppDispatch();

  const handleSingOut = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
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
                  <a className="header__nav-link" href="/#" onClick={handleSingOut}>
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
            <CityList></CityList>
          </section>
        </div>

        <div className="cities">
          {offers.length ? <CityPlaces /> : <CityPlacesEmpty />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
