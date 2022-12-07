import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import LoginPage from './login-page';
import userEvent from '@testing-library/user-event';


describe('Component: LoginPage', () => {
  const mockStore = configureMockStore();
  it('should render when user navigate to "login url"', async () => {

    Storage.prototype.setItem = jest.fn();

    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({ USER_PROCESS: { authStatus: AuthorizationStatus.Unknown } })}>
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
