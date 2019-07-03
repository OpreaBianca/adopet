import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

import { EmergencyCase } from '../../models/emergency-case.interface';
import { EmergencyCaseService } from '../../services/emergency-case/emergency-case.service';
import { EmergencyDetailsComponent } from '../../emergency/emergency-details/emergency-details.component';

@Component({
  selector: 'app-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.scss']
})
export class MyNotificationsComponent implements OnInit {
  lat = 45.9432;
  lng = 24.9668;
  zoom = 4;
  emergencyCases: EmergencyCase[] = [];
  public searchControl: FormControl;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private emergencyCaseService: EmergencyCaseService,
    private dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.emergencyCaseService.getEmergencyRequestsByTakenOver().subscribe(res => this.emergencyCases = res);

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

}
