import { FormEvent, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../router/app-routers';
import { loginAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/user-process/selectors';
import { AuthData } from '../../types/auth-data';
import { Nullable } from '../../types/types';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const emailRef = useRef<Nullable<HTMLInputElement>>(null);
  const passwordRef = useRef<Nullable<HTMLInputElement>>(null);
  const authStatus = useAppSelector(getAuthStatus);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        email: emailRef.current.value,
        password: passwordRef.current.value
      });
    }
  };

  const onSubmit = (formData: AuthData) => {
    dispatch(loginAction(formData));
  };

  if (authStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.MAIN} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.MAIN}>
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
                  type="email" name="email" placeholder="Email" required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" ref={passwordRef}
                  type="password" name="password" placeholder="Password" required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main >
    </div >
  );
}

export default LoginPage;
