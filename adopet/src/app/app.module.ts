import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { NgxLoadingModule } from 'ngx-loading';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { ValidationModule } from './validation/validation.module';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileLayoutComponent } from './profile/profile-layout/profile-layout.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { MyPetsComponent } from './profile/my-pets/my-pets.component';
import { PetComponent } from './profile/my-pets/pet/pet.component';
import { AddPetComponent } from './profile/my-pets/add-pet/add-pet.component';
import { AdoptComponent } from './adopt/adopt.component';
import { AddAdopterComponent } from './profile/my-pets/add-adopter/add-adopter.component';
import { AttachPhotosComponent } from './profile/my-pets/attach-photos/attach-photos.component';
import { ThumbnailDirective } from './profile/my-pets/attach-photos/thumbnail.directive';

@NgModule({
  entryComponents: [
    AddPetComponent
  ],
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
    AdoptComponent,
    AddAdopterComponent,
    AttachPhotosComponent,
    ThumbnailDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    Ng2ImgMaxModule,
    NgxLoadingModule,
    AppRoutingModule,
    ValidationModule,
    MaterialModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
