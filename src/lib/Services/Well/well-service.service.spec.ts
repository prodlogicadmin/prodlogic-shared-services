import { TestBed } from '@angular/core/testing';

import { WellServiceService } from './well-service.service';

describe('WellServiceService', () => {
  let service: WellServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WellServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
