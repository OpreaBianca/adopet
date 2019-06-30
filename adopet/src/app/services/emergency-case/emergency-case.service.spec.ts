import { TestBed } from '@angular/core/testing';

import { EmergencyCaseService } from './emergency-case.service';

describe('EmergencyCaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmergencyCaseService = TestBed.get(EmergencyCaseService);
    expect(service).toBeTruthy();
  });
});
