import { Component, OnInit } from '@angular/core';

import { Event } from '../../models/event.interface';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {
  events: Event[] = [];
  numberPerPage = 3;
  successfulRequest = false;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEventsByCreator().subscribe(
      res => {
        this.events = res;
        this.successfulRequest = true;
      },
      err => console.log(err)
    );
  }
}
