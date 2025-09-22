import { TestBed } from '@angular/core/testing';

import { PressuresService } from './pressures.service';

describe('PressuresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PressuresService = TestBed.get(PressuresService);
    expect(service).toBeTruthy();
  });
});
