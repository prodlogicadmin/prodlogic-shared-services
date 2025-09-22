import { TestBed } from '@angular/core/testing';

import { GasComponentsService } from './gas-components.service';

describe('GasComponentsService', () => {
  let service: GasComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GasComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
