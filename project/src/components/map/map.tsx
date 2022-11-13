import { useEffect, useRef } from 'react';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../constants/const';
import useMap from '../../hooks/use-map';
import leaflet, { Icon } from 'leaflet';
import { Nullable, Point } from '../../types/types';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';

type MapProps = {
  points: Point[];
  activeId: number | undefined;
}

function Map({ points, activeId }: MapProps): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);

  if (activeCity === undefined) {
    throw new Error('Active city is undefined');
  }
  const mapRef = useRef<Nullable<HTMLElement>>(null);
  const map = useMap(mapRef, activeCity);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = new Icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: activeId && point.id === activeId ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, activeId]);

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
