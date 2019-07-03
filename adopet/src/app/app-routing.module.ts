import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { MyPetsComponent } from './profile/my-pets/my-pets.component';
import { AdoptComponent } from './adopt/adopt.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { ReceivedRequestsComponent } from './profile/adoption-requests/received-requests/received-requests.component';
import { SentRequestsComponent } from './profile/adoption-requests/sent-requests/sent-requests.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ProfileLayoutComponent } from './layout/profile-layout/profile-layout.component';
import { MyEventsComponent } from './profile/my-events/my-events.component';
import { MyNotificationsComponent } from './profile/my-notifications/my-notifications.component';
import { SubscribedEventsComponent } from './profile/my-events/subscribed-events/subscribed-events.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { SheltersComponent } from './shelters/shelters.component';
import { EmergencyComponent } from './emergency/emergency.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomepageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
      {
        path: 'profile', component: ProfileLayoutComponent, canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'my-pets', pathMatch: 'full' },
          { path: 'my-pets', component: MyPetsComponent },       
          { path: 'my-notifications', component: MyNotificationsComponent },
          { path: 'favorites', component: FavoritesComponent },
          {
            path: 'events', children: [
              { path: '', redirectTo: 'created', pathMatch: 'full' },
              { path: 'created', component: MyEventsComponent },
              { path: 'subscribed', component: SubscribedEventsComponent },
            ]
          },   
          {
            path: 'adoption-requests', children: [
              { path: '', redirectTo: 'received', pathMatch: 'full' },
              { path: 'received', component: ReceivedRequestsComponent },
              { path: 'sent', component: SentRequestsComponent },
            ]
          }
        ]
      },
      { path: 'adopt', component: AdoptComponent },
      { path: 'upcoming-events', component: UpcomingEventsComponent },
      { path: 'shelters', component: SheltersComponent },
      { path: 'emergency', component: EmergencyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
