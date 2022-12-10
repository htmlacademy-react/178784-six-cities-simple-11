import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { getFakeStoreCreator, makeFakeUser } from '../../mocks/mocks';
import Header from './header';
import userEvent from '@testing-library/user-event';

const user = makeFakeUser();
const history = createMemoryHistory();
const mockStoreCreator = getFakeStoreCreator();

describe('Component: Header', () => {
  it('should render Header with sign out if user exists', async () => {
    const store = mockStoreCreator({
      USER_PROCESS: { user }
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('sign-out')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-in')).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('sign-out'));
    setTimeout(() => {
      expect(screen.getAllByText(/sign in/i).length).toEqual(2);
    }, 4000);
  });
  it('should render Header with sign in if user not exists', async () => {
    const store = mockStoreCreator({
      USER_PROCESS: { user: null }
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('sign-in')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-out')).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('sign-in'));
    setTimeout(() => {
      expect(screen.getAllByText(/sign out/i).length).toEqual(2);
    }, 4000);
  });
});
