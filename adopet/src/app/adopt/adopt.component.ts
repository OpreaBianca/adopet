import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Pet } from '../models/pet.interface';
import { PetService } from '../services/pet/pet.service';
import { ImageService } from '../services/image/image.service';
import { User } from '../models/user.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.scss']
})
export class AdoptComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  pets: Pet[] = [];
  user: User;
  numberPerPage = 8;
  currentPage = 0;

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

  constructor(private petService: PetService,
    private imageService: ImageService,
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    this.petService.getPetsByOwner().subscribe(
      res => {
        this.pets = res;
        this.setProfileImages();
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

  ngOnDestroy() {
    this.pets.forEach((pet: Pet) => {
      if (pet.profileImageUrl) {
        URL.revokeObjectURL(pet.profileImageUrl);
      }
    });
  }

  setProfileImages() {
    this.pets.forEach((pet: Pet) => {
      this.setProfileImage(pet);
    });
  }

  setProfileImage(pet: Pet) {
    if (pet.images.length > 0) {
      this.imageService.getImageByName(pet.images[0]).subscribe(
        res => pet.profileImageUrl = URL.createObjectURL(res),
        err => console.log(err)
      );
    }
  }

  previousPage() {
    this.currentPage -= 1;
  }

  nextPage() {
    this.currentPage += 1;
  }

  getPetsToDisplay() {
    const startIdx = this.currentPage * this.numberPerPage;
    const endIdx = startIdx + this.numberPerPage;
    return this.pets.slice(startIdx, endIdx);
  }

  isFirstPage() {
    return this.currentPage === 0;
  }

  isLastPage() {
    const numberOfPages = Math.ceil(this.pets.length / this.numberPerPage);
    return numberOfPages === 0 ? true : this.currentPage === numberOfPages - 1;
  }
}
