import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-add-adopter',
  templateUrl: './add-adopter.component.html',
  styleUrls: ['./add-adopter.component.scss']
})
export class AddAdopterComponent implements OnInit {
  addAdopterForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.addAdopterForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('' /*Validators.pattern(phoneNumberPattern)*/),
      address: new FormControl(''),
      otherDetails: new FormControl('')
    });
  }

}
