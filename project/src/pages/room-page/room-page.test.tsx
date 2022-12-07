import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeComments, makeFakeOffers, makeFakeUser } from '../../mocks/mocks';
import { AppRoute } from '../../router/app-routers';
import { createApi } from '../../services/api';
import RoomPage from './room-page';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';
import NotFoundPage from '../not-found-page/not-found-page';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const offers = makeFakeOffers();
const comments = makeFakeComments();
const user = makeFakeUser();
const history = createMemoryHistory();

const store = mockStore({
  OFFER_DATA: { offers, comments, nearOffers: offers },
  USER_PROCESS: { user }
});

describe('Component: RoomPage', () => {
  it('should render correctly', () => {
    history.push('/offer/1');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Room} element={<RoomPage />}>
            </Route>
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should navigate to not found if offer not exists', () => {
    history.push('/offer/1234');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Room} element={<RoomPage />}>
            </Route>
            <Route path={AppRoute.NotFound} element={<NotFoundPage />}>
            </Route>
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Перейти на главную')).toBeInTheDocument();
  });
});


