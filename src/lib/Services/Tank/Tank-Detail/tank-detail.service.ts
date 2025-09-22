import { userInfo } from "os";
import { Validation } from "./../../Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../../Common/Users/users.service";

export interface TankDetail {
  id: number;
  prodPointId: number;
  tankBlmNumber: string;
  tankStartDate: Date;
  productId: number;
  incrementId: number;
  capacity: number;
  closeStatements: boolean;
  comments: string;
  createdBy: string;
  created: Date;
  lastDispId: number;
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
export class TankDetailService {
  private url = environment.baseUrl + "api/tankdetails";

  constructor(private http: HttpClient) {}

  GetTanks() {
    return this.http.get<TankDetail[]>(this.url);
  }

  GetTankDetail(id: number) {
    return this.http.get<TankDetail>(this.url + "/" + id);
  }

  CreateTankDetail(data: TankDetail): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateTankDetail(data: TankDetail): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.prodPointId,
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
