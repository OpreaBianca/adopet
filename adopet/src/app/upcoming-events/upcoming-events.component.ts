import { Component, OnInit } from '@angular/core';

import { Event } from '../models/event.interface';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  events: Event[] = [];
  numberPerPage = 4;
  successfulRequest = false;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(
      res => {
        this.events = res;
        this.successfulRequest = true;
      },
      err => console.log(err)
    );
  }
}
