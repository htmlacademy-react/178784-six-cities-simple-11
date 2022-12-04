import classNames from 'classnames';
import { MouseEvent } from 'react';
import { SORT_TYPES } from '../../constants/const';
import { SortType } from '../../enums/sort-type.enum';
import { useAppDispatch } from '../../hooks';
import { changeSortAction } from '../../store/offer-process/offer-process';

type SortItemProps = {
  sortType: SortType;
  currentSort: SortType;
}

function SortItem({ sortType, currentSort }: SortItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSortSelect = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(changeSortAction(sortType));
  };

  const liClass = classNames(
    'places__option',
    { 'places__option--active': sortType === currentSort }
  );

  return <li className={liClass} tabIndex={0} onClick={handleSortSelect}> {SORT_TYPES.get(sortType)}</ li>;
}

export default SortItem;
