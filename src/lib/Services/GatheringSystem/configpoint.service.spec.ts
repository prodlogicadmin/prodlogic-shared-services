import { TestBed } from '@angular/core/testing';

import { ConfigpointService } from './configpoint.service';

describe('ConfigpointService', () => {
  let service: ConfigpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
