import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { Validation } from "../../Common/Validation/validation.service";
import { User } from "../../Common/Users/users.service";

export interface FuelUsage {
  prodPointId: number;
  startDate: Date;
  endDate: Date;
  volume: number;
  mmbtu: number;
  timeIntervalId: number;
  timeIntervalType: string;
  productId: number;
  dispositionId: number;
  btuFactor: number;
  pressureBase: number;
  comments: string;
  createdBy: string;
  created: Date;
  id: number;
  userInfo: User;
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
export class FuelUsageService {
  private url = environment.baseUrl + "api/fuelusages";

  constructor(private http: HttpClient) {}

  GetFuelUsage() {
    return this.http.get<FuelUsage[]>(this.url);
  }

  GetFilteredPoints(
    filter: AttributeFilter
  ): Observable<[FuelUsage[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[FuelUsage[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetFuelUsageByPoint(prodPointId: number) {
    return this.http.get<FuelUsage>(this.url + "/list/" + prodPointId);
  }

  GetFuelUsageById(id: number) {
    return this.http.get<FuelUsage>(this.url + "/" + id);
  }

  CreateFuelUsage(data: FuelUsage): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateFuelUsage(data: FuelUsage): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.id,
      JSON.stringify(data),
      httpOptions
    );
  }

  Delete(id: number, user: User): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/delete/" + id,
      JSON.stringify(user),
      httpOptions
    );
  }
}
