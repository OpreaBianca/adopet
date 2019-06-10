import { Component, OnInit, OnDestroy } from '@angular/core';

import { Pet } from '../../../models/pet.interface';
import { AdoptionRequest } from '../../../models/adoption-request.interface';
import { AdoptionRequestService } from '../../../services/adoption-request/adoption-request.service';
import { ImageService } from '../../../services/image/image.service';

@Component({
  selector: 'app-received-requests',
  templateUrl: './received-requests.component.html',
  styleUrls: ['./received-requests.component.scss']
})
export class ReceivedRequestsComponent implements OnInit, OnDestroy {
  requests: AdoptionRequest[] = [];
  numberPerPage = 4;
  currentPage = 0;

  constructor(private adoptionRequestService: AdoptionRequestService,
    private imageService: ImageService) { }

  ngOnInit() {
    this.adoptionRequestService.getReceivedRequests().subscribe(
      res => {
        this.requests = res;
        this.setProfileImages();
      },
      err => console.log(err)
    );
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
