import { TestBed } from '@angular/core/testing';

import { ContactCodeMasksService } from './contact-code-masks.service';

describe('ContactCodeMasksService', () => {
  let service: ContactCodeMasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactCodeMasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
