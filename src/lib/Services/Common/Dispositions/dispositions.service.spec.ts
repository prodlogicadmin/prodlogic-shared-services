import { TestBed } from '@angular/core/testing';

import { DispositionsService } from './dispositions.service';

describe('DispositionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispositionsService = TestBed.get(DispositionsService);
    expect(service).toBeTruthy();
  });
});
