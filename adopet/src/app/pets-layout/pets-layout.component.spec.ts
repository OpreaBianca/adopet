import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsLayoutComponent } from './pets-layout.component';

describe('PetsLayoutComponent', () => {
  let component: PetsLayoutComponent;
  let fixture: ComponentFixture<PetsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
