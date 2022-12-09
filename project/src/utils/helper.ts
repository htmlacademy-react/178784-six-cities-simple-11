import { random } from 'faker';
import { toast } from 'react-toastify';
import { CITY_ORDER } from '../constants/const';
import { City, Nullable, Offer, Point } from '../types/types';

export function getOfferById(offers: Offer[], id: string | undefined): Nullable<Offer> {
  const offerIndex = offers.findIndex((o) => id && o.id === +id);
  if (offerIndex < 0) {
    const error = `Could not get offer by id: ${id ?? 'undefined'}`;
    toast.error(error);
    return null;
  }
  return offers[offerIndex];
}

export function getPoints(offers: Offer[]): Point[] {
  return offers.map((offer) => getPoint(offer));
}

const pointByIds = new Map<number, Point>();
export function getPoint(offer: Offer): Point {
  let point = pointByIds.get(offer.id);
  if (point) {
    return point;
  }
  point = { id: offer.id, ...offer.location };
  pointByIds.set(offer.id, point);
  return point;
}

export function getAllCities(offers: Offer[]): City[] {
  const result: City[] = [];
  for (const cityName of CITY_ORDER) {
    const offer = offers.find((o) => o.city.name === cityName);
    if (!offer) {
      continue;
    }
    result.push(offer.city);
  }
  return result;
}

const maxRating = 5;
export function getWidthByRating(rating: number): number {
  const res = Math.round(rating) / maxRating * 73;
  return res;
}


const anyNumbersRegExp = new RegExp('.*[0-9].*');
const anyLettersRegExp = new RegExp('.*[a-zA-Z].*');
export function isValidPassword(password: string) {
  return anyNumbersRegExp.test(password) &&
    anyLettersRegExp.test(password);
}

export function getRandomCity() {
  return random.arrayElement(CITY_ORDER);
}
