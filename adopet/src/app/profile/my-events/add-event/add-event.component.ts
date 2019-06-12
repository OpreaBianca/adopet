import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { AttachPhotosComponent } from '../../my-pets/attach-photos/attach-photos.component';
import { EventService } from '../../../services/event/event.service';
import { EventsLayoutComponent } from '../../../layout/events-layout/events-layout.component';
import { Event } from '../../../models/event.interface';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  @ViewChild(AttachPhotosComponent) fileField: AttachPhotosComponent;

  addEventForm: FormGroup;
  submittedForm = false;

  locations = ['Bucharest', 'Teleorman'];

  constructor(private eventService: EventService,
    private dialogRef: MatDialogRef<EventsLayoutComponent>) { }

  ngOnInit() {
    this.addEventForm = new FormGroup({
      name: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      organizer: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  onSubmit() {
    if (this.addEventForm.valid) {
      this.submittedForm = true;

      const formData = new FormData();

      const newEvent: Event = this.addEventForm.value;
      formData.append('event', JSON.stringify(newEvent));

      const files = this.fileField.getFiles();
      if (files.length > 0) {
        formData.append('file', files[0].rawFile, files[0].name);
      }

      this.eventService.addEvent(formData).subscribe(
        res => this.onClose(res),
        err => console.log(err)
      );
    }
  }

  onClose(event: Event = undefined) {
    this.dialogRef.close(event);
  }
}
