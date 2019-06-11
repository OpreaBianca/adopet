import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {
  user: User;
  active = false;
  hideSubmenu = true;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  isChildLinkActive() {
    return this.router.url.includes('adoption-requests');
  }

  openCloseSubmenu() {
    this.hideSubmenu = !this.hideSubmenu;
  }
}
