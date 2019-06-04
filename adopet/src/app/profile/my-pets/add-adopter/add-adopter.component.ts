import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

import { Adopter } from '../../../models/adopter.interface';

@Component({
  selector: 'app-add-adopter',
  templateUrl: './add-adopter.component.html',
  styleUrls: ['./add-adopter.component.scss']
})
export class AddAdopterComponent implements OnInit {
  @Input() formTitle: string;
  @Input() data: Adopter;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() formVisible = new EventEmitter<boolean>();

  addAdopterForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.addAdopterForm = new FormGroup({
      name: new FormControl(this.data.name),
      email: new FormControl(this.data.email),
      phone: new FormControl(this.data.phone),
      address: new FormControl(this.data.address),
      otherDetails: new FormControl(this.data.otherDetails)
    });

    this.formReady.emit(this.addAdopterForm);
  }

  removeFosterForm() {
    this.addAdopterForm.reset();
    this.formVisible.emit(false);
  }
}
