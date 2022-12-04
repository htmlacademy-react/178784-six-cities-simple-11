import classNames from 'classnames';
import { MouseEvent } from 'react';
import { SORT_TYPES } from '../../constants/const';
import { SortType } from '../../enums/sort-type.enum';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSortOpenedAction } from '../../store/offer-process/offer-process';
import { getCurrentSort, getIsSortOpened } from '../../store/offer-process/selectors';
import SortItem from '../sort-item/sort-item';

function Sort(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleSortingToggle = (evt: MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(toggleSortOpenedAction());
  };
  const isSortOpened = useAppSelector(getIsSortOpened);
  const currentSort = useAppSelector(getCurrentSort);
  const ulClass = classNames(
    'places__options',
    'places__options--custom',
    { 'places__options--opened': isSortOpened }
  );

  return (
    <form className="places__sorting" action="#" method="get" onClick={handleSortingToggle}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {SORT_TYPES.get(currentSort)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={ulClass}>
        <SortItem currentSort={currentSort} sortType={SortType.Pupular}/>
        <SortItem currentSort={currentSort} sortType={SortType.PriceLowToHigh}/>
        <SortItem currentSort={currentSort} sortType={SortType.PriceHithToLow}/>
        <SortItem currentSort={currentSort} sortType={SortType.TopRatedFirst}/>
      </ul>
    </form>
  );
}

export default Sort;
