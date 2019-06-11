import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { User } from '../../models/user.interface';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit, OnDestroy {
  user: User;
  active = false;
  hideSubmenu = false;

  uploader: FileUploader = new FileUploader({});

  constructor(private userService: UserService,
    private imageService: ImageService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    private ng2ImgMax: Ng2ImgMaxService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = res;
        this.getUserProfileImage();
      },
      err => this.user = err
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

  onEditInfo() {
    // this.dialog.open(AddPetComponent, {
    //   width: '1000px',
    //   maxHeight: '900px',
    //   disableClose: true
    // }).afterClosed().subscribe((pet: Pet) => {
    //   if (pet) {
    //     this.setProfileImage(pet);
    //     this.pets.unshift(pet);
    //   }
    // });
  }

  getUserProfileImage() {
    this.imageService.getImageByName(this.user.profileImage, this.user._id).subscribe(
      res => this.user.profileImageUrl = URL.createObjectURL(res),
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
