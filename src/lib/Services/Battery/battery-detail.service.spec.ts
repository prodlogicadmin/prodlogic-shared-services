import { TestBed } from '@angular/core/testing';

import { BatteryDetailService } from './battery-detail.service';

describe('BatteryDetailService', () => {
  let service: BatteryDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatteryDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
