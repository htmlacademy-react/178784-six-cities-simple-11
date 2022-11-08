export type Nullable<T> = T | null;

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: string;
  location: Location;
}

export type WithHostProps = {
  host: Host;
}

export type WithOfferProps = {
  offer: Offer;
}

export type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Offer = {
  id: number;
  city: City;
  title: string;
  previewImage: string;
  images: string[];
  description: string;
  isPremium: boolean;
  type: string;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  price: number;
  host: Host;
  goods: string[];
  location: Location;
}
