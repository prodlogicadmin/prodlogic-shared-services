import { TestBed } from "@angular/core/testing";

import { ProductionDetailService } from "./productionDetail.service";

describe("ProductionDetailService", () => {
  let service: ProductionDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionDetailService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
