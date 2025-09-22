import { Validation } from "src/app/Services/Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EngineValidation } from "src/app/models/Engine/EngineValidation";
import { Theoretical } from "src/app/models/Engine/Theoretical";
import {
  ProductionRow,
  BalanceRow,
  AllocatedRow,
} from "src/app/models/Engine/ProductionRow";
import { Product } from "@src/app/models/System/Product";

export interface EngineResult {
  theoreticals: Theoretical[];
  validations: EngineValidation[];
  productionRows: ProductionRow[];
  balanceRows: BalanceRow[];
  allocatedRows: AllocatedRow[];
  displayedText: string[];
  elapsed: number;
}

export interface EngineOptions {
  allocOptions: number;
  date: string;
  endDate: string;
  allocationSystemType: number;
  selectedProducts: Product[];
  processId?: number;
  includeSingleWellLeases: boolean;
}

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": environment.baseUrl,
  }),
};

@Injectable({
  providedIn: "root",
})
export class EngineService {
  private url = environment.baseUrl + "api/engine";

  constructor(private http: HttpClient) {}

  GetConfigurationData(id: number, options: EngineOptions) {
    return this.http.post<any>(this.url + "/" + id, options);
  }
}
