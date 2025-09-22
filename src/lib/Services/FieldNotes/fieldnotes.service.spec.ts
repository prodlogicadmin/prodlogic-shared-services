import { TestBed } from '@angular/core/testing';

import { FieldnotesService } from './fieldnotes.service';

describe('FieldnotesService', () => {
  let service: FieldnotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldnotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
