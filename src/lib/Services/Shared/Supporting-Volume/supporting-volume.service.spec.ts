import { TestBed } from "@angular/core/testing";

import { SupportingVolumeService } from "./supporting-volume.service";

describe("SupportingVolumeService", () => {
  let service: SupportingVolumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportingVolumeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
