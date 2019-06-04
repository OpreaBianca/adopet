import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Pet } from '../../../models/pet.interface';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  @Input() pet: Pet;

  displayDetails = false;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() { }

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
