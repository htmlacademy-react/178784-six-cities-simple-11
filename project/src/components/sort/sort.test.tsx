import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SORT_TYPES } from '../../constants/const';
import { getFakeStoreCreator, makeFakeSort } from '../../mocks/mocks';
import Sort from './sort';

const mockStoreCreator = getFakeStoreCreator();

describe('Sort component', () => {
  it('Should be show sort item', () => {
    const currentSort = makeFakeSort();
    const store = mockStoreCreator({
      OFFER_PROCESS: { currentSort },
    });

    render(
      <Provider store={store}>
        <Sort/>
      </Provider>
    );

    expect(screen.queryAllByText(new RegExp(SORT_TYPES.get(currentSort) ?? '', 'i')).length).toEqual(2);
  });
});
