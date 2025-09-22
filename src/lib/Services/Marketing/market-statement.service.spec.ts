import { TestBed } from '@angular/core/testing';

import { MarketStatementService } from './market-statement.service';

describe('MarketStatementService', () => {
  let service: MarketStatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketStatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
