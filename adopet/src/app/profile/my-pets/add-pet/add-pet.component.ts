import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MyPetsComponent } from '../my-pets.component';
import { User } from '../../../models/user.interface';
import { AuthService } from '../../../auth/auth.service';
import { PetService } from '../../../services/pet/pet.service';
import { AttachPhotosComponent } from '../attach-photos/attach-photos.component';

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

  genders = [{ id: 1, name: 'Female' }, { id: 2, name: 'Male' }];
  goodWith = [{ id: 1, name: 'Kids' }, { id: 2, name: 'Elders' }, { id: 3, name: 'People with disabilities' },
  { id: 4, name: 'Dogs' }, { id: 5, name: 'Cats' }, { id: 6, name: 'Other animals' }];
  categories = [{ id: 1, name: 'Dog' }, { id: 2, name: 'Cat' }, { id: 3, name: 'Rabbit' }, { id: 4, name: 'Fish' }];
  ageMeasurementUnits = [{ id: 1, name: 'Days' }, { id: 2, name: 'Weeks' }, { id: 3, name: 'Months' }, { id: 4, name: 'Years' }];
  fitFor = [{ id: 1, name: 'Apartment' }, { id: 2, name: 'House' }, { id: 3, name: 'Outdoor' }];
  locations = [{ id: 1, name: 'Bucharest' }, { id: 2, name: 'Teleorman' }];
  sizes = [{ id: 1, name: 'Small' }, { id: 1, name: 'Medium' }, { id: 1, name: 'Large' }];
  statuses = [{ id: 1, name: 'Adopted' }, { id: 2, name: 'Placed for adoption/foster' }, { id: 3, name: 'Looking for the owner' },
  { id: 4, name: 'Returned to owner' }]

  constructor(private authService: AuthService,
    private petService: PetService,
    private dialogRef: MatDialogRef<MyPetsComponent>) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    this.addPetForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      ageNumber: new FormControl('', Validators.required),
      ageMeasurementUnit: new FormControl('', Validators.required),
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

  async onSubmit() {
    if (this.addPetForm.valid) {
      // this.submittedForm = true;
      let formData = new FormData();
      formData.append('pet', JSON.stringify(this.addPetForm.value));

      let files = this.fileField.getFiles();
      files.forEach(async (file) => {
        formData.append('files[]', file.rawFile, file.name);
      });

      this.petService.addPet(formData).subscribe(
        res => console.log(res),
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

  onClose() {
    this.dialogRef.close();
  }
}
