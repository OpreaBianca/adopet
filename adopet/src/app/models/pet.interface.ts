import { Adopter } from './adopter.interface';

export interface Pet {
  _id?: string;
  name: string;
  category: string;
  location: string[];
  gender: string;
  ageNumber: number;
  ageMeasurementUnit: string;
  size: string;
  fitFor: string[];
  goodWith: string[];
  status: string;
  description: string;
  foster: Adopter;
  adopter: Adopter;
  fosterFormVisibile: boolean;
  images: string[];
  profileImageUrl: string;
  ownerID: string;
}
