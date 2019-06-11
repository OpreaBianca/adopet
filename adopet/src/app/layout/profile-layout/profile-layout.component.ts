import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader, FileLikeObject, FileItem } from 'ng2-file-upload';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

import { User } from '../../models/user.interface';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit, OnDestroy {
  user: User;
  active = false;
  hideSubmenu = true;

  uploader: FileUploader = new FileUploader({});

  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private ng2ImgMax: Ng2ImgMaxService) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    this.userService.getUserProfileImage(this.user._id).subscribe(
      res => this.user.profileImageUrl = URL.createObjectURL(res),
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    if (this.user.profileImageUrl) {
      URL.revokeObjectURL(this.user.profileImageUrl);
    }
  }

  updateProfilePicture() {
    const item: FileItem = this.uploader.queue.pop();

    this.ng2ImgMax.compressImage(item._file, 0.05).subscribe(
      res => {
        this.user.profileImageUrl = URL.createObjectURL(res);

        const formData = new FormData();
        formData.append('file', item.file.rawFile, item.file.name);

        this.userService.updateUserProfileImage(formData).subscribe(
          res => console.log(res),
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
  }

  isChildLinkActive() {
    return this.router.url.includes('adoption-requests');
  }

  openCloseSubmenu() {
    this.hideSubmenu = !this.hideSubmenu;
  }
}
