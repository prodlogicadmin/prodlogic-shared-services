import { TestBed } from '@angular/core/testing';

import { TankStrapService } from './tank-strap.service';

describe('TankStrapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TankStrapService = TestBed.get(TankStrapService);
    expect(service).toBeTruthy();
  });
});
