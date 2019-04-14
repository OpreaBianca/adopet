import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    // if (this._authService.isAuthenticated()) {
    //   this._router.navigate(['']);
    // }
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

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
