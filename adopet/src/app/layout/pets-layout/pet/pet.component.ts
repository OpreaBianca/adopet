import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Pet } from '../../../models/pet.interface';
import { AddPetComponent } from '../../../profile/my-pets/add-pet/add-pet.component';
import { ImageService } from '../../../services/image/image.service';
import { DeletePetComponent } from '../../../profile/my-pets/delete-pet/delete-pet.component';
import { User } from '../../../models/user.interface';
import { PetService } from '../../../services/pet/pet.service';

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
    private dialog: MatDialog,
    private router: Router,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() { }

  editPet() {
    this.dialog.open(AddPetComponent, {
      width: '1000px',
      maxHeight: '850px',
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
      maxHeight: '850px',
      disableClose: true,
      data: this.pet
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.removedPet.emit(this.pet);
      }
    })
  }

  viewPetDetails() {

  }

  addToFavorites() {
    this.pet.favorites.push(this.user._id);
    this.updatePet();
  }

  removeFromFavorites() {
    const idx = this.pet.favorites.findIndex((userId: string) => userId === this.user._id);
    this.pet.favorites.splice(idx, 1);

    this.updatePet();

    if (this.router.url === '/profile/favorites') {
      this.removedPet.emit(this.pet);
    }
  }

  updatePet() {
    this.petService.updatePetFavorites(this.pet).subscribe(
      res => console.log(res),
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
