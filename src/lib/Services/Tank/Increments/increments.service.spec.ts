import { TestBed } from '@angular/core/testing';

import { IncrementsService } from './increments.service';

describe('IncrementsService', () => {
  let service: IncrementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncrementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
