import { TestBed } from '@angular/core/testing';

import { FuelUsageService } from './fuel-usage.service';

describe('FuelUsageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuelUsageService = TestBed.get(FuelUsageService);
    expect(service).toBeTruthy();
  });
});
