import { useEffect, useRef } from 'react';
import { URL_MARKER_DEFAULT } from '../../constants/const';
import { CITY } from '../../mocks/city';
import useMap from './use-map';
import leaflet, { Point } from 'leaflet';
import { POINTS } from '../../mocks/points';
import { Nullable } from '../../types/types';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  points: Point[];
}

function Map({ points }: MapProps): JSX.Element {
  const mapRef = useRef<Nullable<HTMLElement>>(null);
  const map = useMap(mapRef, CITY);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      POINTS.forEach((point) => {
        leaflet
          .marker({
            lat: point.x,
            lng: point.y,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points]);

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
