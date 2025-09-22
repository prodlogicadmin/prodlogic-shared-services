import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MarketingContract } from "@src/app/models/Marketing/MarketingInterfaces";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";
import { Validation } from "../Common/Validation/validation.service";
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
export class MarketingContractService {
  private url = environment.baseUrl + "api/marketingcontract";

  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get(this.url);
  }
  GetAllById(id: number) {
    return this.http.get<MarketingContract[]>(this.url + "/list/" + id);
  }
  GetById(id: number) {
    return this.http.get<MarketingContract>(this.url + "/" + id);
  }

  Create(data: MarketingContract): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  Update(data: MarketingContract): Observable<Validation> {
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
