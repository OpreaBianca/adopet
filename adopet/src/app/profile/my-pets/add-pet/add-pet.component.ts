import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MyPetsComponent } from '../my-pets.component';
import { User } from '../../../models/user.interface';
import { AuthService } from '../../../auth/auth.service';
import { PetService } from '../../../services/pet/pet.service';
import { AttachPhotosComponent } from '../attach-photos/attach-photos.component';
import { Pet } from '../../../models/pet.interface';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {
  @ViewChild(AttachPhotosComponent) fileField: AttachPhotosComponent;

  addPetForm: FormGroup;
  user: User;
  submittedForm = false;
  fosterFormVisible = false;

  genders = ['Female', 'Male'];
  goodWith = ['Kids', 'Elders', 'People with disabilities', 'Dogs', 'Cats', 'Other animals'];
  categories = ['Dog', 'Cat', 'Rabbit', 'Fish'];
  ageMeasurementUnits = ['Days', 'Weeks', 'Months', 'Years'];
  fitFor = ['Apartment', 'House', 'Outdoor'];
  locations = ['Bucharest', 'Teleorman'];
  sizes = ['Small', 'Medium', 'Large'];
  statuses = ['Adopted', 'Placed for adoption/foster', 'Looking for the owner', 'Returned to owner']

  constructor(private petService: PetService,
    private dialogRef: MatDialogRef<MyPetsComponent>) { }

  ngOnInit() {
    this.addPetForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      ageNumber: new FormControl('', Validators.required),
      ageMeasurementUnit: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      goodWith: new FormControl(''),
      fitFor: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      description: new FormControl(''),
      adopter: new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        address: new FormControl(''),
        otherDetails: new FormControl('')
      }),
      foster: new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        address: new FormControl(''),
        otherDetails: new FormControl('')
      })
    });
  }

  get adopter() { return this.addPetForm.get('adopter').value; }
  get foster() { return this.addPetForm.get('foster').value; }

  async onSubmit() {
    if (this.addPetForm.valid) {
      this.submittedForm = true;

      const formData = new FormData();

      const pet: Pet = this.addPetForm.value;
      pet.fosterFormVisibile = this.fosterFormVisible;
      formData.append('pet', JSON.stringify(pet));

      const files = this.fileField.getFiles();
      files.forEach(async (file) => {
        formData.append('files[]', file.rawFile, file.name);
      });

      this.petService.addPet(formData).subscribe(
        res => this.onClose(res),
        err => console.log(err)
      );
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

  onClose(pet: Pet = undefined) {
    this.dialogRef.close(pet);
  }
}
