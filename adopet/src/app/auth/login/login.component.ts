import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UserCredentials } from '../../models/user-credentials.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userCredentials: UserCredentials;
  submittedForm = false;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    // if (this._authService.isAuthenticated()) {
    //   this._router.navigate(['']);
    // }
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      // this.submittedForm = true;
      this.userCredentials = this.loginForm.value;
      this.authService.login(this.userCredentials).subscribe(
        res => console.log(res), // this.authService.authenticateUser(res.token)
        err => console.log(err)
      );
    }
  }
}
