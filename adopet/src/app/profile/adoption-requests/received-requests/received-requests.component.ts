import { Component, OnInit } from '@angular/core';

import { AdoptionRequest } from '../../../models/adoption-request.interface';
import { AdoptionRequestService } from '../../../services/adoption-request/adoption-request.service';

@Component({
  selector: 'app-received-requests',
  templateUrl: './received-requests.component.html'
})
export class ReceivedRequestsComponent implements OnInit {
  successfulRequest = false;
  requests: AdoptionRequest[] = [];

  constructor(private adoptionRequestService: AdoptionRequestService) { }

  ngOnInit() {
    this.adoptionRequestService.getReceivedRequests().subscribe(
      res => {
        this.requests = res;
        this.successfulRequest = true;
      },
      err => console.log(err)
    );
  }
}
