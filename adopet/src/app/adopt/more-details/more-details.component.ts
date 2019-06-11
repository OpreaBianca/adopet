import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../models/user.interface';
import { PetComponent } from '../../layout/pets-layout/pet/pet.component';
import { ImageService } from '../../services/image/image.service';
import { AdoptionRequestService } from '../../services/adoption-request/adoption-request.service';
import { AuthService } from '../../auth/auth.service';
import { LocalAdoptionRequest } from '../../models/local-adoption-request.interface';
import { Message } from '../../models/message.interface';

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
      requestMessage: new FormControl('', Validators.required),
      requestStatus: new FormControl('Pending'),
      creationDate: new FormControl(new Date())
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
      let request: LocalAdoptionRequest = this.adoptionRequestFrom.value;
      const message: Message = {
        userID: this.user._id,
        text: this.adoptionRequestFrom.get('requestMessage').value,
        date: new Date()
      }
      request.messages = [message];

      this.adoptionRequestService.createRequest(request).subscribe(
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
