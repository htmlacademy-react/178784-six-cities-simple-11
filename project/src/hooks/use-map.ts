import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet, { Map } from 'leaflet';
import { Nullable, Location } from '../types/types';

function useMap(
  mapRef: MutableRefObject<Nullable<HTMLElement>>,
  center: Location): Nullable<Map> {
  const [map, setMap] = useState<Nullable<Map>>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: center.latitude,
          lng: center.longitude
        },
        zoom: center.zoom
      });

      leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      ).addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
    map?.setView([center.latitude, center.longitude], center.zoom);
  }, [mapRef, center]);

  return map;
}

export default useMap;
