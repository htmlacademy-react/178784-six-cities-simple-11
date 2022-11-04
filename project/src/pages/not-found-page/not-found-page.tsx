import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">

            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Страница не найдена</h1>
            <Link className="locations__item-link" to="/">
              <span>Перейти на главную</span>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
