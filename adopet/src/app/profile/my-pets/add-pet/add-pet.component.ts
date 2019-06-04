import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileLikeObject } from 'ng2-file-upload';

import { Pet } from '../../../models/pet.interface';
import { User } from '../../../models/user.interface';
import { PetService } from '../../../services/pet/pet.service';
import { AttachPhotosComponent } from '../attach-photos/attach-photos.component';
import { MyPetsComponent } from '../my-pets.component';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {
  @ViewChild(AttachPhotosComponent) fileField: AttachPhotosComponent;

  addPetForm: FormGroup;
  submittedForm = false;
  fosterFormVisible = false;
  images: string[] = [];

  genders = ['Female', 'Male'];
  goodWith = ['Kids', 'Elders', 'People with disabilities', 'Dogs', 'Cats', 'Other animals'];
  categories = ['Dog', 'Cat', 'Rabbit', 'Fish'];
  ageMeasurementUnits = ['Days', 'Weeks', 'Months', 'Years'];
  fitFor = ['Apartment', 'House', 'Outdoor'];
  locations = ['Bucharest', 'Teleorman'];
  sizes = ['Small', 'Medium', 'Large'];
  statuses = ['Adopted', 'Placed for adoption/foster', 'Looking for the owner', 'Returned to owner']

  constructor(private petService: PetService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public pet: Pet) { }

  ngOnInit() {
    if (this.pet) {
      this.images = [...this.pet.images];
      this.fosterFormVisible = this.pet.fosterFormVisibile;
    }

    this.addPetForm = new FormGroup({
      name: new FormControl(this.pet ? this.pet.name : '', Validators.required),
      category: new FormControl(this.pet ? this.pet.category : '', Validators.required),
      location: new FormControl(this.pet ? this.pet.location : '', Validators.required),
      gender: new FormControl(this.pet ? this.pet.gender : '', Validators.required),
      ageNumber: new FormControl(this.pet ? this.pet.ageNumber : '', Validators.required),
      ageMeasurementUnit: new FormControl(this.pet ? this.pet.ageMeasurementUnit : '', Validators.required),
      size: new FormControl(this.pet ? this.pet.size : '', Validators.required),
      goodWith: new FormControl(this.pet ? this.pet.goodWith : ''),
      fitFor: new FormControl(this.pet ? this.pet.fitFor : '', Validators.required),
      status: new FormControl(this.pet ? this.pet.status : '', Validators.required),
      description: new FormControl(this.pet ? this.pet.description : ''),
      adopter: new FormGroup({
        name: new FormControl(this.pet ? this.pet.adopter.name : ''),
        email: new FormControl(this.pet ? this.pet.adopter.email : ''),
        phone: new FormControl(this.pet ? this.pet.adopter.phone : ''),
        address: new FormControl(this.pet ? this.pet.adopter.address : ''),
        otherDetails: new FormControl(this.pet ? this.pet.adopter.otherDetails : '')
      }),
      foster: new FormGroup({
        name: new FormControl(this.pet ? this.pet.foster.name : ''),
        email: new FormControl(this.pet ? this.pet.foster.email : ''),
        phone: new FormControl(this.pet ? this.pet.foster.phone : ''),
        address: new FormControl(this.pet ? this.pet.foster.address : ''),
        otherDetails: new FormControl(this.pet ? this.pet.foster.otherDetails : '')
      })
    });
  }

  get adopter() { return this.addPetForm.get('adopter').value; }
  get foster() { return this.addPetForm.get('foster').value; }

  onAddPet() {
    if (this.addPetForm.valid) {
      this.submittedForm = true;

      const formData = new FormData();

      const newPet: Pet = this.addPetForm.value;
      newPet.fosterFormVisibile = this.fosterFormVisible;
      formData.append('pet', JSON.stringify(newPet));

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

  onEditPet() {
    if (this.addPetForm.valid) {
      this.submittedForm = true;

      const formData = new FormData();

      const updatedPet: Pet = this.addPetForm.value;
      updatedPet._id = this.pet._id;
      updatedPet.images = this.pet.images;
      updatedPet.fosterFormVisibile = this.fosterFormVisible;
      formData.append('pet', JSON.stringify(updatedPet));

      // added files
      const files: FileLikeObject[] = this.fileField.getFiles();
      files.forEach((file: FileLikeObject) => {
        const imgIdx = this.pet.images.indexOf(file.name);
        if (imgIdx === -1) {
          formData.append('files[]', file.rawFile, file.name);
        }
      });

      // removed files
      const removed: string[] = [];
      this.pet.images.forEach((imageName: string) => {
        const fileIdx = files.findIndex((file) => file.name === imageName);
        if (fileIdx === -1) {
          removed.push(imageName);
        }
      });
      formData.append('removed', JSON.stringify(removed));

      this.petService.updatePet(formData).subscribe(
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
