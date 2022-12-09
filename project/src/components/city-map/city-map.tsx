import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Point, Location } from '../../types/types';
import { activeIcon, defaultIcon } from '../../constants/const';
import { useAppSelector } from '../../hooks';
import { getActiveOfferId } from '../../store/offer-process/selectors';
import L from 'leaflet';

export type CityMapProps = {
  points: Point[];
  center: Location;
}

function CityMap({ points, center }: CityMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, center);
  const activeOfferId = useAppSelector(getActiveOfferId);

  useEffect(() => {
    if (map) {
      const markerGroup = L.layerGroup().addTo(map);
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: point.id === activeOfferId ? activeIcon : defaultIcon,
          })
          .addTo(markerGroup);
      });
      return () => {
        markerGroup.clearLayers();
      };
    }
  }, [map, points, activeOfferId]);

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default CityMap;
