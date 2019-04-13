import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'adopet';

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.get().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }
}
