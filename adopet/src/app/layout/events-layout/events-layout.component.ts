
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../../models/event.interface';
import { ImageService } from '../../services/image/image.service';
import { AddEventComponent } from '../../profile/my-events/add-event/add-event.component';

@Component({
  selector: 'app-events-layout',
  templateUrl: './events-layout.component.html',
  styleUrls: ['./events-layout.component.scss']
})
export class EventsLayoutComponent implements OnInit {
  @Input() events: Event[] = [];
  @Input() numberPerPage = 4;

  currentPage = 0;

  constructor(private imageService: ImageService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.setProfileImages();
  }

  addEvent() {
    this.dialog.open(AddEventComponent, {
      width: '1000px',
      maxHeight: '900px',
      disableClose: true
    }).afterClosed().subscribe((event: Event) => {
      if (event) {
        this.setProfileImage(event);
        this.events.unshift(event);
      }
    });
  }

  removeEvent(event: Event) {
    const eventIdx = this.events.findIndex((currentEvent: Event) => currentEvent._id === event._id);
    this.events.splice(eventIdx, 1);
  }

  setProfileImages() {
    this.events.forEach((event: Event) => {
      this.setProfileImage(event);
    });
  }

  setProfileImage(event: Event) {
    if (event.image !== '') {
      this.imageService.getImageByName(event.image, event.creatorID).subscribe(
        res => event.imageUrl = URL.createObjectURL(res),
        err => console.log(err)
      );
    }
  }

  previousPage() {
    this.currentPage -= 1;
  }

  nextPage() {
    this.currentPage += 1;
  }

  getEventsToDisplay() {
    const startIdx = this.currentPage * this.numberPerPage;
    const endIdx = startIdx + this.numberPerPage;
    return this.events.slice(startIdx, endIdx);
  }

  isFirstPage() {
    return this.currentPage === 0;
  }

  isLastPage() {
    const numberOfPages = Math.ceil(this.events.length / this.numberPerPage);
    return numberOfPages === 0 ? true : this.currentPage === numberOfPages - 1;
  }

  isMyEventsPage() {
    return this.router.url === '/profile/my-events';
  }
}
