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
  displayedPets: Pet[] = [];

  isFullPage = true;

  genders = ['any', 'Female', 'Male'];
  goodWith = ['Kids', 'Elders', 'People with disabilities', 'Dogs', 'Cats', 'Other animals'];
  categories = ['any', 'Dog', 'Cat', 'Rabbit', 'Fish'];
  ageRanges = ['any', '< 1 years', '1 - 5 years', '> 5 years'];
  fitFor = ['Apartment', 'House', 'Outdoor'];
  locations = ['Bucharest', 'Teleorman', 'Constanta', 'Cluj', 'Brasov', 'Bacau'];
  sizes = ['any', 'Small', 'Medium', 'Large'];
  actions = [
    { name: 'any' },
    { name: 'adopt or foster', status: 'Placed for adoption/foster' },
    { name: 'find my lost pet', status: 'Looking for the owner' }
  ]

  constructor(private petService: PetService) { }

  ngOnInit() {
    this.petService.getAllPets().subscribe(
      res => {
        this.pets = res;
        this.displayedPets = [...this.pets];
        this.successfulRequest = true;
      },
      err => console.log(err)
    )

    this.searchForm = new FormGroup({
      action: new FormControl(this.actions[0]),
      category: new FormControl('any'),
      location: new FormControl(''),
      gender: new FormControl('any'),
      ageRange: new FormControl('any'),
      size: new FormControl('any'),
      goodWith: new FormControl(''),
      fitFor: new FormControl('')
    });
  }

  onSubmit() {
    this.displayedPets = [...this.pets];

    const action = this.searchForm.get('action').value;
    if (action.name !== 'any') {
      this.displayedPets = this.displayedPets.filter((pet: Pet) => {
        return pet.status === action.status;
      });
    }

    const category = this.searchForm.get('category').value;
    if (category !== 'any') {
      this.displayedPets = this.displayedPets.filter((pet: Pet) => {
        return pet.category === category;
      });
    }

    const locations = this.searchForm.get('location').value;
    if (locations !== '' && locations.length !== 0) {
      this.displayedPets = this.displayedPets.filter((pet: Pet) => {
        let tempLocations = locations.filter(location => pet.location.includes(location));
        return tempLocations.length !== 0;
      });
    }

    const ageRange = this.searchForm.get('ageRange').value;
    if (ageRange !== 'any') {
      this.displayedPets = this.displayedPets.filter((pet: Pet) => {
        if (ageRange.includes('<')) {
          return pet.ageMeasurementUnit !== 'Years';
        } else if (ageRange.includes('-')) {
          return pet.ageMeasurementUnit === 'Years' && pet.ageNumber <= 5;
        } else {
          return pet.ageMeasurementUnit === 'Years' && pet.ageNumber > 5;
        }
      });
    }

    const size = this.searchForm.get('size').value;
    if (size !== 'any') {
      this.displayedPets = this.displayedPets.filter((pet: Pet) => {
        return pet.size === size;
      });
    }

    const gender = this.searchForm.get('gender').value;
    if (gender !== 'any') {
      this.displayedPets = this.displayedPets.filter((pet: Pet) => {
        return pet.gender === gender;
      });
    }

    const goodWith = this.searchForm.get('goodWith').value;
    if (goodWith !== '' && goodWith.length !== 0) {
      this.displayedPets = this.displayedPets.filter((pet: Pet) => {
        let tempGoodWith = goodWith.filter(gw => pet.goodWith.includes(gw));
        return tempGoodWith.length !== 0;
      });
    }

    const fitFor = this.searchForm.get('fitFor').value;
    if (fitFor !== '' && fitFor.length !== 0) {
      this.displayedPets = this.displayedPets.filter((pet: Pet) => {
        let tempFitFor = fitFor.filter(ff => pet.fitFor.includes(ff));
        return tempFitFor.length !== 0;
      });
    }
  }

  clearFilters() {
    this.searchForm.patchValue({
      action: this.actions[0],
      category: 'any',
      location: '',
      gender: 'any',
      ageRange: 'any',
      size: 'any',
      goodWith: '',
      fitFor: ''
    });
    this.displayedPets = [...this.pets];
  }
}
