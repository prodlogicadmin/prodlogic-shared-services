import { TestBed } from '@angular/core/testing';

import { ZoneDetailService } from './zonedetail.service';

describe('ZoneDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZoneDetailService = TestBed.get(ZoneDetailService);
    expect(service).toBeTruthy();
  });
});
