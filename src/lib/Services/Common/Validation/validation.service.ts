import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface Validation {
  status: string;
  title: string;
  message: string;
  productCode: string;
  dispostionCode: string;
  volume: number;
  recordId: number;
  prodPointId?: number;
  isDialog: boolean;
  object;
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
export class ValidationService {
  private url = environment.baseUrl + "api/validations";

  constructor(private http: HttpClient) {}

  GetValidation() {
    return this.http.get<Validation>(this.url);
  }
}
