import { Component, OnInit } from '@angular/core';

import { Event } from '../../../models/event.interface';
import { EventService } from '../../../services/event/event.service';

@Component({
  selector: 'app-subscribed-events',
  templateUrl: './subscribed-events.component.html',
  styleUrls: ['./subscribed-events.component.scss']
})
export class SubscribedEventsComponent implements OnInit {
  events: Event[] = [];
  numberPerPage = 3;
  successfulRequest = false;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEventsBySubscriber().subscribe(
      res => {
        this.events = res;
        this.successfulRequest = true;
      },
      err => console.log(err)
    );
  }
}
