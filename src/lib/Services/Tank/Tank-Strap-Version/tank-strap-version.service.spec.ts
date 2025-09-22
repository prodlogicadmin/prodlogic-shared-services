import { TestBed } from '@angular/core/testing';

import { TankStrapVersionService } from './tank-strap-version.service';

describe('TankStrapVersionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TankStrapVersionService = TestBed.get(TankStrapVersionService);
    expect(service).toBeTruthy();
  });
});
