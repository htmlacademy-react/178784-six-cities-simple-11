import OfferList from '../offer-list/offer-list';
import Sort from '../sort/sort';
import CityMap from '../city-map/city-map';
import { useAppSelector } from '../../hooks';
import { getActiveCity, getCurrentSort } from '../../store/offer-process/selectors';
import { getOffers } from '../../store/offer-data/selectors';
import { getSortFunction } from '../../services/sort';
import { getPoints } from '../../services/helper';
import { Nullable, Point } from '../../types/types';

function CityPlaces(): Nullable<JSX.Element> {
  const activeCity = useAppSelector(getActiveCity);
  const allOffers = useAppSelector(getOffers);
  const currentSort = useAppSelector(getCurrentSort);

  if (!activeCity) {
    return (null);
  }

  const offers = allOffers
    .filter((offer) => offer.city.name === activeCity.name)
    .sort(getSortFunction(currentSort));

  const points: Point[] = getPoints(offers);

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
