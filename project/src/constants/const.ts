import leaflet, { Icon } from 'leaflet';
import { SortType } from '../enums/sort-type.enum';

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const MAX_GALARY_IMG_COUNT = 6;
export const MAX_COMMENTS_COUNT = 10;
export const MAX_COMMENT_LENGTH = 300;
export const LOW_COMMENT_LIMIT = 50;

export const COMMENT_DATE_FORMAT = 'MMMM, YYYY';

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

export const SORT_TYPES = new Map<SortType, string>([
  [SortType.Pupular, 'Popular'],
  [SortType.PriceLowToHigh, 'Price: low to high'],
  [SortType.PriceHithToLow, 'Price: high to low'],
  [SortType.TopRatedFirst, 'Top rated first']
]);

export const CITY_ORDER = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
