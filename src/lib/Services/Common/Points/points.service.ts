import { userInfo } from "os";
import { Injectable, Output } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Validation } from "../Validation/validation.service";
import { environment } from "src/environments/environment";
import { PointFilter } from "@src/app/models/Filters/PointFilter";
import { User } from "../Users/users.service";

export interface Point {
  prodPointId?: number;
  prodPointCode: string;
  prodPointName: string;
  label?: string;
  systemPointTypeId?: number;
  pointTypeId: number;
  pointTypeName?: string;
  // pointType: string;
  archived: boolean;
  createdBy: string;
  created: Date;
  allocationSystemType: number;
  Selected?: boolean;
  userInfo: User;
  wellId?: number;
  order?: number;
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
export class PointsService {
  private url = environment.baseUrl + "api/prodpoints";
  id: number;

  constructor(private http: HttpClient) {}

  SetPointId(id: number) {
    this.id = id;
  }

  CurrentPointId() {
    return this.id;
  }

  GetPoint(id: number) {
    return this.http.get<Point>(this.url + "/" + id);
  }

  GetPoints() {
    return this.http.get<Point[]>(this.url);
  }

  GetRoutePoints() {
    return this.http.get<Point[]>(this.url + "/routepoints");
  }

  GetFilteredPoints(filter: PointFilter): Observable<[Point[], number]> {
    return this.http.post<[Point[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetConfigPoints() {
    return this.http.get<Point[]>(this.url + "/configpoints");
  }

  GetSystems() {
    return this.http.get<Point[]>(this.url + "/systems");
  }

  GetTanks() {
    return this.http.get<Point[]>(this.url + "/tanks");
  }

  GetWells() {
    return this.http.get<Point[]>(this.url + "/wells");
  }

  GetZones() {
    return this.http.get<Point[]>(this.url + "/zones");
  }

  GetMarketData() {
    return this.http.get<any[]>(this.url + "/marketdata");
  }

  GetZonesByMarketId(id) {
    return this.http.get<Point[]>(this.url + "/zones/ " + id);
  }
  GetMarketMeters() {
    return this.http.get<Point[]>(this.url + "/marketmeters");
  }
  GetSalesMeters() {
    return this.http.get<Point[]>(this.url + "/salesmeters");
  }

  CreatePoint(point: Point): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(point),
      httpOptions
    );
  }

  UpdatePoint(data: Point): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.prodPointId,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeletePoint(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }
}
