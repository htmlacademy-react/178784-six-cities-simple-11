import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import leaflet from 'leaflet';
import { Point, Location } from '../../types/types';
import 'leaflet/dist/leaflet.css';
import { activeIcon, defaultIcon } from '../../constants/const';
import { useAppSelector } from '../../hooks';
import { getActiveOfferId } from '../../store/offer-process/selectors';

type MapProps = {
  points: Point[];
  center: Location;
}

function Map({ points, center }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, center);
  const activeOfferId = useAppSelector(getActiveOfferId);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: point.id === activeOfferId ? activeIcon : defaultIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, activeOfferId]);

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
