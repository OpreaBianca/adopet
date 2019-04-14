import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    // if (this._authService.isAuthenticated()) {
    //   this._router.navigate(['']);
    // }
    const phoneNumberPattern = '[0-9]{4}-[0-9]{3}-[0-9]{3}';
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      profile: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(phoneNumberPattern)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      emergency: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    // if (this.isFormValid()) {
    //   this.userCredentials = this.loginForm.value;
    //   this._authService.login(this.userCredentials).subscribe(
    //     res => {
    //       this._authService.authenticateUser(res.token);
    //     },
    //     err => {
    //       this.setErrorMessages(err);
    //     }
    //   );
    // }
  }

  // setErrorMessages(err) {
  //   if (err.error === 'Unauthorized') {
  //     this.errorMessage = 'Invalid username or password';
  //   } else if (err.error === 'Not active') {
  //     this.errorMessage = 'This user is no longer active';
  //   } else {
  //     this.errorMessage = 'Something went wrong, please try again later';
  //   }
  //   this.loginForm.setErrors({ 'wrong': true });
  // }

  // isFormValid() {
  //   this.loginForm.setErrors({ wrong: null });
  //   this.loginForm.updateValueAndValidity();
  //   Object.keys(this.loginForm.controls).forEach(key => {
  //     const control = this.loginForm.get(key);
  //     control.markAsTouched();
  //   });
  //   return this.loginForm.valid;
  // }

  // hasError() {
  //   return this.username.invalid && (this.username.touched || this.username.dirty) ||
  //     this.password.invalid && (this.password.touched || this.password.dirty) ||
  //     this.loginForm.hasError('wrong');
  // }

  // getError() {
  //   return this.username.hasError('required') || this.password.hasError('required') ? 'All fields are required'
  //     : this.errorMessage;
  // }

}
