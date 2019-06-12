import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Event } from '../../../models/event.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() event: Event;
  @Output() removedEvent = new EventEmitter<Event>();

  constructor(private router: Router,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() { }

  getDateTime() {
    const date = this.event.date.toString();
    return date.substring(8, 10) + '.' + date.substring(5, 7) + '.' + date.substring(0, 4) + ' | ' + date.substring(11, 16);
  }

  isMyEventsPage() {
    return this.router.url === '/profile/my-events';
  }
}
