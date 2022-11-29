import { useEffect, useRef } from 'react';
import { activeIcon, defaultIcon } from '../../constants/const';
import useMap from '../../hooks/use-map';
import { getPoint, getPoints } from '../../services/helper';
import { Offer } from '../../types/types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

type PropertyMapProps = {
  currentOffer: Offer;
  nearOffers: Offer[];
}

function PropertyMap({currentOffer, nearOffers}: PropertyMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentOffer.city.location);
  //const activeOfferId = useAppSelector(getActiveOfferId);
  const points = [...getPoints(nearOffers), getPoint(currentOffer)];

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: point.id === currentOffer.id ? activeIcon : defaultIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points]);

  return (
    <section className="property__map map" ref={mapRef}></section>
  );
}

export default PropertyMap;
