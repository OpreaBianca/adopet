import { Component, OnInit } from '@angular/core';

import { AdoptionRequest } from '../../../models/adoption-request.interface';
import { AdoptionRequestService } from '../../../services/adoption-request/adoption-request.service';

@Component({
  selector: 'app-sent-requests',
  templateUrl: './sent-requests.component.html'
})
export class SentRequestsComponent implements OnInit {
  successfulRequest = false;
  requests: AdoptionRequest[] = [];

  constructor(private adoptionRequestService: AdoptionRequestService) { }

  ngOnInit() {
    this.adoptionRequestService.getSentRequests().subscribe(
      res => {
        this.requests = res;
        this.successfulRequest = true;
      },
      err => console.log(err)
    );
  }
}
