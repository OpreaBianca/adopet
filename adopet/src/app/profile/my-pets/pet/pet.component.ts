import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  @Input() pet: any;

  displayDetails = false;

  constructor() { }

  ngOnInit() {
  }

}
