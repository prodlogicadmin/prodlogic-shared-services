import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Validation } from "../../Common/Validation/validation.service";
import { environment } from "src/environments/environment";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { User } from "../../Common/Users/users.service";

export interface Analysis {
  id: number;
  prodPointId: number;
  startDate: Date;
  btuFactor: number;
  isWet: boolean;
  enterByGpm: boolean;
  comments: string;
  pctNitrogen: number;
  pctHelium: number;
  pctCo2: number;
  pctH2S: number;
  pctMethane: number;
  pctEthane: number;
  pctPropane: number;
  pctiButane: number;
  pctnButane: number;
  pctiPentane: number;
  pctnPentane: number;
  pctHexane: number;
  pctHeptane: number;
  pctOctane: number;
  pctNonane: number;
  pctOther: number;
  pctTotal: number;
  gpmNitrogen: number;
  gpmCo2: number;
  gpmMethane: number;
  gpmEthane: number;
  gpmPropane: number;
  gpmiButane: number;
  gpmnButane: number;
  gpmiPentane: number;
  gpmnPentane: number;
  gpmHexane: number;
  gpmTotal: number;
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
export class AnalysesService {
  private url = environment.baseUrl + "api/analyses";

  constructor(private http: HttpClient) {}

  GetAnalyses() {
    return this.http.get<Analysis[]>(this.url);
  }

  GetFilteredPoints(filter: AttributeFilter): Observable<[Analysis[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[Analysis[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetAnalysesByPoint(prodPointId: number) {
    return this.http.get<Analysis>(this.url + "/list/" + prodPointId);
  }

  GetAnalysis(id: number) {
    return this.http.get<Analysis>(this.url + "/" + id);
  }

  CreateAnalysis(data: Analysis): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateAnalysis(id: number, data: Analysis): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  Delete(id: number, data: User): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/delete/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }
}
