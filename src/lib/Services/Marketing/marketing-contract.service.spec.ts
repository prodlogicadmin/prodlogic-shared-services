import { TestBed } from '@angular/core/testing';

import { MarketingContractService } from './marketing-contract.service';

describe('MarketingContractService', () => {
  let service: MarketingContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketingContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
