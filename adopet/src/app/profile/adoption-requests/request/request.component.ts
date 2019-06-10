import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { AdoptionRequest } from '../../../models/adoption-request.interface';
import { CompleteRequestComponent } from '../complete-request/complete-request.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  @Input() adoptionRequest: AdoptionRequest;

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

  onOpenComments() {
    this.dialog.open(ChatComponent, {
      width: '600px',
      maxHeight: '900px',
      disableClose: true,
      data: this.adoptionRequest
    });
  }

  getRequestMessage() {
    return this.adoptionRequest.requestMessage.length < 150 ? this.adoptionRequest.requestMessage :
      this.adoptionRequest.requestMessage.slice(0, 150) + '...'
  }
}
