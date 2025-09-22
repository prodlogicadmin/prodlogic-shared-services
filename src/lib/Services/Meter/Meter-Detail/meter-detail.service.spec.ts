import { TestBed } from '@angular/core/testing';

import { MeterDetailService } from './meter-detail.service';

describe('MeterDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeterDetailService = TestBed.get(MeterDetailService);
    expect(service).toBeTruthy();
  });
});
