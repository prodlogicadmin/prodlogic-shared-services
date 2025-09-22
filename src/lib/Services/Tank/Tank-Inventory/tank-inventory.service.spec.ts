import { TestBed } from '@angular/core/testing';

import { TankInventoryService } from './tank-inventory.service';

describe('TankInventoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TankInventoryService = TestBed.get(TankInventoryService);
    expect(service).toBeTruthy();
  });
});
