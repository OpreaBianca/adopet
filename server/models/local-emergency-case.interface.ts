export interface LocalEmergencyCase {
  _id?: string;
  lat: number;
  lng: number;
  address: string,
  name: string;
  phone: number;
  description: string;
  creationDate: Date;
  takenOverID: string;
  takenOverName: string;
  takenOverPhone: string;
}