import { TestBed } from '@angular/core/testing';

import { SystemReasonCodesService } from './system-reason-codes.service';

describe('SystemReasonCodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemReasonCodesService = TestBed.get(SystemReasonCodesService);
    expect(service).toBeTruthy();
  });
});
