import { TestBed } from '@angular/core/testing';

import { AdoptionRequestService } from './adoption-request.service';

describe('AdoptionRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdoptionRequestService = TestBed.get(AdoptionRequestService);
    expect(service).toBeTruthy();
  });
});
