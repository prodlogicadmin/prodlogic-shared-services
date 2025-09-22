import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {
  SingleWellLease,
  SingleWellLeaseDetail,
} from "src/app/models/Type/SingleWellLease/SingleWellLeaseDetail";
import { Observable } from "rxjs";
import { Validation } from "../Common/Validation/validation.service";
import { SingleWellLeaseSnapshot } from "src/app/models/Type/SingleWellLease/SingleWellLeaseSnapshot";
import { environment } from "src/environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": environment.baseUrl,
  }),
};

@Injectable({
  providedIn: "root",
})
export class SwlService {
  private url = environment.baseUrl + "api/singlewelllease";

  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get(this.url);
  }

  GetByPoint(prodPointId: number) {
    return this.http.get<SingleWellLease[]>(this.url + "/list/" + prodPointId);
  }

  Get(id: number) {
    return this.http.get<SingleWellLease>(this.url + "/" + id);
  }

  Create(data: SingleWellLease): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  Update(id: number, data: SingleWellLease): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteDetail(id: number) {
    return this.http.delete<Validation>(this.url + "/detail/" + id);
  }

  Delete(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }

  RemovePoint(id: number) {
    return this.http.delete<Validation>(this.url + "/remove/" + id);
  }

  GetSnapshot(
    data: SingleWellLeaseDetail
  ): Observable<SingleWellLeaseSnapshot> {
    return this.http.put<SingleWellLeaseSnapshot>(
      this.url + "/snapshot",
      JSON.stringify(data),
      httpOptions
    );
  }
}
