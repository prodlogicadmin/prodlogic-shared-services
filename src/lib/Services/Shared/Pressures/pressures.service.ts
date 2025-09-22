import { userInfo } from "os";
import { Validation } from "../../Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { User } from "../../Common/Users/users.service";

export interface Pressure {
  prodPointId: number;
  startDate: Date;
  flowPressure: number;
  linePressure: number;
  tubingPressure: number;
  casingPressure: number;
  bottomHolePressure: number;
  choke: number;
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
export class PressuresService {
  private url = environment.baseUrl + "api/pressures";

  constructor(private http: HttpClient) {}

  GetPressures() {
    return this.http.get<Pressure[]>(this.url);
  }

  GetFilteredPoints(filter: AttributeFilter): Observable<[Pressure[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[Pressure[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetPressuresByPoint(prodPointId: number) {
    return this.http.get<Pressure>(this.url + "/list/" + prodPointId);
  }

  GetPressure(id: number) {
    return this.http.get<Pressure>(this.url + "/" + id);
  }

  CreatePressure(data: Pressure): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  RouteEntry(data: Pressure): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/route",
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdatePressure(id: number, data: Pressure): Observable<Validation> {
    console.log(this.url + "/" + data.id);
    return this.http.put<Validation>(
      this.url + "/" + id,
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
