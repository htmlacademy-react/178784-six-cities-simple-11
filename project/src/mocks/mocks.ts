import { helpers, random } from 'faker';
import { SortType } from '../enums/sort-type.enum';
import { UserData } from '../types/auth-data';
import { City, Comment, Host, Offer } from '../types/types';
import { configureMockStore, MockStoreCreator } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../services/api';
import { Action } from '@reduxjs/toolkit';
import { State } from 'history';
import { RatingType } from '../enums/rating-type.enum';
import MockAdapter from 'axios-mock-adapter';

const CITY_1: City = {
  name: 'Cologne',
  location: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13
  }
};

const CITY_2: City = {
  name: 'Dusseldorf',
  location: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  }
};

const OFFER_1: Offer = {
  city: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  previewImage: 'https://11.react.pages.academy/static/hotel/1.jpg',
  images: [
    'https://11.react.pages.academy/static/hotel/13.jpg',
    'https://11.react.pages.academy/static/hotel/14.jpg',
    'https://11.react.pages.academy/static/hotel/19.jpg',
    'https://11.react.pages.academy/static/hotel/5.jpg',
    'https://11.react.pages.academy/static/hotel/11.jpg',
    'https://11.react.pages.academy/static/hotel/1.jpg',
    'https://11.react.pages.academy/static/hotel/3.jpg',
    'https://11.react.pages.academy/static/hotel/2.jpg',
    'https://11.react.pages.academy/static/hotel/20.jpg',
    'https://11.react.pages.academy/static/hotel/8.jpg',
    'https://11.react.pages.academy/static/hotel/4.jpg',
    'https://11.react.pages.academy/static/hotel/15.jpg',
    'https://11.react.pages.academy/static/hotel/10.jpg',
    'https://11.react.pages.academy/static/hotel/16.jpg'
  ],
  title: 'Loft Studio in the Central Area',
  isPremium: true,
  rating: 4.4,
  type: 'house',
  bedrooms: 5,
  maxAdults: 7,
  price: 543,
  goods: [
    'Towels',
    'Breakfast',
    'Laptop friendly workspace',
    'Air conditioning',
    'Washer',
    'Baby seat'
  ],
  host: {
    id: 25,
    name: 'Angelina',
    isPro: true,
    avatarUrl: 'img/avatar-angelina.jpg'
  },
  description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
  location: {
    latitude: 50.954361,
    longitude: 6.982974,
    zoom: 16
  },
  id: 1
};

const OFFER_2: Offer = {
  city: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  previewImage: 'https://11.react.pages.academy/static/hotel/20.jpg',
  images: [
    'https://11.react.pages.academy/static/hotel/5.jpg',
    'https://11.react.pages.academy/static/hotel/8.jpg',
    'https://11.react.pages.academy/static/hotel/3.jpg',
    'https://11.react.pages.academy/static/hotel/4.jpg',
    'https://11.react.pages.academy/static/hotel/15.jpg',
    'https://11.react.pages.academy/static/hotel/11.jpg',
    'https://11.react.pages.academy/static/hotel/13.jpg',
    'https://11.react.pages.academy/static/hotel/19.jpg',
    'https://11.react.pages.academy/static/hotel/1.jpg',
    'https://11.react.pages.academy/static/hotel/16.jpg',
    'https://11.react.pages.academy/static/hotel/14.jpg',
    'https://11.react.pages.academy/static/hotel/18.jpg',
    'https://11.react.pages.academy/static/hotel/2.jpg',
    'https://11.react.pages.academy/static/hotel/10.jpg'
  ],
  title: 'Penthouse, 4-5 rooms + 5 balconies',
  isPremium: false,
  rating: 2.2,
  type: 'house',
  bedrooms: 2,
  maxAdults: 4,
  price: 870,
  goods: [
    'Coffee machine',
    'Cable TV',
    'Breakfast',
    'Washing machine',
    'Towels',
    'Washer',
    'Dishwasher',
    'Baby seat',
    'Fridge',
    'Laptop friendly workspace',
    'Air conditioning'
  ],
  host: {
    id: 25,
    name: 'Angelina',
    isPro: true,
    avatarUrl: 'img/avatar-angelina.jpg'
  },
  description: 'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
  location: {
    latitude: 50.833557,
    longitude: 4.374696999999999,
    zoom: 16
  },
  id: 2
};

const OFFER_3: Offer = {
  city: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
  previewImage: 'https://11.react.pages.academy/static/hotel/17.jpg',
  images: [
    'https://11.react.pages.academy/static/hotel/13.jpg',
    'https://11.react.pages.academy/static/hotel/1.jpg',
    'https://11.react.pages.academy/static/hotel/19.jpg',
    'https://11.react.pages.academy/static/hotel/7.jpg',
    'https://11.react.pages.academy/static/hotel/5.jpg',
    'https://11.react.pages.academy/static/hotel/2.jpg',
    'https://11.react.pages.academy/static/hotel/17.jpg',
    'https://11.react.pages.academy/static/hotel/11.jpg',
    'https://11.react.pages.academy/static/hotel/10.jpg',
    'https://11.react.pages.academy/static/hotel/4.jpg',
    'https://11.react.pages.academy/static/hotel/16.jpg',
    'https://11.react.pages.academy/static/hotel/12.jpg',
    'https://11.react.pages.academy/static/hotel/8.jpg',
    'https://11.react.pages.academy/static/hotel/3.jpg'
  ],
  title: 'The house among olive',
  isPremium: false,
  rating: 3.5,
  type: 'apartment',
  bedrooms: 3,
  maxAdults: 7,
  price: 360,
  goods: [
    'Washer',
    'Laptop friendly workspace',
    'Air conditioning',
    'Baby seat',
    'Breakfast'
  ],
  host: {
    id: 25,
    name: 'Angelina',
    isPro: true,
    avatarUrl: 'img/avatar-angelina.jpg'
  },
  description: 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
  location: {
    latitude: 51.236402000000005,
    longitude: 6.784314,
    zoom: 16
  },
  id: 3
};

const COMMENT_1: Comment = {
  id: 1,
  user: {
    id: 16,
    isPro: true,
    name: 'Mollie',
    avatarUrl: 'https://11.react.pages.academy/static/avatar/7.jpg',
    email: '',
    token: ''
  },
  rating: 4,
  comment: 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
  date: '2022-10-12T13:58:46.499Z'
};

const COMMENT_2: Comment = {
  id: 2,
  user: {
    id: 12,
    isPro: true,
    name: 'Isaac',
    avatarUrl: 'https://11.react.pages.academy/static/avatar/3.jpg',
    email: '',
    token: ''
  },
  rating: 5,
  comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
  date: '2022-10-12T13:58:46.499Z'
};

const USER_1: UserData = {
  id: 1,
  email: 'Oliver.conner@gmail.com',
  name: 'Oliver.conner',
  avatarUrl: 'https://11.react.pages.academy/static/avatar/6.jpg',
  isPro: false,
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
};

const USER_2: UserData = {
  id: 1,
  email: 'ivan@gmail.com',
  name: 'ivan',
  avatarUrl: 'https://11.react.pages.academy/static/avatar/5.jpg',
  isPro: false,
  token: 'aXZhbkBnbWFpbC5jb20='
};

const HOST_1: Host = {
  id: 25,
  name: 'Angelina',
  isPro: true,
  avatarUrl: 'img/avatar-angelina.jpg'
};

const HOST_2: Host = {
  id: 23,
  name: 'Nikita',
  isPro: false,
  avatarUrl: 'img/avatar-nikita.jpg'
};


let currentId = 1;
export const makeFakeId = (): number => currentId++;
export const makeFakeOffer = (): Offer => helpers.randomize<Offer>([OFFER_1, OFFER_2, OFFER_3]);
export const makeFakeCity = (): City => helpers.randomize<City>([CITY_1, CITY_2]);
export const makeFakeHost = (isPro: boolean): Host => isPro ? HOST_1 : HOST_2;
export const makeFakeSort = (): SortType => helpers.randomize<SortType>([SortType.PriceHithToLow, SortType.PriceLowToHigh, SortType.Pupular, SortType.TopRatedFirst]);
export const makeFakeRatingType = (): RatingType => helpers.randomize<RatingType>([RatingType.PlaceCard,
  RatingType.Property, RatingType.Review]);
export const makeFakeComment = (): Comment => helpers.randomize<Comment>([COMMENT_1, COMMENT_2]);
export const makeFakeUser = (): UserData => helpers.randomize<UserData>([USER_1, USER_2]);
export const makeFakeText = (length: number) => random.alpha({count: length});

export const makeFakeOffers = (): Offer[] => [OFFER_1, OFFER_2, OFFER_3];
export const makeFakeComments = (): Comment[] => [COMMENT_1, COMMENT_2];
export const makeFakeCities = (): City[] => [CITY_1, CITY_2];
export const getFakeStoreCreator = () => {
  const api = createApi();
  const middlewares = [thunk.withExtraArgument(api)];

  const creator = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  return creator;
};

export const getFakeStoreCreatorWithMockApi = (): [MockStoreCreator, MockAdapter] => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);

  const middlewares = [thunk.withExtraArgument(api)];

  const creator = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  return [creator, mockAPI];
};
