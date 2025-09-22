import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@src/environments/environment";
import { User } from "../Common/Users/users.service";
import { Observable, catchError, throwError } from "rxjs";
import { Validation } from "../Common/Validation/validation.service";

export interface WellDetail {
  id?: number;
  prodPointId: number;
  stateCode: string;
  countyCode: string;
  apiNumberFull: string;
  apiStateCode: string;
  apiCountyCode: string;
  apiUniqueWellId: string;
  leaseNumber: string;
  leaseName: string;
  wellNumber: string;
  fieldNumber: string;
  fieldName: string;
  district: string;
  completionDate: Date;
  spudDate: Date;
  firstProductionDate: Date;
  firstSalesDate: Date;
  createdBy: string;
  created: Date;
  userInfo: User;
}

export interface WellProdStatus {
  id?: number;
  prodPointId: number;
  startDate: Date;
  wellType: string;
  phaseId: number;
  methodId: number;
  operatorId?: number;
  createdBy: string;
  created: Date;
  userInfo: User;
}

export interface ProdMethod {
  id?: number;
  methodCode: string;
  methodName: string;
  description: string;
  createdBy: string;
  created: Date;
  label?: string; // For PrimeNG dropdown
}

export interface ProdPhase {
  id?: number;
  phaseCode: string;
  phaseName: string;
  description: string;
  createdBy: string;
  created: Date;
  label?: string; // For PrimeNG dropdown
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
export class WellService {
  private url = environment.baseUrl + "api/wells";

  constructor(private http: HttpClient) {}

  GetWellDetail(id: number) {
    return this.http.get<WellDetail>(this.url + "/" + id);
  }

  CreateWellDetail(detail: WellDetail): Observable<Validation> {
    return this.http.post<Validation>(this.url, detail, httpOptions);
  }

  UpdateWellDetail(detail: WellDetail): Observable<Validation> {
    return this.http
      .put<Validation>(
        this.url + "/" + detail.prodPointId,
        JSON.stringify(detail),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  GetWellProdStatus(id: number) {
    return this.http.get<WellProdStatus>(this.url + "/status/" + id);
  }

  GetWellProdStatusByPoint(prodPointId: number) {
    return this.http.get<WellProdStatus[]>(
      this.url + "/status/point/" + prodPointId
    );
  }

  GetAllWellProdStatus() {
    return this.http.get<WellProdStatus[]>(this.url + "/status/");
  }

  CreateWellProdStatus(detail: WellProdStatus): Observable<Validation> {
    return this.http.post<Validation>(
      this.url + "/status/",
      detail,
      httpOptions
    );
  }

  UpdateWellProdStatus(detail: WellProdStatus): Observable<Validation> {
    return this.http
      .put<Validation>(
        this.url + "/status/" + detail.id,
        JSON.stringify(detail),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  DeleteWellProdStatus(id: number): Observable<Validation> {
    return this.http.delete<Validation>(
      this.url + "/status/" + id,
      httpOptions
    );
  }

  GetAllPhases() {
    return this.http.get<ProdPhase[]>(this.url + "/phases/");
  }

  GetAllMethods() {
    return this.http.get<ProdMethod[]>(this.url + "/methods/");
  }

  // GetAllEventTypes() {
  //   return this.http.get<EventType[]>(this.url + "/events/");
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
