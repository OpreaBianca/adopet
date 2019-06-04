import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  user: User;
  submittedForm = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    this.editProfileForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      profile: new FormControl(this.user.profile, Validators.required),
      phone: new FormControl(this.user.phone, Validators.required /*Validators.pattern(phoneNumberPattern)*/),
      email: new FormControl({ value: this.user.email, disabled: true }),
      emergency: new FormControl(this.user.emergencyNotificationOn),
      address: new FormControl(this.user.address),
      facebook: new FormControl(this.user.facebook),
      instagram: new FormControl(this.user.instagram),
      twitter: new FormControl(this.user.twitter),
      website: new FormControl(this.user.website),
      description: new FormControl(this.user.description)
    });
  }

  onSubmit() {
    if (this.editProfileForm.valid) {
      // this.submittedForm = true;
      this.user = this.editProfileForm.value;
      // this.user.password = btoa(this.user.password);
      // this.authService.signUp(this.user).subscribe(
      //   res => this.authService.authenticateUser(res.token),
      //   err => console.log(err)
      // );
    }
  }
}
