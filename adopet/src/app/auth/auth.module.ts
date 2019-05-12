import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    JwtHelperService
  ]
})

export class AuthModule { }
