import { useAppSelector } from '../../hooks';
import CityList from '../../components/city-list/city-list';
import CityPlacesEmpty from '../../components/city-places-empty/city-places-empty';
import CityPlaces from '../../components/city-places/city-places';
import { getOffers } from '../../store/offer-data/selectors';
import Header from '../../components/header/header';

function MainPage(): JSX.Element {
  const offers = useAppSelector(getOffers);
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList></CityList>
          </section>
        </div>

        <div className="cities">
          {offers.length ? <CityPlaces /> : <CityPlacesEmpty />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
