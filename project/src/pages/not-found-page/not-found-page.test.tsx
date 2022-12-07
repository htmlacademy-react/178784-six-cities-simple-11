import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundPage />
      </HistoryRouter>);

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Перейти на главную')).toBeInTheDocument();
  });
});
