export interface Event {
  _id: string,
  name: string,
  organizer: string, // auto complete cu numele utilizatorului curent
  date: Date,
  location: string,
  address: string,
  description: string,
  creatorID: string,
  image: string,
  imageUrl: string
}