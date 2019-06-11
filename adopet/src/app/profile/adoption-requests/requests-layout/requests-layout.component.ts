import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { AdoptionRequest } from '../../../models/adoption-request.interface';
import { User } from '../../../models/user.interface';
import { Pet } from '../../../models/pet.interface';
import { ImageService } from '../../../services/image/image.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-requests-layout',
  templateUrl: './requests-layout.component.html',
  styleUrls: ['./requests-layout.component.scss']
})
export class RequestsLayoutComponent implements OnInit, OnDestroy {
  @Input() requests: AdoptionRequest[] = [];

  user: User;
  numberPerPage = 4;
  currentPage = 0;

  constructor(private imageService: ImageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.requests);
    this.setProfileImages();
  }

  ngOnDestroy() {
    this.requests.forEach((request: AdoptionRequest) => {
      if (request.pet.profileImageUrl) {
        URL.revokeObjectURL(request.pet.profileImageUrl);
      }
    });
  }

  setProfileImages() {
    this.requests.forEach((request: AdoptionRequest) => {
      this.setProfileImage(request.pet);
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

  getRequestsToDisplay() {
    const startIdx = this.currentPage * this.numberPerPage;
    const endIdx = startIdx + this.numberPerPage;
    return this.requests.slice(startIdx, endIdx);
  }

  isFirstPage() {
    return this.currentPage === 0;
  }

  isLastPage() {
    const numberOfPages = Math.ceil(this.requests.length / this.numberPerPage);
    return numberOfPages === 0 ? true : this.currentPage === numberOfPages - 1;
  }
}
