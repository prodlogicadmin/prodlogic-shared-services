import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConversionFactor } from "@src/app/models/Marketing/ConversionFactor";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";
import { Validation } from "../Common/Validation/validation.service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": environment.baseUrl,
  }),
};

@Injectable({
  providedIn: "root",
})
export class ConversionFactorService {
  private url = environment.baseUrl + "api/marketstatements";

  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get(this.url);
  }

  GetById(id: number) {
    return this.http.get<ConversionFactor>(this.url + "/" + id);
  }

  Create(data: ConversionFactor): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  Update(data: ConversionFactor): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.id,
      JSON.stringify(data),
      httpOptions
    );
  }

  Delete(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }
}
