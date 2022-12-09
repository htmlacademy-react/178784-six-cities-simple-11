import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCity, getFakeStoreCreator } from '../../mocks/mocks';
import HistoryRouter from '../history-router/history-router';
import CityItem from './city-item';

describe('Citi item component', () => {
  const city = makeFakeCity();
  const history = createMemoryHistory();
  const mockStore = getFakeStoreCreator();
  const store = mockStore({
    OFFER_PROCESS: { activeCity: makeFakeCity() },
  });
  const props = {city};

  it('Should be show city link', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityItem {...props}>
          </CityItem>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(city.name)).toBeInTheDocument();
  });
});
