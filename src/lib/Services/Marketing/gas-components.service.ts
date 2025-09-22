import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MarketStatement } from "@src/app/models/Marketing/MarketingInterfaces";
import { environment } from "@src/environments/environment";

export interface Component {
  id: number;
  componentCode: string;
  componentDescription: string;
  createdBy: string;
  created: Date;
}

export interface ConversionFactor {
  id: number;
  name: number;
  startDate: Date;
  endDate: Date;
  comments: string;
  details: ConversionFactorDetail[];
}

export interface ConversionFactorDetail {
  id: number;
  conversionFactorId: number;
  componentId: number;
  pressureBase: number;
  btuFactor: number;
  mmbtuGal: number;
  mcfGal: number;
  createdBy: string;
  created: Date;
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
export class GasComponentsService {
  private url = environment.baseUrl + "api/components";

  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get<Component[]>(this.url);
  }

  GetById(id: number) {
    return this.http.get<Component>(this.url + "/" + id);
  }

  GetAllFactors() {
    return this.http.get<ConversionFactor>(this.url + "/factors/");
  }
  GetFactorsById(id: number) {
    return this.http.get<ConversionFactor>(this.url + "/factors/" + id);
  }
}
