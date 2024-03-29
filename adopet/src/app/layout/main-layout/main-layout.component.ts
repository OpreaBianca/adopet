import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit() { }

  isChildLinkActive() {
    return this.router.url.includes('profile');
  }
}
