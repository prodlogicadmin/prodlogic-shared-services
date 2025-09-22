import { TestBed } from '@angular/core/testing';

import { TankDetailService } from './tank-detail.service';

describe('TankDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TankDetailService = TestBed.get(TankDetailService);
    expect(service).toBeTruthy();
  });
});
