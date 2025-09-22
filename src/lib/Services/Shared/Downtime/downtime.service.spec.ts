import { TestBed } from '@angular/core/testing';

import { DowntimeService } from './downtime.service';

describe('DowntimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DowntimeService = TestBed.get(DowntimeService);
    expect(service).toBeTruthy();
  });
});
