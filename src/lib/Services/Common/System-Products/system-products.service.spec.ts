import { TestBed } from '@angular/core/testing';

import { SystemProductsService } from './system-products.service';

describe('SystemProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemProductsService = TestBed.get(SystemProductsService);
    expect(service).toBeTruthy();
  });
});
