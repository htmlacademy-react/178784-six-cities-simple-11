import { useAppSelector } from '../../hooks';
import { getCities } from '../../store/offer-data/selectors';
import CityItem from '../city-item/city-item';

function CityList(): JSX.Element {
  const cities = useAppSelector(getCities);
  return (
    <ul className="locations__list tabs__list" >
      {
        cities.map((city) =>
          <CityItem key={city.name} city={city}></CityItem>
        )
      }
    </ul>
  );
}

export default CityList;
