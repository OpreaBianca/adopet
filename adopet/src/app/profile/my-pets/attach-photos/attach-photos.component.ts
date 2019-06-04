import { Component, OnInit, Input } from '@angular/core';
import { FileUploader, FileLikeObject, FileItem } from 'ng2-file-upload';
import { Ng2ImgMaxService } from 'ng2-img-max';

import { ImageService } from '../../../services/image/image.service';

@Component({
  selector: 'app-attach-photos',
  templateUrl: './attach-photos.component.html',
  styleUrls: ['./attach-photos.component.scss']
})
export class AttachPhotosComponent implements OnInit {
  @Input() images: string[] = [];

  uploader: FileUploader = new FileUploader({});
  files: FileItem[] = [];

  constructor(private imageService: ImageService,
    private ng2ImgMax: Ng2ImgMaxService) { }

  ngOnInit() {
    if (this.images.length > 0) {
      this.images.forEach((imageName: string) => {
        this.imageService.getImageByName(imageName).subscribe(
          res => {
            const file = new File([res], imageName);
            this.uploader.addToQueue([file]);
            const length = this.uploader.queue.length;
            this.files.push(this.uploader.queue[length - 1]);
          },
          err => console.log(err)
        );
      });
    }
  }

  getFiles(): FileLikeObject[] {
    return this.files.map((item) => {
      return item.file;
    });
  }

  compressFiles() {
    this.uploader.queue.forEach((item: FileItem) => {
      if (this.files.indexOf(item) === -1) {
        this.ng2ImgMax.compressImage(item._file, 0.05).subscribe(
          res => {
            const file = new File([res], item.file.name);
            this.uploader.removeFromQueue(item);
            this.uploader.addToQueue([file]);
            const length = this.uploader.queue.length;
            this.files.push(this.uploader.queue[length - 1]);
          },
          err => console.log(err)
        );
      }
    });
  }

  removeImage(item: FileItem) {
    const fileIdx = this.files.indexOf(item);
    this.files.splice(fileIdx, 1);

    const imgIdx = this.images.indexOf(item.file.name);
    this.images.splice(imgIdx, 1);

    this.uploader.removeFromQueue(item);
  }

  isLoading() {
    return this.uploader.queue.length > this.files.length || this.images.length > this.uploader.queue.length;
  }
}
