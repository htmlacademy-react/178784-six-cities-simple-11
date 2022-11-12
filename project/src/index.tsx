import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { OFFERS } from './mocks/offers';
import { MainProps } from './pages/main-page/main-page';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const placesProps: MainProps = {
  offers: OFFERS
};

root.render(
  <React.StrictMode>
    <App {...placesProps}/>
  </React.StrictMode>,
);
