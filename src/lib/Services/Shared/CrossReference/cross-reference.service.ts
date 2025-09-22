import { userInfo } from "os";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Validation } from "../../Common/Validation/validation.service";
import { environment } from "src/environments/environment";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { User } from "../../Common/Users/users.service";

export interface CrossReference {
  id: number;
  prodPointId: number;
  crossReferenceTypeId: number;
  systemCrossReferenceId: number;
  crossReferenceValue: string;
  linkedProdPointId?: number;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  created: Date;
  userInfo: User;
  label: string;
}

export interface CrossReferenceType {
  id: number;
  code: string;
  name: string;
  label?: string;
  description: string;
  systemCrossReferenceId: number;
  createdBy: string;
  created: Date;
  userInfo: User;
}

export interface SystemCrossReference {
  id: number;
  typeCode: string;
  typeName: string;
  label?: string;
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
export class CrossReferenceService {
  private url = environment.baseUrl + "api/crossreference";

  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get<CrossReference[]>(this.url);
  }

  GetTypes() {
    return this.http.get<CrossReferenceType[]>(this.url + "/types");
  }

  GetSystemTypes() {
    return this.http.get<SystemCrossReference[]>(this.url + "/systemtypes");
  }

  GetByPoint(prodPointId: number) {
    return this.http.get<CrossReference[]>(this.url + "/list/" + prodPointId);
  }

  GetByRelatedPoints(prodPointId: number) {
    return this.http.get<CrossReference[]>(
      this.url + "/list/related/" + prodPointId
    );
  }

  GetById(id: number) {
    return this.http.get<CrossReference>(this.url + "/" + id);
  }

  GetTypeById(id: number) {
    return this.http.get<CrossReferenceType>(this.url + "/types/" + id);
  }

  Create(data: CrossReference): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  CreateType(data: CrossReferenceType): Observable<Validation> {
    return this.http.post<Validation>(
      this.url + "/types",
      JSON.stringify(data),
      httpOptions
    );
  }

  Update(id: number, data: CrossReference): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateType(id: number, data: CrossReferenceType): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/types/" + id,
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

  DeleteType(id: number, user: User): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/delete/types/" + id,
      JSON.stringify(user),
      httpOptions
    );
  }
}
