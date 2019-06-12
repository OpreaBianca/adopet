import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { Event } from '../../../models/event.interface';
import { Router } from '@angular/router';
import { DeleteEventComponent } from '../../../profile/my-events/delete-event/delete-event.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() event: Event;
  @Output() removedEvent = new EventEmitter<Event>();

  constructor(private dialog: MatDialog,
    private router: Router,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() { }

  onDeleteEvent() {
    this.dialog.open(DeleteEventComponent, {
      width: '600px',
      maxHeight: '900px',
      disableClose: true,
      data: this.event
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.removedEvent.emit(this.event);
      }
    });
  }

  getDateTime() {
    const date = this.event.date.toString();
    return date.substring(8, 10) + '.' + date.substring(5, 7) + '.' + date.substring(0, 4) + ' | ' + date.substring(11, 16);
  }

  isMyEventsPage() {
    return this.router.url === '/profile/my-events';
  }
}
