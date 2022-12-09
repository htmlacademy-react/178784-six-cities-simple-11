import { FormEvent, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../router/app-routers';
import { loginAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/user-process/selectors';
import { LoginData, Nullable } from '../../types/types';
import { getRandomCity, isValidPassword } from '../../utils/helper';

function LoginPage(): JSX.Element {
  const randomCity = getRandomCity();
  const emailRef = useRef<Nullable<HTMLInputElement>>(null);
  const passwordRef = useRef<Nullable<HTMLInputElement>>(null);
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();
  if (authStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLElement>, defaultCity: Nullable<string> = null) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      if (isValidPassword(passwordRef.current.value)) {
        const loginData: LoginData = {
          authData: {
            email: emailRef.current.value,
            password: passwordRef.current.value
          },
          defaultCity
        };
        onSubmit(loginData);
      }
      else {
        toast.error('Password must have one latter or number');
      }
    }
  };

  const onSubmit = (loginData: LoginData) => {
    dispatch(loginAction(loginData));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" ref={emailRef}
                  type="email" name="email" placeholder="Email" required data-testid="email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" ref={passwordRef}
                  type="password" name="password" placeholder="Password" required data-testid="password"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/#" onClick={(evt) => handleSubmit(evt, randomCity)}>
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main >
    </div >
  );
}

export default LoginPage;
