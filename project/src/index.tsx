import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { OFFERS } from './mocks/offers';
import { OffersProps } from './pages/main-page/main-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const placesProps: OffersProps = {
  offers: OFFERS
};

root.render(
  <React.StrictMode>
    <App {...placesProps}/>
  </React.StrictMode>,
);
