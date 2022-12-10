import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../router/app-routers';
import { redirectToRoute } from '../../store/action';
import { logoutAction } from '../../store/api-actions';
import { getUser } from '../../store/user-process/selectors';


function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const handleSingOut = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const handleSingIn = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(redirectToRoute(AppRoute.Login));
  };

  return (
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
                {
                  user === null ? null :
                    <div className="header__nav-profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="20" height="20" alt={user.name}></img>
                      </div>
                      <span className="header__user-name user__name">{user?.name ?? 'Не авторизован'}</span>
                    </div>
                }
              </li>
              <li className="header__nav-item">
                {
                  user === null
                    ?
                    <a className="header__nav-link" href="/#" onClick={handleSingIn} data-testid="sign-in">
                      <span className="header__signout">Sign in</span>
                    </a>
                    :
                    <a className="header__nav-link" href="/#" onClick={handleSingOut} data-testid="sign-out">
                      <span className="header__signout">Sign out</span>
                    </a>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
