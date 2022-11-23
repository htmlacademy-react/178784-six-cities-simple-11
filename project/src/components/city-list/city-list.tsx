import { City } from '../../types/types';
import CityItem from '../city-item/city-item';

type CityListProps = {
  cities: City[];
}

function CityList({cities}: CityListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) =>
          <CityItem key={city.name} city={city}></CityItem>
        )
      }
    </ul>
  );
}

export default CityList;
