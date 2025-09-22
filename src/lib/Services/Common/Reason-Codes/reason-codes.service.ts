import { userInfo } from "os";
import { Validation } from "src/app/Services/Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../Users/users.service";

export interface ReasonCode {
  id: number;
  subReasonCode: string;
  label: string;
  subReasonDesc: string;
  sysReasonCodeId: number;
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
export class ReasonCodesService {
  private url = environment.baseUrl + "api/reasoncodes";

  constructor(private http: HttpClient) {}

  GetReasonCodes() {
    return this.http.get<ReasonCode[]>(this.url);
  }

  GetReasonCode(id: number) {
    return this.http.get<ReasonCode>(this.url + "/" + id);
  }

  CreateReasonCode(data: ReasonCode): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateReasonCode(data: ReasonCode): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.id,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteReasonCode(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }
}
