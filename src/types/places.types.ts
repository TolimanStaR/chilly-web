export type PlaceInfo = {
  id: number;
  name: string;
  address: string;
  website: string;
  rating: number;
  images: string[];
  phone: string;
  social: string[];
  openHours: string[];
  latitude: number;
  longitude: number;
  ypage: string;
}

export type PlaceInfoFormData = {
  name: string;
  address: string;
  website: string;
  rating: number;
  images: { value: string }[];
  phone: string;
  social: { value: string }[];
  openHours: { value: string }[];
  latitude: number;
  longitude: number;
  ypage: string;
};
