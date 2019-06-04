import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { Pet } from '../../../models/pet.interface';
import { EditPetComponent } from '../edit-pet/edit-pet.component';
import { ImageService } from '../../../services/image/image.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  @Input() pet: Pet;

  displayDetails = false;

  constructor(private imageService: ImageService,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() { }

  editPet() {
    this.dialog.open(EditPetComponent, {
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
