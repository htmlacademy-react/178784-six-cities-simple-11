import { toast } from 'react-toastify';
import { Offer } from '../types/types';

export function getOfferById(offers: Offer[], id: string | undefined) {
  const offerIndex = offers.findIndex((o) => id && o.id === +id);
  if (offerIndex < 0) {
    const error = `Could not get offer by id: ${id ?? 'undefined'}`;
    toast.error(error);
    throw Error(error);
  }
  return offers[offerIndex];
}
