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
    // if (this._authService.isAuthenticated()) {
    //   this._router.navigate(['']);
    // }
    //const phoneNumberPattern = '[0-9]{4}-[0-9]{3}-[0-9]{3}';
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      profile: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required /*Validators.pattern(phoneNumberPattern)*/]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      emergency: new FormControl('')
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      // this.submittedForm = true;
      this.user = this.signUpForm.value;
      this.authService.signUp(this.user).subscribe(
        res => console.log(res), //this.authService.authenticateUser(res.token)
        err => console.log(err)
      );
    }
  }
}
