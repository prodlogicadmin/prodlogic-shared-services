import { userInfo } from "os";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";
import { Validation } from "../Common/Validation/validation.service";
import { User } from "../Common/Users/users.service";
import { MarketSalesMeter } from "@src/app/models/Marketing/MarketSalesMeter";
import { MarketTikPurchaser } from "@src/app/models/Marketing/MarketTikPurchaser";

export interface MarketConfiguration {
  id: number;
  prodPointId: number;
  startDate: Date;
  endDate: Date;
  marketMeterId: number;
  marketSalesMeters: MarketSalesMeter[];
  marketTikPurchasers: MarketTikPurchaser[];
  conversionFactorId: number;
  comments: string;
  createdBy: string;
  created: Date;
  shrink: boolean;
  userInfo: User;
  marketPoints: MarketPoint[];
}

export interface MarketPoint {
  id: number;
  configurationId: number;
  prodPointId: number;
  hasProduction: boolean;
  comments: string;
  createdBy: string;
  created: Date;
}

export interface MarketEngineResults {
  allocationDate: Date;
  configurationId: number;
  validationErrors: Validation[];
  marketingDetails: MarketingDetail[];
  balanceDetails: MarketAllocationModel[];
}

export interface MarketAllocationModel {
  prodPointId: number;
  prodPointCode: string;
  prodPointName: string;
  marketingPct: number;
  productionVolume: number;
  productionMmbtu: number;
  marketingVolume: number;
  marketingMmbtu: number;
  balanceVolume: number;
  balanceMmbtu: number;
  allocVolumePct: number;
  allocMmbtuPct: number;
  tikVolume: number;
  tikMmbtu: number;
}

export interface MarketingDetail {
  id: number;
  prodPointId: number;
  systemPointTypeId: number;
  pointTypeId: number;
  prodPointTypeName: string;
  prodPointName: string;
  prodPointCode: string;
  systemProductId: number;
  systemDispositionId: number;
  productId: number;
  product: any;
  dispositionId: number;
  disposition: any;
  systemProduct: string;
  productCode: string;
  componentCode: string;
  dispositionCode: string;
  systemDisposition: string;
  date: Date;
  volume: number;
  volumeMmbtu: number;
  btuFactor: number;
  value: number;
  marketMeterId: number;
  marketMeterPointTypeName: string;
  marketMeterProdPointCode: string;
  marketMeterProdPointName: string;
  systemProdPointId: number;
  systemProdPointCode: string;
  systemProdPointName: string;
  systemProdPointTypeName: string;
  configurationId: number;
  createdBy: string;
  created: Date;
}

export class RequestModel {
  id: number = 0;
  date: Date = new Date();
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
export class MarketConfigurationService {
  private url = environment.baseUrl + "api/marketconfiguration";

  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get(this.url);
  }

  GetAllById(id: number) {
    return this.http.get(this.url + "/list/" + id);
  }

  CheckProduction(id: number, date: string) {
    return this.http.get(this.url + "/check/" + id + "/" + date);
  }

  RunAllocation(data: RequestModel): Observable<MarketEngineResults> {
    return this.http.put<MarketEngineResults>(
      this.url + "/run",
      JSON.stringify(data),
      httpOptions
    );
  }

  PostAllocation(data: MarketEngineResults): Observable<Validation> {
    return this.http.post<Validation>(
      this.url + "/post",
      JSON.stringify(data),
      httpOptions
    );
  }

  GetById(id: number) {
    console.log(this.url + "/" + id);
    return this.http.get<MarketConfiguration>(this.url + "/" + id);
  }

  Create(data: MarketConfiguration): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  Update(data: MarketConfiguration): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.prodPointId,
      JSON.stringify(data),
      httpOptions
    );
  }

  Delete(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }
}
