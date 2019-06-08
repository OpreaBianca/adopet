import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Pet } from '../../models/pet.interface';
import { ImageService } from '../../services/image/image.service';
import { AddPetComponent } from '../../profile/my-pets/add-pet/add-pet.component';
import { User } from '../../models/user.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-pets-layout',
  templateUrl: './pets-layout.component.html',
  styleUrls: ['./pets-layout.component.scss']
})
export class PetsLayoutComponent implements OnInit, OnDestroy {
  @Input() pets: Pet[] = [];

  user: User;
  numberPerPage = 8;
  currentPage = 0;

  constructor(private imageService: ImageService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.setProfileImages();
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
      this.imageService.getImageByName(pet.images[0], pet.ownerID).subscribe(
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

  isMyPetsPage() {
    return this.router.url === '/profile/my-pets';
  }
}
