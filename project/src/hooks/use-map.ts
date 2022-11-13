import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City, Nullable } from '../types/types';
import { useAppSelector } from '.';

function useMap(mapRef: MutableRefObject<Nullable<HTMLElement>>, city: City): Nullable<Map> {
  const [map, setMap] = useState<Nullable<Map>>(null);
  const isRenderedRef = useRef(false);

  useAppSelector((state) => {
    if (map && state.city) {
      map.panTo({
        lat: state.city.location.latitude,
        lng: state.city.location.longitude
      });
    }
  });

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: 10
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
