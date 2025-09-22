import { Validation } from "./../../Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../../Common/Users/users.service";

export interface Strap {
  id: number;
  prodPointId: number;
  tankStrapVersionId: number;
  strapFeet: number;
  strapInches: number;
  strapFractions: number;
  increments: number;
  volumeFactor: number;
  volume: number;
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
export class TankStrapService {
  private url = environment.baseUrl + "api/tankstraps";

  constructor(private http: HttpClient) {}

  GetStraps() {
    return this.http.get(this.url);
  }

  GetStrap(id: number) {
    return this.http.get<Strap>(this.url + "/" + id);
  }

  GetStrapsByPoint(prodPointId: number) {
    return this.http.get(this.url + "/list/" + prodPointId);
  }

  CreateStrap(data: Strap): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateStrap(data: Strap): Observable<Validation> {
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
