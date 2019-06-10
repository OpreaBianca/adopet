import { Pet } from './pet.interface';
import { User } from './user.interface';

export interface AdoptionRequest {
  _id: string;
  pet: Pet;
  owner: User;
  adopter: User;
  requestMessage: string;
  requestStatus: string;
}
