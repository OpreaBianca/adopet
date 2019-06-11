import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  user: User;
  submittedForm = false;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['profile']);
    }

    // const phoneNumberPattern = '[0-9]{4}-[0-9]{3}-[0-9]{3}';
    // password minimum 9 characters
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      profile: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required /*Validators.pattern(phoneNumberPattern)*/),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      emergencyNotificationOn: new FormControl(''),
      address: new FormControl(''),
      facebook: new FormControl(''),
      twitter: new FormControl(''),
      website: new FormControl(''),
      instagram: new FormControl(''),
      description: new FormControl(''),
      profileImage: new FormControl('')
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      // this.submittedForm = true;
      this.user = this.signUpForm.value;
      // this.user.password = btoa(this.user.password);
      this.authService.signUp(this.user).subscribe(
        res => this.authService.authenticateUser(res.token),
        err => console.log(err)
      );
    }
  }
}
