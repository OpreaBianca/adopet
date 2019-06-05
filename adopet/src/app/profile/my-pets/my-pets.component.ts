import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddPetComponent } from './add-pet/add-pet.component';
import { Pet } from '../../models/pet.interface';
import { PetService } from '../../services/pet/pet.service';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.scss']
})
export class MyPetsComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  numberPerPage = 8;
  currentPage = 0;

  constructor(private petService: PetService,
    private imageService: ImageService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.petService.getPetsByOwner().subscribe(
      res => {
        this.pets = res;
        this.setProfileImages();
      },
      err => console.log(err)
    )
  }

  ngOnDestroy() {
    this.pets.forEach((pet: Pet) => {
      if (pet.profileImageUrl) {
        URL.revokeObjectURL(pet.profileImageUrl);
      }
    });
  }

  addPet() {
    this.dialog.open(AddPetComponent, {
      width: '1000px',
      maxHeight: '850px',
      disableClose: true
    }).afterClosed().subscribe((pet: Pet) => {
      if (pet) {
        this.setProfileImage(pet);
        this.pets.unshift(pet);
      }
    });
  }

  removePet(pet: Pet) {
    const petIdx = this.pets.findIndex((currentPet: Pet) => currentPet._id === pet._id);
    this.pets.splice(petIdx, 1);
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
