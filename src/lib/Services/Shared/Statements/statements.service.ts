import { userInfo } from "os";
import { Validation } from "./../../Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { User } from "../../Common/Users/users.service";

export interface Statement {
  id: number;
  prodPointId: number;
  startDate: Date;
  statementDate: Date;
  productId: number;
  componentId: number;
  dispositionId: number;
  statementVolume: number;
  systemVolume: number;
  statementMmbtuVolume: number;
  btuFactor: number;
  pressureBase: number;
  apiGravity: number;
  statementNumber: string;
  transporterId: number;
  isWet: boolean;
  useAnalysis: boolean;
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
export class StatementsService {
  private url = environment.baseUrl + "api/statements";

  constructor(private http: HttpClient) {}

  GetStatements() {
    return this.http.get(this.url);
  }

  GetFilteredPoints(
    filter: AttributeFilter
  ): Observable<[Statement[], number]> {
    return this.http.post<[Statement[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetStatement(id: number) {
    return this.http.get<Statement>(this.url + "/" + id);
  }

  GetStatementsByPoint(prodPointId: number) {
    return this.http.get<Statement>(this.url + "/list/" + prodPointId);
  }

  CreateStatement(data: Statement): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateStatement(data: Statement): Observable<Validation> {
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
