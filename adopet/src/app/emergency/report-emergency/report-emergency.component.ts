import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EmergencyComponent } from '../emergency.component';
import { EmergencyCaseService } from '../../services/emergency-case/emergency-case.service';
import { EmergencyCase } from '../../models/emergency-case.interface';

@Component({
  selector: 'app-report-emergency',
  templateUrl: './report-emergency.component.html',
  styleUrls: ['./report-emergency.component.scss']
})
export class ReportEmergencyComponent implements OnInit {
  emergencyForm: FormGroup;
  submittedForm = false;
  address: string;

  constructor(private emergencyCaseService: EmergencyCaseService,
    private dialogRef: MatDialogRef<EmergencyComponent>,
    @Inject(MAT_DIALOG_DATA) public coords: any) { }

  ngOnInit() {
    this.emergencyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl({ value: '', disabled: true }),
      description: new FormControl('', Validators.required),
      lat: new FormControl(this.coords.lat),
      lng: new FormControl(this.coords.lng),
      creationDate: new FormControl(new Date())
    });

    const geocoder = new google.maps.Geocoder;
    geocoder.geocode({ location: { lat: this.coords.lat, lng: this.coords.lng } }, (results, status) => {
      this.address = results[0].formatted_address;
      this.emergencyForm.patchValue({ address: this.address });
    });
  }

  onSubmit() {
    if (this.emergencyForm.valid) {
      this.submittedForm = true;

      const emergencyCase: EmergencyCase = this.emergencyForm.value;
      emergencyCase.address = this.address;

      this.emergencyCaseService.createEmergencyRequest(emergencyCase).subscribe(
        res => this.onClose(res),
        err => console.log(err)
      );
    }
  }

  onClose(emergency: EmergencyCase = undefined) {
    this.dialogRef.close(emergency);
  }
}
