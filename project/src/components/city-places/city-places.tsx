import { Point } from '../../types/types';
import OfferList from '../offer-list/offer-list';
import Sort from '../sort/sort';
import CityMap from '../city-map/city-map';
import { useAppSelector } from '../../hooks';
import { getActiveCityName, getCurrentSort } from '../../store/offer-process/selectors';
import { CITIES } from '../../constants/city';
import { getOffers } from '../../store/offer-data/selectors';
import { getSortFunction } from '../../services/sort';
import { getPoints } from '../../services/helper';

function CityPlaces(): JSX.Element {
  const selectedCity = useAppSelector(getActiveCityName);
  const activeCity = CITIES.find((city) => city.name === selectedCity);
  const allOffers = useAppSelector(getOffers);
  const currentSort = useAppSelector(getCurrentSort);

  const offers = allOffers
    .filter((offer) => offer.city.name === selectedCity)
    .sort(getSortFunction(currentSort));

  const points: Point[] = getPoints(offers);

  if (!activeCity) {
    throw new Error('Could not get active city');
  }

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
        <Sort />
        <OfferList offers={offers} />
      </section>
      <div className="cities__right-section">
        <CityMap points={points} center={activeCity.location}/>
      </div>
    </div>
  );
}

export default CityPlaces;
