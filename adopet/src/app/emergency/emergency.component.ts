import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

import { EmergencyCase } from '../models/emergency-case.interface';
import { ReportEmergencyComponent } from './report-emergency/report-emergency.component';
import { EmergencyCaseService } from '../services/emergency-case/emergency-case.service';
import { EmergencyDetailsComponent } from './emergency-details/emergency-details.component';

//const webpush = require('web-push');

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss']
})
export class EmergencyComponent implements OnInit {
  lat = 45.9432;
  lng = 24.9668;
  zoom = 4;
  emergencyCases: EmergencyCase[] = [];
  public searchControl: FormControl;

  vapidPublicKey = 'BO96fFlC_JWjliSJ8KbIvU-juIecaSkKus27FBrDsSF8pctCQ4JdE3spcM2xH7hC7Qr5lAGIWZ8VRvYhHMn_uTQ';

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private emergencyCaseService: EmergencyCaseService,
    private dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.emergencyCaseService.getAllEmergencyRequests().subscribe(res => this.emergencyCases = res);

    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 18;
        });
      });
    });
  }

  clickedMarker(index: number) {
    this.dialog.open(EmergencyDetailsComponent, {
      width: '1000px',
      maxHeight: '900px',
      data: this.emergencyCases[index]
    }).afterClosed().subscribe((emergency: EmergencyCase) => {
      if (emergency) {
        this.emergencyCases[index] = emergency;
      }
    });
  }

  mapClicked($event: any) {
    this.dialog.open(ReportEmergencyComponent, {
      width: '1000px',
      maxHeight: '900px',
      data: $event.coords
    }).afterClosed().subscribe((emergency: EmergencyCase) => {
      if (emergency) {
        this.emergencyCases.push(emergency);
      }
    });
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.zoom = 16;
        },
        err => {
          this.lat = 45.9432;
          this.lng = 24.9668;
          this.zoom = 8;
        });
    }
  }


  // subscribeToNotifications() {
  //   if (this.swPush.isEnabled) {
  //     this.swPush.requestSubscription({
  //       serverPublicKey: this.vapidPublicKey
  //     })
  //       .then(sub => console.log(sub)) // this.newsletterService.addPushSubscriber(sub).subscribe())
  //       .catch(err => console.error('Could not subscribe to notifications', err));
  //   }
  // }
} 