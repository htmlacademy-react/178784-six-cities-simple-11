import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SORT_TYPES } from '../../constants/const';
import { SortType } from '../../enums/sort-type.enum';
import { getFakeStoreCreator, makeFakeSort } from '../../mocks/mocks';
import SortItem, { SortItemProps } from './sort-item';


const mockStoreCreator = getFakeStoreCreator();

describe('Sort item component', () => {
  it('Should be show sort item', () => {
    const store = mockStoreCreator({
      OFFER_PROCESS: { currentSort: SortType.Pupular },
    });

    const props: SortItemProps = {
      sortType: makeFakeSort(),
      currentSort: SortType.PriceHithToLow
    };
    render(
      <Provider store={store}>
        <SortItem {...props}>
        </SortItem>
      </Provider>
    );

    expect(screen.getByText(SORT_TYPES.get(props.sortType) ?? '')).toBeInTheDocument();
  });
});
