import { Component, OnInit } from '@angular/core';

import { Pet } from '../../models/pet.interface';
import { PetService } from '../../services/pet/pet.service';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html'
})
export class MyPetsComponent implements OnInit {
  successfulRequest = false;
  pets: Pet[] = [];

  constructor(private petService: PetService) { }

  ngOnInit() {
    this.petService.getPetsByOwner().subscribe(
      res => {
        this.pets = res;
        this.successfulRequest = true;
      },
      err => console.log(err)
    )
  }
}
