import { TestBed } from '@angular/core/testing';

import { ReasonCodesService } from './reason-codes.service';

describe('ReasonCodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReasonCodesService = TestBed.get(ReasonCodesService);
    expect(service).toBeTruthy();
  });
});
