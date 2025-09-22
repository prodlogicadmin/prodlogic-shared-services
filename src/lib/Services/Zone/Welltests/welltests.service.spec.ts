import { TestBed } from '@angular/core/testing';

import { WelltestsService } from './welltests.service';

describe('WelltestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WelltestsService = TestBed.get(WelltestsService);
    expect(service).toBeTruthy();
  });
});
