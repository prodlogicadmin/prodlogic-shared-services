import { userInfo } from "os";
import { run } from "node:test";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RoutePoint, RouteStop } from "@src/app/models/Type/Routes/Route";
import { environment } from "@src/environments/environment";
import { Validation } from "../Common/Validation/validation.service";
import { Observable } from "rxjs";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { RouteAssignment } from "@src/app/models/Type/Routes/RouteAssignment";
import { MeterReading } from "@src/app/models/Type/Meter/MeterReading";

import { TankInventory } from "@src/app/models/Type/Tank/TankInventory";
import { WellTest } from "@src/app/models/Type/Zone/Welltests";
import { RunTicket } from "@src/app/models/Type/Tank/RunTicket";
import { User } from "../Common/Users/users.service";
import { Pressure } from "@src/app/models/Shared/Pressure";
import { Downtime } from "@src/app/models/Shared/Downtime";
import { RouteEntry } from "@src/app/models/Route/RouteEntry";
import {
  DowntimeEntry,
  InventoryEntry,
  MeterReadingEntry,
  PressureEntry,
  WellTestEntry,
} from "@src/app/Components/Type-Components/Routes/route/EntryModels/WellTestEntry";

interface Route {
  id: number;
  routeId: number;
  prodPointId: number;
  routeCode: string;
  routeName: string;
  area: string;
  zoneCount: number;
  routeDescription: string;
  routeStops: RouteStop[];
  routeAssignments: RouteAssignment[];
  createdBy: string;
  created: Date;
  userInfo: User;
}

interface RouteData {
  routeId: number;
  stopId: number;
  meterReadings: MeterReading[];
  wellTests: WellTest[];
  tankInventories: TankInventory[];
  runTickets: RunTicket[];
  downtime: Downtime[];
  pressures: Pressure[];
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
export class RouteService {
  private url = environment.baseUrl + "api/routes";

  constructor(private http: HttpClient) {}

  GetRoutes() {
    return this.http.get<Route[]>(this.url);
  }

  UpdateRouteInfo(id: number, data: Route): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  GetFilteredRoutes(filter: AttributeFilter): Observable<[Route[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[Route[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetRoute(id: number) {
    return this.http.get<Route>(this.url + "/" + id);
  }

  GetAvailablePoints() {
    return this.http.get<Route>(this.url + "/unassignedpoints");
  }

  GetRoutePoints(id: number) {
    return this.http.get<Route>(this.url + "/routePoints/" + id);
  }

  UpdateRouteStopOrder(id: number, data: RoutePoint[]): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/routeStops/reorder/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  GetRouteAssignments(id: number) {
    return this.http.get<Route>(this.url + "/routeAssignment/" + id);
  }

  GetRouteDataByStopId(id: number) {
    return this.http.get<RouteData>(this.url + "/routeData/" + id);
  }

  CreateRouteStop(data: RouteStop) {
    return this.http.post<Validation>(
      this.url + "/routeStops",
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateRouteStop(id: number, data: RouteStop): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/routeStops/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteRouteStop(id: number) {
    return this.http.delete<Validation>(this.url + "/routeStops/" + id);
  }

  UpdateRouteAssignments(id: number, data: Route): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/routeAssign/" + id,
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

  PostRouteEntry(stopId: number, data: RouteEntry) {
    return this.http.put<RouteEntry>(
      this.url + "/postrouteentry/" + stopId,
      JSON.stringify(data),
      httpOptions
    );
  }

  PostMeterReadingEntry(stopId: number, data: MeterReading) {
    return this.http.put<MeterReadingEntry>(
      this.url + "/postmeterreading/" + stopId,
      JSON.stringify(data),
      httpOptions
    );
  }

  PostPressureEntry(stopId: number, data: Pressure) {
    return this.http.put<PressureEntry>(
      this.url + "/postpressure/" + stopId,
      JSON.stringify(data),
      httpOptions
    );
  }

  PostWelltestEntry(stopId: number, data: WellTest) {
    return this.http.put<WellTestEntry>(
      this.url + "/postwelltest/" + stopId,
      JSON.stringify(data),
      httpOptions
    );
  }

  PostInventoryEntry(stopId: number, data: TankInventory) {
    return this.http.put<InventoryEntry>(
      this.url + "/postinventory/" + stopId,
      JSON.stringify(data),
      httpOptions
    );
  }

  PostDowntimeEntry(stopId: number, data: Downtime) {
    return this.http.put<DowntimeEntry>(
      this.url + "/postdowntime/" + stopId,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteDowntime(recordId: number, user: User) {
    return this.http.put<Validation>(
      this.url + "/deletedowntime/" + recordId,
      JSON.stringify(user),
      httpOptions
    );
  }

  DeleteWellTest(recordId: number, user: User) {
    return this.http.put<Validation>(
      this.url + "/deletewelltest/" + recordId,
      JSON.stringify(user),
      httpOptions
    );
  }

  DeleteMeterReading(recordId: number, user: User) {
    return this.http.put<Validation>(
      this.url + "/deletemeterreading/" + recordId,
      JSON.stringify(user),
      httpOptions
    );
  }

  DeleteInventory(recordId: number, user: User) {
    return this.http.put<Validation>(
      this.url + "/deleteinventory/" + recordId,
      JSON.stringify(user),
      httpOptions
    );
  }

  DeletePressure(recordId: number, user: User) {
    return this.http.put<Validation>(
      this.url + "/deletepressure/" + recordId,
      JSON.stringify(user),
      httpOptions
    );
  }
}
