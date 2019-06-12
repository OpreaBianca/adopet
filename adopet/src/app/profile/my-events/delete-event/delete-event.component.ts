import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Event } from '../../../models/event.interface';
import { EventService } from '../../../services/event/event.service';
import { EventComponent } from '../../../layout/events-layout/event/event.component';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss']
})
export class DeleteEventComponent implements OnInit {
  submittedForm = false;

  constructor(private eventService: EventService,
    private dialogRef: MatDialogRef<EventComponent>,
    @Inject(MAT_DIALOG_DATA) public event: Event) { }

  ngOnInit() { }

  onRemoveEvent() {
    this.submittedForm = true;

    this.eventService.removeEvent(this.event).subscribe(
      res => this.onClose(res),
      err => console.log(err)
    );
  }

  onClose(event: Event = undefined) {
    this.dialogRef.close(event);
  }
}
