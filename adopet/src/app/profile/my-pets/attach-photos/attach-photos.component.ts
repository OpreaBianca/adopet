import { Component, OnInit } from '@angular/core';
import { FileUploader, FileLikeObject, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-attach-photos',
  templateUrl: './attach-photos.component.html',
  styleUrls: ['./attach-photos.component.scss']
})
export class AttachPhotosComponent implements OnInit {
  uploader: FileUploader = new FileUploader({});

  constructor() { }

  ngOnInit() { }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((item) => {
      return item.file;
    });
  }

  removeImage(item: FileItem) {
    this.uploader.removeFromQueue(item);
  }
}
