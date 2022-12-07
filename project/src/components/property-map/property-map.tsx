import { useEffect, useRef } from 'react';
import { activeIcon, defaultIcon } from '../../constants/const';
import useMap from '../../hooks/use-map';
import { getPoint, getPoints } from '../../utils/helper';
import { Offer } from '../../types/types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type PropertyMapProps = {
  currentOffer: Offer;
  nearOffers: Offer[];
}

function PropertyMap({currentOffer, nearOffers}: PropertyMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentOffer.city.location);

  useEffect(() => {
    if (map) {
      const points = [...getPoints(nearOffers), getPoint(currentOffer)];
      const markerGroup = L.layerGroup().addTo(map);

      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: point.id === currentOffer.id ? activeIcon : defaultIcon,
          })
          .addTo(markerGroup);
      });

      return () => {
        markerGroup.clearLayers();
      };
    }
  }, [map, currentOffer, nearOffers]);

  return (
    <section className="property__map map" ref={mapRef}></section>
  );
}

export default PropertyMap;
