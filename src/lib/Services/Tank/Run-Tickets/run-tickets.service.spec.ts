import { TestBed } from '@angular/core/testing';

import { RunTicketsService } from './run-tickets.service';

describe('RunTicketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RunTicketsService = TestBed.get(RunTicketsService);
    expect(service).toBeTruthy();
  });
});
