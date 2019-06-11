import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';

import { AdoptionRequest } from '../../../../models/adoption-request.interface';
import { CompleteRequestComponent } from '../../complete-request/complete-request.component';
import { ChatComponent } from '../../chat/chat.component';
import { User } from '../../../../models/user.interface';
import { ImageService } from '../../../../services/image/image.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  @Input() adoptionRequest: AdoptionRequest;
  @Input() user: User;

  constructor(private imageService: ImageService,
    private dialog: MatDialog,
    private router: Router,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() { }

  onCompleteAdoptionRequest() {
    this.dialog.open(CompleteRequestComponent, {
      width: '600px',
      maxHeight: '900px',
      disableClose: true,
      data: this.adoptionRequest
    }).afterClosed().subscribe((request: AdoptionRequest) => {
      if (request) {
        this.adoptionRequest = request;
      }
    });
  }

  onOpenChat() {
    combineLatest(this.imageService.getImageByName(this.adoptionRequest.owner.profileImage, this.adoptionRequest.owner._id),
      this.imageService.getImageByName(this.adoptionRequest.adopter.profileImage, this.adoptionRequest.adopter._id)).subscribe(
        res => {
          this.adoptionRequest.owner.profileImageUrl = URL.createObjectURL(res[0]);
          this.adoptionRequest.adopter.profileImageUrl = URL.createObjectURL(res[1]);

          this.setCurrentUser();

          this.openChat();
        },
        err => console.log(err)
      );
  }

  setCurrentUser() {
    this.user._id === this.adoptionRequest.adopter._id ? this.user.profileImageUrl = this.adoptionRequest.adopter.profileImageUrl
      : this.user.profileImageUrl = this.adoptionRequest.owner.profileImageUrl;
  }

  openChat() {
    this.dialog.open(ChatComponent, {
      width: '1000px',
      maxHeight: '900px',
      data: {
        request: this.adoptionRequest,
        user: this.user
      }
    });
  }

  getDate() {
    const date = this.adoptionRequest.creationDate.toString();
    return date.substring(8, 10) + '.' + date.substring(5, 7) + '.' + date.substring(0, 4);;
  }

  getRequestMessage() {
    return this.adoptionRequest.requestMessage.length < 150 ? this.adoptionRequest.requestMessage :
      this.adoptionRequest.requestMessage.slice(0, 150) + '...'
  }

  displayCompleteRequestButton() {
    return this.adoptionRequest.requestStatus === 'Pending' && this.router.url.includes('received');
  }
}
