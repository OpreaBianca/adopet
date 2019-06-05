import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { Pet } from '../../../models/pet.interface';
import { AddPetComponent } from '../add-pet/add-pet.component';
import { ImageService } from '../../../services/image/image.service';
import { DeletePetComponent } from '../delete-pet/delete-pet.component';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  @Input() pet: Pet;
  @Output() removedPet = new EventEmitter<Pet>();

  displayDetails = false;

  constructor(private imageService: ImageService,
    private dialog: MatDialog,
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

  setProfileImage(pet: Pet) {
    if (pet.images.length > 0) {
      this.imageService.getImageByName(pet.images[0]).subscribe(
        res => pet.profileImageUrl = URL.createObjectURL(res),
        err => console.log(err)
      );
    }
  }

  isLoading() {
    return !this.pet.profileImageUrl && this.pet.images.length > 0;
  }

  getAge() {
    return `${this.pet.ageNumber} ${this.pet.ageMeasurementUnit}`;
  }

  getDescription() {
    return this.pet.description.length < 195 ? this.pet.description : this.pet.description.slice(0, 195) + '...';
  }
}
