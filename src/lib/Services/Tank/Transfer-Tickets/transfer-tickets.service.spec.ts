import { TestBed } from '@angular/core/testing';

import { TransferTicketsService } from './transfer-tickets.service';

describe('TransferTicketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferTicketsService = TestBed.get(TransferTicketsService);
    expect(service).toBeTruthy();
  });
});
