import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedEventsComponent } from './subscribed-events.component';

describe('SubscribedEventsComponent', () => {
  let component: SubscribedEventsComponent;
  let fixture: ComponentFixture<SubscribedEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribedEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
