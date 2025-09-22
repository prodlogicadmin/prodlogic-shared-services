import { TestBed } from '@angular/core/testing';

import { SystemPointTypesService } from './system-point-types.service';

describe('SystemPointTypesService', () => {
  let service: SystemPointTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemPointTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
