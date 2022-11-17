import { Nullable, Offer } from './types';

export type ReduceState = {
  activeCityName: string;
  offers: Offer[];
  activeOfferId: Nullable<number>;
}
