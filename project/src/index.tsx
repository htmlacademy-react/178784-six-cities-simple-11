import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { OffersProps } from './pages/main-page/main-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const placesProps: OffersProps = {
  offers: offers
};

root.render(
  <React.StrictMode>
    <App {...placesProps}/>
  </React.StrictMode>,
);
