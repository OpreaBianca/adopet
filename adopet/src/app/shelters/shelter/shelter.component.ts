import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { User } from '../../models/user.interface';

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.scss']
})
export class ShelterComponent implements OnInit {
  @Input() shelter: User;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() { }

  displayMediaColumn() {
    return this.shelter.website || this.shelter.facebook ||
      this.shelter.instagram || this.shelter.twitter;
  }
}
