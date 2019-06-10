import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PetComponent } from '../../../layout/pets-layout/pet/pet.component';
import { AdoptionRequestService } from 'src/app/services/adoption-request/adoption-request.service';
import { AdoptionRequest } from 'src/app/models/adoption-request.interface';

@Component({
  selector: 'app-complete-request',
  templateUrl: './complete-request.component.html',
  styleUrls: ['./complete-request.component.scss']
})
export class CompleteRequestComponent implements OnInit {
  completeRequestForm: FormGroup;
  submittedForm = false;

  statuses = ['Accepted', 'Rejected'];

  constructor(private adoptionRequestService: AdoptionRequestService,
    private dialogRef: MatDialogRef<PetComponent>,
    @Inject(MAT_DIALOG_DATA) public request: AdoptionRequest) { }

  ngOnInit() {
    this.completeRequestForm = new FormGroup({
      status: new FormControl('', Validators.required)
    });
  }

  onCompleteRequest() {
    if (this.completeRequestForm.valid) {
      this.submittedForm = true;
      this.request.requestStatus = this.completeRequestForm.get('status').value;

      this.adoptionRequestService.updateRequestStatus(this.request).subscribe(
        res => this.onClose(),
        err => console.log(err)
      );
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
