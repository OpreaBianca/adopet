import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AdoptionRequest } from '../../../models/adoption-request.interface';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  @Input() adoptionRequest: AdoptionRequest;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() { }

  getRequestMessage() {
    return this.adoptionRequest.requestMessage.length < 150 ? this.adoptionRequest.requestMessage :
      this.adoptionRequest.requestMessage.slice(0, 150) + '...'
  }
}
