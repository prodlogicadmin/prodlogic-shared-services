import { TestBed } from '@angular/core/testing';

import { CloseProcessService } from './close-process.service';

describe('CloseProcessService', () => {
  let service: CloseProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
