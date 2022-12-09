import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { checkAuthAction, fetchAllOffersAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';

store.dispatch(fetchAllOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <HistoryRouter history={browserHistory}>
      <React.StrictMode>
        <ToastContainer />
        <App />
      </React.StrictMode>
    </HistoryRouter>
  </Provider>
);
