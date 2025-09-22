import { userInfo } from "os";
import { Validation } from "./../../Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { User } from "../../Common/Users/users.service";

export interface TankInventory {
  id: number;
  prodPointId: number;
  tankInvStartDate: Date;
  topGaugedFeet: number;
  topGaugedInches: number;
  topGaugedFractions: number;
  topGauge: string;
  gaugedVolume: number;
  colorCutGaugedFeet: number;
  colorCutGaugedInches: number;
  colorCutGaugedFractions: number;
  colorCut: string;
  colorCutVolume: number;
  isStrap: boolean;
  comments: string;
  createdBy: string;
  created: Date;
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
export class TankInventoryService {
  private url = environment.baseUrl + "api/tankinventory";

  constructor(private http: HttpClient) {}

  GetTankInventories() {
    return this.http.get(this.url);
  }

  GetFilteredPoints(
    filter: AttributeFilter
  ): Observable<[TankInventory[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[TankInventory[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetTankInventory(id: number) {
    return this.http.get<TankInventory>(this.url + "/" + id);
  }

  GetTankInventoryByPoint(prodPointId: number) {
    return this.http.get<TankInventory>(this.url + "/list/" + prodPointId);
  }

  CreateTankInventory(data: TankInventory): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  RouteEntry(data: TankInventory): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/route",
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateTankInventory(data: TankInventory): Observable<Validation> {
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

  CalculateVolume(data: TankInventory) {
    return this.http.post<Validation>(
      this.url + "/calculate",
      JSON.stringify(data),
      httpOptions
    );
  }
}
