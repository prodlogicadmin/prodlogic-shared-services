import { userInfo } from "os";
import { Validation } from "src/app/Services/Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../Users/users.service";

export interface Disposition {
  id: number;
  dispCode: string;
  label: string;
  dispDescription: string;
  systemDispositionId: number;
  systemProductId: number;
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
export class DispositionsService {
  private url = environment.baseUrl + "api/dispositions";

  constructor(private http: HttpClient) {}

  GetDispositions() {
    return this.http.get<Disposition[]>(this.url);
  }
  GetCommonDispositions() {
    return this.http.get<Disposition[]>(this.url + "/common");
  }

  GetDisposition(id: number) {
    return this.http.get<Disposition>(this.url + "/" + id);
  }

  CreateDisposition(data: Disposition): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateDisposition(data: Disposition): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.id,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteDisposition(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }
}
