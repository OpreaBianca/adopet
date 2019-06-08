import { Component, OnInit } from '@angular/core';

import { Pet } from '../../models/pet.interface';
import { PetService } from '../../services/pet/pet.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  successfulRequest = false;
  pets: Pet[] = [];

  constructor(private petService: PetService) { }

  ngOnInit() {
    this.petService.getFavoritePets().subscribe(
      res => {
        this.pets = res;
        this.successfulRequest = true;
      },
      err => console.log(err)
    )
  }
}
