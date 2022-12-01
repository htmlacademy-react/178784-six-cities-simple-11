import { toast } from 'react-toastify';
import { City, Offer, Point } from '../types/types';

export function getOfferById(offers: Offer[], id: string | undefined) {
  const offerIndex = offers.findIndex((o) => id && o.id === +id);
  if (offerIndex < 0) {
    const error = `Could not get offer by id: ${id ?? 'undefined'}`;
    toast.error(error);
    throw Error(error);
  }
  return offers[offerIndex];
}

export function getPoints(offers: Offer[]): Point[] {
  return offers.map((offer) => getPoint(offer));
}

export function getPoint(offer: Offer): Point {
  return { id: offer.id, ...offer.location };
}

const cityOrder = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export function getAllCities(offers: Offer[]): City[] {
  const result: City[] = [];
  for(const cityName of cityOrder) {
    const offer = offers.find((o) => o.city.name === cityName);
    if (!offer) {
      continue;
    }
    result.push(offer.city);
  }
  return result;
}
