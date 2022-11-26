import leaflet, { Icon } from 'leaflet';

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const DEFAULT_CITY = 'Paris';

export const TIMEOUT_SHOW_ERROR = 5000;

export const defaultIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const activeIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const HOTEL_TYPES: { [key: string]: string } = {
  'apartment': 'Apartment',
  'room': 'Private Room',
  'house': 'House',
  'hotel': 'Hotel'
};

export enum NameSpace {
  UserProcess = 'USER_PROCESS',
  OfferProcess = 'OFFER_PROCESS',
  OfferData = 'OFFER_DATA'
}

