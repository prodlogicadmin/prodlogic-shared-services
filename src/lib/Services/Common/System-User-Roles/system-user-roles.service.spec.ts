import { TestBed } from '@angular/core/testing';

import { SystemUserRolesService } from './system-user-roles.service';

describe('SystemUserRolesService', () => {
  let service: SystemUserRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemUserRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
