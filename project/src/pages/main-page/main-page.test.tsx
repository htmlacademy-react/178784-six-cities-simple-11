import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { makeFakeCities, makeFakeOffers, makeFakeUser } from '../../mocks/mocks';
import MainPage from './main-page';

const offers = makeFakeOffers();
const cities = makeFakeCities();
const user = makeFakeUser();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  OFFER_PROCESS: { activeCity: cities[0] },
  OFFER_DATA: { offers, cities },
  USER_PROCESS: { user }
});

describe('Component: MainPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
