import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { PlacesProps } from './pages/places/places';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const placesProps: PlacesProps = {
  placesCount: 5
};

root.render(
  <React.StrictMode>
    <App {...placesProps}/>
  </React.StrictMode>,
);
