import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmergencyComponent } from './report-emergency.component';

describe('ReportEmergencyComponent', () => {
  let component: ReportEmergencyComponent;
  let fixture: ComponentFixture<ReportEmergencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEmergencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
