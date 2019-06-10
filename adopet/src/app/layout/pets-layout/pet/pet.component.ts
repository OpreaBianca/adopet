import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Pet } from '../../../models/pet.interface';
import { User } from '../../../models/user.interface';
import { ImageService } from '../../../services/image/image.service';
import { PetService } from '../../../services/pet/pet.service';

import { AddPetComponent } from '../../../profile/my-pets/add-pet/add-pet.component';
import { DeletePetComponent } from '../../../profile/my-pets/delete-pet/delete-pet.component';
import { MoreDetailsComponent } from '../../../adopt/more-details/more-details.component';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  @Input() pet: Pet;
  @Input() user: User;
  @Output() removedPet = new EventEmitter<Pet>();

  displayDetails = false;

  constructor(private petService: PetService,
    private imageService: ImageService,
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() { }

  editPet() {
    this.dialog.open(AddPetComponent, {
      width: '1000px',
      maxHeight: '900px',
      disableClose: true,
      data: this.pet
    }).afterClosed().subscribe((updatedPet: Pet) => {
      if (updatedPet) {
        this.setProfileImage(updatedPet);
        this.pet = updatedPet;
      }
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

  deletePet() {
    this.dialog.open(DeletePetComponent, {
      width: '600px',
      maxHeight: '900px',
      disableClose: true,
      data: this.pet
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.removedPet.emit(this.pet);
      }
    });
  }

  viewPetDetails() {
    this.userService.getUserById(this.pet.ownerID).subscribe(
      res => this.openMoreDetailsPopUp(res),
      err => console.log(err)
    );
  }

  openMoreDetailsPopUp(owner: User) {
    this.dialog.open(MoreDetailsComponent, {
      width: '1000px',
      maxHeight: '900px',
      disableClose: true,
      data: { pet: this.pet, owner: owner }
    });
  }

  addToFavorites() {
    this.pet.favorites.push(this.user._id);

    this.petService.updatePetFavorites(this.pet).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  removeFromFavorites() {
    const idx = this.pet.favorites.findIndex((userId: string) => userId === this.user._id);
    this.pet.favorites.splice(idx, 1);

    this.petService.updatePetFavorites(this.pet).subscribe(
      res => {
        if (this.router.url === '/profile/favorites') {
          this.removedPet.emit(this.pet);
        }
      },
      err => console.log(err)
    );
  }

  isMyPetsPage() {
    return this.router.url === '/profile/my-pets';
  }

  isFavorite() {
    const idx = this.pet.favorites.findIndex((userId: string) => userId === this.user._id);
    return idx !== -1;
  }

  isLoading() {
    return !this.pet.profileImageUrl && this.pet.images.length > 0;
  }

  getAge() {
    return `${this.pet.ageNumber} ${this.pet.ageMeasurementUnit}`;
  }

  getDescription() {
    return this.pet.description.length < 150 ? this.pet.description : this.pet.description.slice(0, 150) + '...';
  }
}
