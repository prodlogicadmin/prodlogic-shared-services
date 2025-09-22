import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Validation } from "../../Common/Validation/validation.service";
import { environment } from "src/environments/environment";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { User } from "../../Common/Users/users.service";

export interface Downtime {
  prodPointId: number;
  startDate: Date;
  endDate: Date;
  hours: number;
  reasonCodeId: number;
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
export class DowntimeService {
  private url = environment.baseUrl + "api/downtime";

  constructor(private http: HttpClient) {}

  GetDowntime() {
    return this.http.get<Downtime[]>(this.url);
  }

  GetFilteredPoints(filter: AttributeFilter): Observable<[Downtime[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[Downtime[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetDowntimeByPoint(prodPointId: number) {
    return this.http.get<Downtime>(this.url + "/list/" + prodPointId);
  }

  GetDowntimeById(id: number) {
    return this.http.get<Downtime>(this.url + "/" + id);
  }

  RouteEntry(data: Downtime): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/route",
      JSON.stringify(data),
      httpOptions
    );
  }

  CreateDowntime(data: Downtime): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateDowntime(id: number, data: Downtime): Observable<Validation> {
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
