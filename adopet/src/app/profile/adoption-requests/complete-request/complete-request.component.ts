import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AdoptionRequestService } from '../../../services/adoption-request/adoption-request.service';
import { AdoptionRequest } from '../../../models/adoption-request.interface';
import { RequestComponent } from '../requests-layout/request/request.component';

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
    private dialogRef: MatDialogRef<RequestComponent>,
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
        res => this.onClose(res),
        err => console.log(err)
      );
    }
  }

  onClose(request: AdoptionRequest = undefined) {
    this.dialogRef.close(request);
  }
}
