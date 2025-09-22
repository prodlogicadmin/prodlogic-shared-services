import { TestBed } from '@angular/core/testing';

import { CommonReadingsService } from './common-readings.service';

describe('CommonReadingsService', () => {
  let service: CommonReadingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonReadingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
