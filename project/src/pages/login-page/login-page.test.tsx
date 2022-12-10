import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import LoginPage from './login-page';
import userEvent from '@testing-library/user-event';
import { getFakeStoreCreator, makeFakeCities } from '../../mocks/mocks';

describe('Component: LoginPage', () => {
  const cities = makeFakeCities();
  const mockStoreCreator = getFakeStoreCreator();
  const store = mockStoreCreator({
    OFFER_DATA: { cities },
    USER_PROCESS: { authStatus: AuthorizationStatus.Unknown }
  });

  it('should render when user navigate to "login url"', async () => {

    Storage.prototype.setItem = jest.fn();

    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginPage />
        </HistoryRouter>);
      </Provider>);

    expect(screen.getAllByText(/sign in/i).length).toEqual(2);

    await userEvent.type(screen.getByTestId('email'), 'test@test.ru');
    await userEvent.type(screen.getByTestId('password'), '123345');

    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123345/i)).toBeInTheDocument();
  });
});
