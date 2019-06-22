import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { User } from '../../models/user.interface';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  submittedForm = false;

  constructor(private userService: UserService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public user: User) { }

  profiles: string[] = ['Shelter/ONG', 'Other'];

  ngOnInit() {
    this.editProfileForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      profile: new FormControl(this.user.profile, Validators.required),
      phone: new FormControl(this.user.phone, Validators.required),
      emergencyNotificationOn: new FormControl(this.user.emergencyNotificationOn),
      address: new FormControl(this.user.address),
      facebook: new FormControl(this.user.facebook),
      twitter: new FormControl(this.user.twitter),
      website: new FormControl(this.user.website),
      instagram: new FormControl(this.user.instagram),
      description: new FormControl(this.user.description),
      profileImage: new FormControl(this.user.profileImage),
      profileImageUrl: new FormControl(this.user.profileImageUrl),

      bankName: new FormControl(this.user.bankName),
      bankAccount: new FormControl(this.user.bankAccount),
      bankAccountName: new FormControl(this.user.bankAccountName),
      paypalAccount: new FormControl(this.user.paypalAccount),
      donationsInfo: new FormControl(this.user.donationsInfo)
    });
  }

  get profile() { return this.editProfileForm.get('profile').value; }

  onSubmit() {
    if (this.editProfileForm.valid) {
      this.submittedForm = true;
      this.user = this.editProfileForm.value;

      this.userService.updateUser(this.user).subscribe(
        res => this.onClose(this.user),
        err => console.log(err)
      );
    }
  }

  onClose(user: User = undefined) {
    this.dialogRef.close(user);
  }
}
