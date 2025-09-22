import { TestBed } from '@angular/core/testing';

import { SwlService } from './swl.service';

describe('SwlService', () => {
  let service: SwlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
