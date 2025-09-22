import { userInfo } from "os";
import { Validation } from "./../../Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../../Common/Users/users.service";

export interface StrapVersion {
  id: number;
  prodPointId: number;
  strapVersionDate: Date;
  strapVersion: string;
  capacity: number;
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
export class TankStrapVersionService {
  private url = environment.baseUrl + "api/tankstrapversions";

  constructor(private http: HttpClient) {}

  GetStrapVersions() {
    return this.http.get(this.url);
  }

  GetStrapVersion(id: number) {
    return this.http.get<StrapVersion>(this.url + "/" + id);
  }

  GetStrapVersionByPoint(prodPointId: number) {
    return this.http.get<StrapVersion[]>(this.url + "/list/" + prodPointId);
  }

  CreateStrapVersion(data: StrapVersion): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateStrapVersion(data: StrapVersion): Observable<Validation> {
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
