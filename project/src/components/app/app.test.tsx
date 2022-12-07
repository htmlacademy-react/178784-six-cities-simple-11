import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import { makeFakeOffers, makeFakeCities, makeFakeUser, makeFakeComments, getFakeStoreCreator } from '../../mocks/mocks';
import { AppRoute } from '../../router/app-routers';
import HistoryRouter from '../history-route/history-route';
import App from './app';

const history = createMemoryHistory();

const offers = makeFakeOffers();
const cities = makeFakeCities();
const user = makeFakeUser();
const comments = makeFakeComments();
const mockStoreCreator = getFakeStoreCreator();

const authStore = mockStoreCreator({
  OFFER_PROCESS: { activeCity: cities[0] },
  OFFER_DATA: { offers, cities, comments, nearOffers: offers },
  USER_PROCESS: { user, authStatus: AuthorizationStatus.Auth }
});
const fakeAuthApp = (
  <Provider store={authStore}>
    <HistoryRouter history={history}>
      <App></App>
    </HistoryRouter>
  </Provider>
);

const noAuthStore = mockStoreCreator({
  OFFER_DATA: { isLoading: false },
  USER_PROCESS: {
    authStatus: AuthorizationStatus.NoAuth,
    user: null
  }
});

const fakeNoAuthApp = (
  <Provider store={noAuthStore}>
    <HistoryRouter history={history}>
      <App></App>
    </HistoryRouter>
  </Provider>
);

describe('Application routing', () => {

  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeAuthApp);

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('should render "Main" when auth user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeAuthApp);

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('should render "Room" when user navigate to "offer:id"', () => {
    history.push(`/offer/${offers[0].id}`);

    render(fakeAuthApp);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });


  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeAuthApp);

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Перейти на главную')).toBeInTheDocument();
  });

  it('shoud render "Login" if no auth navigate to Main', () => {
    history.push(AppRoute.Main);
    render(fakeNoAuthApp);
    expect(screen.getAllByText(/sign in/i).length).toEqual(2);
  });

  it('shoud render "Login" if no auth navigate to Room', () => {
    history.push(`/offer/${offers[0].id}`);

    render(fakeNoAuthApp);
    expect(screen.getAllByText(/sign in/i).length).toEqual(2);
  });
});

