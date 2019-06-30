import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { Event } from '../../../models/event.interface';
import { Router } from '@angular/router';
import { DeleteEventComponent } from '../../../profile/my-events/delete-event/delete-event.component';
import { EventService } from '../../../services/event/event.service';
import { User } from '../../../models/user.interface';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() event: Event;
  @Output() removedEvent = new EventEmitter<Event>();

  user: User;

  constructor(private eventService: EventService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.user = this.authService.getUser();
    }
  }

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

  onSubscribe() {
    this.event.subscribers.push(this.user._id);
    this.eventService.subscribeEvent(this.event).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  isUserSubscribed() {
    return this.authService.isAuthenticated() ? this.event.subscribers.includes(this.user._id) : false;
  }

  getDateTime() {
    const date = this.event.date.toString();
    return date.substring(8, 10) + '.' + date.substring(5, 7) + '.' + date.substring(0, 4) + ' | ' + date.substring(11, 16);
  }

  isMyEventsPage() {
    return this.router.url === '/profile/my-events';
  }
}
