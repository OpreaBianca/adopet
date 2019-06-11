import { Pet } from './pet.interface';
import { User } from './user.interface';
import { Message } from './message.interface';

export interface AdoptionRequest {
  _id: string;
  pet: Pet;
  owner: User;
  adopter: User;
  requestMessage: string;
  requestStatus: string;
  creationDate: Date;
  messages: Message[];
}
