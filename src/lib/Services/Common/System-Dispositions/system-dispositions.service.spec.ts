import { TestBed } from '@angular/core/testing';

import { SystemDispositionsService } from './system-dispositions.service';

describe('SystemDispositionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemDispositionsService = TestBed.get(SystemDispositionsService);
    expect(service).toBeTruthy();
  });
});
