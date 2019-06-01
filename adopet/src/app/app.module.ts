import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ValidationModule } from './validation/validation.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { MyPetsComponent } from './profile/my-pets/my-pets.component';
import { PetComponent } from './profile/pet/pet.component';
import { AddPetComponent } from './profile/add-pet/add-pet.component';
import { AdoptComponent } from './adopt/adopt.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomepageComponent,
    LoginComponent,
    SignUpComponent,
    ProfileLayoutComponent,
    EditProfileComponent,
    MyPetsComponent,
    PetComponent,
    AddPetComponent,
    AdoptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ValidationModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
