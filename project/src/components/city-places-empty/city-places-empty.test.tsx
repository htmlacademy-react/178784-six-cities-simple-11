import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { getFakeStoreCreator, makeFakeCity } from '../../mocks/mocks';
import HistoryRouter from '../history-route/history-route';
import CityPlacesEmpty from './city-places-empty';

describe('Citi places empty component', () => {
  const city = makeFakeCity();
  const history = createMemoryHistory();
  const mockStore = getFakeStoreCreator();
  const store = mockStore({
    OFFER_PROCESS: { activeCity: city }
  });

  it('Should be show city places', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityPlacesEmpty/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${city.name}`)).toBeInTheDocument();
  });
});
