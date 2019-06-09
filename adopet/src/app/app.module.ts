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
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ProfileLayoutComponent } from './layout/profile-layout/profile-layout.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { MyPetsComponent } from './profile/my-pets/my-pets.component';
import { PetComponent } from './layout/pets-layout/pet/pet.component';
import { AddPetComponent } from './profile/my-pets/add-pet/add-pet.component';
import { AdoptComponent } from './adopt/adopt.component';
import { AddAdopterComponent } from './profile/my-pets/add-adopter/add-adopter.component';
import { AttachPhotosComponent } from './profile/my-pets/attach-photos/attach-photos.component';
import { ThumbnailDirective } from './profile/my-pets/attach-photos/thumbnail.directive';
import { DeletePetComponent } from './profile/my-pets/delete-pet/delete-pet.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { PetsLayoutComponent } from './layout/pets-layout/pets-layout.component';
import { MoreDetailsComponent } from './adopt/more-details/more-details.component';
import { ReceivedRequestsComponent } from './profile/adoption-requests/received-requests/received-requests.component';
import { SentRequestsComponent } from './profile/adoption-requests/sent-requests/sent-requests.component';
import { RequestComponent } from './profile/adoption-requests/request/request.component';

@NgModule({
  entryComponents: [
    AddPetComponent,
    DeletePetComponent,
    MoreDetailsComponent
  ],
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomepageComponent,
    LoginComponent,
    SignUpComponent,
    ProfileLayoutComponent,
    EditProfileComponent,
    MyPetsComponent,
    PetComponent,
    AddPetComponent,
    DeletePetComponent,
    AdoptComponent,
    AddAdopterComponent,
    AttachPhotosComponent,
    ThumbnailDirective,
    FavoritesComponent,
    PetsLayoutComponent,
    MoreDetailsComponent,
    ReceivedRequestsComponent,
    SentRequestsComponent,
    RequestComponent
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
