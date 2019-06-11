import { Message } from './message.interface';

export interface LocalAdoptionRequest {
  _id: string;
  petID: string;
  ownerID: string;
  adopterID: string;
  requestMessage: string;
  requestStatus: string;
  creationDate: Date;
  messages: Message[];
}
