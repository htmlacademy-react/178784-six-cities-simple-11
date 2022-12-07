import dayjs from 'dayjs';
import { SortType } from '../enums/sort-type.enum';
import { Comment, Offer } from '../types/types';

export function getSortFunction(sortType: SortType): (offer1: Offer, offer2: Offer) => number {
  switch(sortType) {
    case SortType.Pupular:
      return (a: Offer, b: Offer) => 0;
    case SortType.PriceHithToLow:
      return (a: Offer, b: Offer) => b.price - a.price;
    case SortType.PriceLowToHigh:
      return (a: Offer, b: Offer) => a.price - b.price;
    case SortType.TopRatedFirst:
      return (a: Offer, b: Offer) => b.rating - a.rating;
  }
}

export function sortComments(a: Comment, b: Comment): number {
  return dayjs(b.date).diff(dayjs(a.date));
}
