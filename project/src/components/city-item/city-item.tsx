import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { changeCityAction } from '../../store/action';
import { City } from '../../types/types';

type CityProps = {
  city: City;
  isActive: boolean;
}

function CityItem({ city, isActive }: CityProps): JSX.Element {
  const dispatch = useAppDispatch();

  const linkClass = classNames(
    'locations__item-link',
    'tabs__item',
    { 'tabs__item--active': isActive }
  );
  return (
    <li className="locations__item">
      <a className={linkClass} href="#" onClick={() => dispatch(changeCityAction(city))}>
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default CityItem;
