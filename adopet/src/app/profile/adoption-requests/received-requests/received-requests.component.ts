import { Component, OnInit } from '@angular/core';

import { AdoptionRequest } from 'src/app/models/adoption-request.interface';
import { AdoptionRequestService } from '../../../services/adoption-request/adoption-request.service';

@Component({
  selector: 'app-received-requests',
  templateUrl: './received-requests.component.html',
  styleUrls: ['./received-requests.component.scss']
})
export class ReceivedRequestsComponent implements OnInit {
  requests: AdoptionRequest[] = [];

  constructor(private adoptionRequestService: AdoptionRequestService) { }

  ngOnInit() {
    this.adoptionRequestService.getReceivedRequests().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }
}
