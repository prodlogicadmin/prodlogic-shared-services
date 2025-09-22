import { TestBed } from '@angular/core/testing';

import { PointTypesService } from './point-types.service';

describe('PointTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointTypesService = TestBed.get(PointTypesService);
    expect(service).toBeTruthy();
  });
});
