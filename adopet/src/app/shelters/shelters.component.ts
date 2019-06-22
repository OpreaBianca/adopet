import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.interface';
import { UserService } from '../services/user/user.service';
import { ImageService } from '../services/image/image.service';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.scss']
})
export class SheltersComponent implements OnInit {
  shelters: User[] = [];

  numberPerPage = 4;
  currentPage = 0;

  constructor(private userService: UserService,
    private imageService: ImageService) { }

  ngOnInit() {
    this.userService.getShelters().subscribe(
      res => {
        this.shelters = res;
        this.setProfileImages();
      },
      err => console.log(err)
    );
  }

  setProfileImages() {
    this.shelters.forEach((shelter: User) => {
      this.setProfileImage(shelter);
    });
  }

  setProfileImage(shelter: User) {
    if (shelter.profileImage !== '') {
      this.imageService.getImageByName(shelter.profileImage, shelter._id).subscribe(
        res => shelter.profileImageUrl = URL.createObjectURL(res),
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

  getSheltersToDisplay() {
    const startIdx = this.currentPage * this.numberPerPage;
    const endIdx = startIdx + this.numberPerPage;
    return this.shelters.slice(startIdx, endIdx);
  }

  isFirstPage() {
    return this.currentPage === 0;
  }

  isLastPage() {
    const numberOfPages = Math.ceil(this.shelters.length / this.numberPerPage);
    return numberOfPages === 0 ? true : this.currentPage === numberOfPages - 1;
  }
}
