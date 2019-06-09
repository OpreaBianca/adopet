import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../models/user.interface';
import { AdoptionRequest } from '../../models/adoption-request.interface';
import { PetComponent } from '../../layout/pets-layout/pet/pet.component';
import { ImageService } from '../../services/image/image.service';
import { AdoptionRequestService } from '../../services/adoption-request/adoption-request.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.scss']
})
export class MoreDetailsComponent implements OnInit {
  adoptionRequestFrom: FormGroup;
  submittedForm = false;
  isMoreDetailsPage = true;
  currentIdx = 0;

  imageURLs: string[] = [];
  user: User;

  constructor(private imageService: ImageService,
    private adoptionRequestService: AdoptionRequestService,
    private authService: AuthService,
    private domSanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<PetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.imageURLs.push(this.data.pet.profileImageUrl);
    this.getAllImages();

    this.user = this.authService.getUser();

    this.adoptionRequestFrom = new FormGroup({
      petID: new FormControl(this.data.pet._id),
      ownerID: new FormControl(this.data.pet.ownerID),
      adopterID: new FormControl(this.user._id),
      requestMessage: new FormControl('', Validators.required)
    });
  }

  getAllImages() {
    for (let i = 1; i < this.data.pet.images.length; i++) {
      this.imageService.getImageByName(this.data.pet.images[i], this.data.pet.ownerID).subscribe(
        res => this.imageURLs.push(URL.createObjectURL(res)),
        err => console.log(err)
      );
    }
  }

  onAdoptPet() {
    this.isMoreDetailsPage = false;
  }

  onBack() {
    this.isMoreDetailsPage = true;
  }

  onSendAdoptionRequest() {
    if (this.adoptionRequestFrom.valid) {
      this.submittedForm = true;

      this.adoptionRequestService.createRequest(this.adoptionRequestFrom.value).subscribe(
        res => this.onClose(),
        err => console.log(err)
      );
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  getAge() {
    return `${this.data.pet.ageNumber} ${this.data.pet.ageMeasurementUnit}`;
  }

  previousImage() {
    this.currentIdx -= 1;
  }

  nextImage() {
    this.currentIdx += 1;
  }

  isFirstImage() {
    return this.currentIdx === 0 || this.data.pet.images.length === 0;
  }

  isLastImage() {
    return this.currentIdx === this.data.pet.images.length - 1 || this.data.pet.images.length === 0;
  }
}
