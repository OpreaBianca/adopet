import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Pet } from '../../../models/pet.interface';
import { PetService } from '../../../services/pet/pet.service';
import { PetComponent } from '../pet/pet.component';

@Component({
  selector: 'app-delete-pet',
  templateUrl: './delete-pet.component.html',
  styleUrls: ['./delete-pet.component.scss']
})
export class DeletePetComponent implements OnInit {
  submittedForm = false;

  constructor(private petService: PetService,
    private dialogRef: MatDialogRef<PetComponent>,
    @Inject(MAT_DIALOG_DATA) public pet: Pet) { }

  ngOnInit() { }

  onRemovePet() {
    this.submittedForm = true;

    this.petService.removePet(this.pet).subscribe(
      res => this.onClose(res),
      err => console.log(err)
    );
  }

  onClose(pet: Pet = undefined) {
    this.dialogRef.close(pet);
  }
}
