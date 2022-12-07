import { toast } from 'react-toastify';
import { City, Nullable, Offer, Point } from '../types/types';

export function getOfferById(offers: Offer[], id: string | undefined) : Nullable<Offer>{
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

const cityOrder = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export function getAllCities(offers: Offer[]): City[] {
  const result: City[] = [];
  for (const cityName of cityOrder) {
    const offer = offers.find((o) => o.city.name === cityName);
    if (!offer) {
      continue;
    }
    result.push(offer.city);
  }
  return result;
}
