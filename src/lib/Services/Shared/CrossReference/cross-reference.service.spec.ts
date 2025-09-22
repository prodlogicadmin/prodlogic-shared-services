import { TestBed } from '@angular/core/testing';

import { CrossReferenceService } from './cross-reference.service';

describe('CrossReferenceService', () => {
  let service: CrossReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
