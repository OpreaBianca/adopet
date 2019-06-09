export interface LocalAdoptionRequest {
  _id: string;
  petID: string;
  ownerID: string;
  adopterID: string;
  requestMessage: string;
}
