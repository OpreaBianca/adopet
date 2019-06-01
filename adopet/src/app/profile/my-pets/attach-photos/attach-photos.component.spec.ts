import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachPhotosComponent } from './attach-photos.component';

describe('AttachPhotosComponent', () => {
  let component: AttachPhotosComponent;
  let fixture: ComponentFixture<AttachPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
