import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { AdoptionRequest } from '../../../../models/adoption-request.interface';
import { CompleteRequestComponent } from '../../complete-request/complete-request.component';
import { ChatComponent } from '../../chat/chat.component';
import { User } from '../../../../models/user.interface';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  @Input() adoptionRequest: AdoptionRequest;
  @Input() user: User;

  constructor(private dialog: MatDialog,
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
    this.dialog.open(ChatComponent, {
      width: '1000px',
      maxHeight: '900px',
      disableClose: true,
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
}
