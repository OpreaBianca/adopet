import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.scss']
})
export class MyPetsComponent implements OnInit {
  pets: any[] = [{
    id: 1,
    name: 'Pumpkin',
    location: 'Bucharest',
    category: 'Cat',
    age: '2',
    size: 'Small',
    gender: 'Female',
    fitFor: 'Apartment',
    goodWith: 'Kids',
    description: `Pumpkin is a sweet lady that has had a hard life. She came in with her kittens and 
    now that all but one of her babies have been adopted.. it's Pumpkin's time to shine! Pumpkin is 
    the sweetest and she is becoming a sassy and confident lady! She deserves a great life.`,
    status: 'Placed for adoption',
    adopter: {
      id: 1,
      name: 'Bianca Oprea',
      email: 'bianca@gmail.com',
      phone: '1234567890',
      address: 'str. Fabricii, nr. 53',
      otherDetails: ''
    },
    shelter: {
      id: 1,
      name: 'Asociatia Pisici pe Creier',
      email: 'a@a',
      phone: '1234567890',
      address: 'str Iuliu Maniu',
    }
  }];

  constructor() { }

  ngOnInit() {
  }

}
