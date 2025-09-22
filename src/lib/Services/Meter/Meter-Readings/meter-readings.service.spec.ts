import { TestBed } from '@angular/core/testing';

import { MeterReadingsService } from './meter-readings.service';

describe('MeterReadingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeterReadingsService = TestBed.get(MeterReadingsService);
    expect(service).toBeTruthy();
  });
});
