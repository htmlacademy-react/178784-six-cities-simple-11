import classNames from 'classnames';
import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeActiveCityAction } from '../../store/offer-process/offer-process';
import { getActiveCity } from '../../store/offer-process/selectors';
import { City } from '../../types/types';

type CityProps = {
  city: City;
}

function CityItem({ city }: CityProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);
  const isActive = city.name === activeCity?.name;
  const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeActiveCityAction(city));
  };

  const linkClass = classNames(
    'locations__item-link',
    'tabs__item',
    { 'tabs__item--active': isActive }
  );
  return (
    <li className="locations__item">
      <a className={linkClass} href="/#" onClick={handleClick}>
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default CityItem;
