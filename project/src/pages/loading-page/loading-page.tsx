import './loading-page.css';

export function LoadingPage(): JSX.Element {
  return (
    <div className="page page--gray page--loading">
      <main className="page__main page__main--loading">
        <i className="lds-dual-ring"></i>
      </main>
    </div>
  );
}
