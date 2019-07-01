import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwPush } from '@angular/service-worker';

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
  subscription: PushSubscription;

  constructor(private swPush: SwPush,
    private authService: AuthService,
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

    this.signUpForm.valueChanges.subscribe(
      formValue => {
        if (formValue.emergencyNotificationOn) {
          if (this.swPush.isEnabled) {
            this.swPush.requestSubscription({
              serverPublicKey: 'BO96fFlC_JWjliSJ8KbIvU-juIecaSkKus27FBrDsSF8pctCQ4JdE3spcM2xH7hC7Qr5lAGIWZ8VRvYhHMn_uTQ'
            })
              .then(subscribition => this.subscription = subscribition) // console.log(subscribition))
              .catch(err => this.subscription = undefined) // console.log(err));
          }
        }
      }
    );
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      // this.submittedForm = true;
      this.user = this.signUpForm.value;
      this.user.subscription = this.subscription;
      // this.user.password = btoa(this.user.password);
      this.authService.signUp(this.user).subscribe(
        res => this.authService.authenticateUser(res.token),
        err => console.log(err)
      );
    }
  }
}
