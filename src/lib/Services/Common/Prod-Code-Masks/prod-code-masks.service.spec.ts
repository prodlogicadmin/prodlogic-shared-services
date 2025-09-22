import { TestBed } from '@angular/core/testing';

import { ProdCodeMasksService } from './prod-code-masks.service';

describe('ProdCodeMasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdCodeMasksService = TestBed.get(ProdCodeMasksService);
    expect(service).toBeTruthy();
  });
});
