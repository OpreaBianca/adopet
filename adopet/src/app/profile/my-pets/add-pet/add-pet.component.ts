import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MyPetsComponent } from '../my-pets.component';
import { User } from '../../../models/user.interface';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {
  addPetForm: FormGroup;
  user: User;
  submittedForm = false;
  fosterFormVisible = false;

  constructor(private authService: AuthService,
    private dialogRef: MatDialogRef<MyPetsComponent>) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    this.addPetForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required /*Validators.pattern(phoneNumberPattern)*/),
      gender: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      goodWith: new FormControl('', Validators.required),
      fitFor: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      description: new FormControl(''),
      adopter: new FormGroup({}),
      foster: new FormGroup({})
    });
  }

  get adopter() { return this.addPetForm.get('adopter').value; }
  get foster() { return this.addPetForm.get('foster').value; }

  onSubmit() {
    if (this.addPetForm.valid) {
      // this.submittedForm = true;
      console.log(this.addPetForm.value);
    }
  }


  formInitialized(name: string, form: FormGroup) {
    this.addPetForm.setControl(name, form);
  }

  showFosterForm(isVisible: boolean) {
    this.fosterFormVisible = isVisible;
  }

  isAdopted() {
    return this.addPetForm.get('status').value === 'Adopted';
  }

  onClose() {
    this.dialogRef.close();
  }
}
