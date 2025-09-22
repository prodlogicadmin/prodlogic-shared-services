import { userInfo } from "os";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@src/environments/environment";
import { catchError, Observable, throwError } from "rxjs";
import { Validation } from "../Common/Validation/validation.service";
import { User } from "@src/app/models/System/User";

export interface MapType {
  id: number;
  typeName: string;
  description: string;
  createdBy: string;
  created: Date;
}

export interface MapLocation {
  id: number;
  prodPointId: number;
  mapTypeId: number;
  typeName: string;
  latitude: number;
  longitude: number;
  createdBy: string;
  created: Date;
}

export class MapLocation {
  constructor(
    public id: number = 0,
    public prodPointId: number = 0,
    public mapTypeId: number = 0,
    public latitude: number = 0,
    public longitude: number = 0,
    public createdBy: string = "",
    public created: Date = new Date(),
    public userInfo: User = new User()
  ) {}
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
export class MapService {
  private url = environment.baseUrl + "api/maps";

  constructor(private http: HttpClient) {}

  GetMapTypes() {
    return this.http.get<MapType>(this.url + "/types");
  }

  GetMapLocation(prodPointId: number) {
    return this.http.get<MapLocation>(this.url + "/location/" + prodPointId);
  }

  GetMapLocationByPoint(prodPointId: number) {
    return this.http.get<MapLocation[]>(
      this.url + "/location/point/" + prodPointId
    );
  }

  CreateMapLocation(detail: MapLocation): Observable<Validation> {
    return this.http.post<Validation>(
      this.url + "/location",
      detail,
      httpOptions
    );
  }

  UpdateMapLocation(detail: MapLocation): Observable<Validation> {
    return this.http
      .put<Validation>(
        this.url + "/location/" + detail.prodPointId,
        JSON.stringify(detail),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  DeleteMapLocation(id: number): Observable<Validation> {
    return this.http
      .delete<Validation>(this.url + "/location/" + id, httpOptions)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: any): Observable<never> {
    console.error("An error occurred:", error); // for demo purposes only
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
