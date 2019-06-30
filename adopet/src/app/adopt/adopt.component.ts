import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Pet } from '../models/pet.interface';
import { PetService } from '../services/pet/pet.service';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.scss']
})
export class AdoptComponent implements OnInit {
  searchForm: FormGroup;
  successfulRequest = false;
  submittedForm = false;
  pets: Pet[] = [];

  genders = ['Female', 'Male'];
  goodWith = ['Kids', 'Elders', 'People with disabilities', 'Dogs', 'Cats', 'Other animals'];
  categories = ['Dog', 'Cat', 'Rabbit', 'Fish'];
  ageRanges = ['< 1 years', '1 - 5 years', '> 5 years'];
  fitFor = ['Apartment', 'House', 'Outdoor'];
  locations = ['Bucharest', 'Teleorman'];
  sizes = ['Small', 'Medium', 'Large'];
  actions = [
    { name: 'adopt or foster', status: 'Placed for adoption/foster' },
    { name: 'find my lost pet', status: 'Looking for the owner' }
  ]

  constructor(private petService: PetService) { }

  ngOnInit() {
    this.petService.getAllPets().subscribe(
      res => {
        this.pets = res;
        this.successfulRequest = true;
      },
      err => console.log(err)
    )

    this.searchForm = new FormGroup({
      action: new FormControl(''),
      category: new FormControl(''),
      location: new FormControl(''),
      gender: new FormControl(''),
      ageRange: new FormControl(''),
      size: new FormControl(''),
      goodWith: new FormControl(''),
      fitFor: new FormControl('')
    });
  }

  onSubmit() { }
}
