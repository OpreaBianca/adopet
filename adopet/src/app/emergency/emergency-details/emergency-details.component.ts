import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EmergencyComponent } from '../emergency.component';
import { EmergencyCaseService } from '../../services/emergency-case/emergency-case.service';
import { EmergencyCase } from '../../models/emergency-case.interface';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-emergency-details',
  templateUrl: './emergency-details.component.html',
  styleUrls: ['./emergency-details.component.scss']
})
export class EmergencyDetailsComponent implements OnInit {
  isMoreDetailsPage = true;
  emergencyForm: FormGroup;
  submittedForm = false;
  user: User;

  constructor(private authService: AuthService,
    private emergencyCaseService: EmergencyCaseService,
    private dialogRef: MatDialogRef<EmergencyComponent>,
    @Inject(MAT_DIALOG_DATA) public emergency: EmergencyCase) { }

  ngOnInit() {
    this.emergencyForm = new FormGroup({
      id: new FormControl('1'),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });

    if (this.authService.isAuthenticated()) {
      this.user = this.authService.getUser();
      this.emergencyForm.patchValue({
        id: this.user._id,
        name: this.user.name,
        phone: this.user.phone
      });
    }
  }

  onSubmit() {
    if (this.emergencyForm.valid) {
      this.submittedForm = true;

      this.emergency.takenOverID = this.emergencyForm.get('id').value;
      this.emergency.takenOverName = this.emergencyForm.get('name').value;
      this.emergency.takenOverPhone = this.emergencyForm.get('phone').value;

      this.emergencyCaseService.acceptEmergencyRequest(this.emergency).subscribe(
        res => this.onClose(res),
        err => console.log(err)
      );
    }
  }

  onAcceptCase() {
    this.isMoreDetailsPage = false;
  }

  onBack() {
    this.isMoreDetailsPage = true;
  }

  onClose(emergency: EmergencyCase = undefined) {
    this.dialogRef.close(emergency);
  }

  isTakenOver() {
    return this.emergency.takenOverID !== undefined;
  }
}
