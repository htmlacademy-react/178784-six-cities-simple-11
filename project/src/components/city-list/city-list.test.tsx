import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { getFakeStoreCreator, makeFakeCities, makeFakeCity } from '../../mocks/mocks';
import HistoryRouter from '../history-router/history-router';
import CityList from './city-list';

describe('Citi list component', () => {
  const city = makeFakeCity();
  const cities = makeFakeCities();
  const history = createMemoryHistory();
  const mockStore = getFakeStoreCreator();
  const store = mockStore({
    OFFER_PROCESS: { activeCity: city },
    OFFER_DATA: { cities },
  });

  it('Should be show city links', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityList/>
        </HistoryRouter>
      </Provider>);

    cities.forEach((c) => {
      expect(screen.getByText(c.name)).toBeInTheDocument();
    });
  });
});
