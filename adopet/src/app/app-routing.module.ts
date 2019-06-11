import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { MyPetsComponent } from './profile/my-pets/my-pets.component';
import { AdoptComponent } from './adopt/adopt.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { ReceivedRequestsComponent } from './profile/adoption-requests/received-requests/received-requests.component';
import { SentRequestsComponent } from './profile/adoption-requests/sent-requests/sent-requests.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'profile', canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'my-pets', pathMatch: 'full' },
      { path: 'my-pets', component: MyPetsComponent },
      { path: 'favorites', component: FavoritesComponent },
      {
        path: 'adoption-requests', children: [
          { path: '', redirectTo: 'received', pathMatch: 'full' },
          { path: 'received', component: ReceivedRequestsComponent },
          { path: 'sent', component: SentRequestsComponent },
        ]
      },
      { path: 'edit', component: EditProfileComponent }
    ]
  },
  {
    path: 'adopt', children: [
      { path: '', component: AdoptComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
