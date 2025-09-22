import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MarketStatement } from "@src/app/models/Marketing/MarketingInterfaces";
import { environment } from "@src/environments/environment";
import { Validation } from "../Common/Validation/validation.service";
import { Observable } from "rxjs";
import { MarketStmtDetail } from "@src/app/models/Marketing/MarketStatement";
import { User } from "../Common/Users/users.service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": environment.baseUrl,
  }),
};

@Injectable({
  providedIn: "root",
})
export class MarketStatementService {
  private url = environment.baseUrl + "api/marketstatements";

  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get(this.url);
  }

  GetById(id: number) {
    return this.http.get<MarketStatement>(this.url + "/" + id);
  }

  GetByModel(data: any): Observable<MarketStatement> {
    return this.http.put<MarketStatement>(
      this.url + "/statement/" + data.prodPointId,
      JSON.stringify(data),
      httpOptions
    );
  }

  Create(data: MarketStatement): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  CreateDetail(data: MarketStmtDetail): Observable<Validation> {
    return this.http.post<Validation>(
      this.url + "/detail",
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateDetail(data: MarketStmtDetail): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/detail/" + data.prodPointId,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteDetail(id: number, user: User): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/delete/detail/" + id,
      JSON.stringify(user),
      httpOptions
    );
  }

  Update(data: MarketStatement): Observable<Validation> {
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
