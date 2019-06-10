import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteRequestComponent } from './complete-request.component';

describe('CompleteRequestComponent', () => {
  let component: CompleteRequestComponent;
  let fixture: ComponentFixture<CompleteRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
