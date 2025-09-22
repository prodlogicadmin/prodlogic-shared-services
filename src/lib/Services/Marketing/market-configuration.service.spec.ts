import { TestBed } from '@angular/core/testing';

import { MarketConfigurationService } from './market-configuration.service';

describe('MarketConfigurationService', () => {
  let service: MarketConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
