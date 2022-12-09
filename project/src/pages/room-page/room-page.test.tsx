import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../components/history-router/history-router';
import { getFakeStoreCreator, makeFakeComments, makeFakeOffers, makeFakeUser } from '../../mocks/mocks';
import { AppRoute } from '../../router/app-routers';
import RoomPage from './room-page';
import NotFoundPage from '../not-found-page/not-found-page';

const mockStoreCreator = getFakeStoreCreator();
const offers = makeFakeOffers();
const comments = makeFakeComments();
const user = makeFakeUser();
const history = createMemoryHistory();

const store = mockStoreCreator({
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


