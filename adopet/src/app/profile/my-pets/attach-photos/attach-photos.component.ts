import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attach-photos',
  templateUrl: './attach-photos.component.html',
  styleUrls: ['./attach-photos.component.scss']
})
export class AttachPhotosComponent implements OnInit {
  successMessage = 'File successfully uploaded!';
  fileSelected = false;
  fileName: string;
  file: FormData;
  attachedFiles: File[] = [];
  shouldDisplayLoader = false;

  constructor() { }

  ngOnInit() {
    this.getAllAttachments();
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      this.fileSelected = true;
      this.file = new FormData();
      this.file.append('file', event.target.files[0]);
      this.fileName = event.target.files[0].name;
    }
  }

  onUpload() {
    this.shouldDisplayLoader = true;
    // this._fileService.upload(this.file, this.fileId, this.fileType).subscribe(
    //   data => {
    //     this.getAllAttachments();
    //     this.clearFile();
    //     this._notification.success(this.successMessage);
    //   },
    //   error => this._notification.error(error),
    //   () => {
    //     this.clearFile();
    //     this.shouldDisplayLoader = false;
    //   }
    // );
  }

  downloadFile(file: File) {
    this.shouldDisplayLoader = true;
    // this._fileService.download(file.Type, file.Name).subscribe(
    //   data => fileSaver.saveAs(data, file.Name),
    //   error => this._notification.error(error),
    //   () => this.shouldDisplayLoader = false
    // );
  }

  clearFile() {
    this.fileSelected = false;
    this.file = null;
  }

  private getAllAttachments() {
    // this._fileService.getAllByTypeId(this.fileType, this.fileId).subscribe(
    //   result => this.attachedFiles = result.data.map(item => new File(item.id, item.name, item.type, item.typeId, item.dateUploaded)),
    //   err => this._notification.error(err));
  }

}
