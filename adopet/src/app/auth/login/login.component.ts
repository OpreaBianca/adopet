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
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['profile']);
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // this.submittedForm = true;
      this.userCredentials = this.loginForm.value;
      // this.userCredentials.password = btoa(this.userCredentials.password);
      this.authService.login(this.userCredentials).subscribe(
        res => this.authService.authenticateUser(res.token),
        err => console.log(err)
      );
    }
  }
}
