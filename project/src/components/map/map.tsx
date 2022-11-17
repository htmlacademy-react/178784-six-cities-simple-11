import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import leaflet from 'leaflet';
import { Point, Location, Nullable } from '../../types/types';
import 'leaflet/dist/leaflet.css';
import { activeIcon, defaultIcon } from '../../constants/const';

type MapProps = {
  points: Point[];
  activePointId: Nullable<number>;
  center: Location;
}

function Map({ points, activePointId, center }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, center);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: point.id === activePointId ? activeIcon : defaultIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, activePointId]);

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
