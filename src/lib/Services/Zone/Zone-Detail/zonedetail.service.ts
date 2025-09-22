import { userInfo } from "os";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import { Validation } from "../../Common/Validation/validation.service";
import { environment } from "src/environments/environment";
import { ProductionDetailRequest } from "@src/app/models/Request/PadDetailRequest";
import {
  DailyDetail,
  MonthlyDetail,
} from "../../Shared/ProductionDetail/productionDetail.service";
import { User } from "@src/app/models/System/User";

export interface ZoneDetail {
  id?: number;
  prodPointId: number;
  completionDate: Date;
  wellId: number;
  stateCode: string;
  countyCode: string;
  apiNumberFull: string;
  apiStateCode: string;
  apiCountyCode: string;
  apiUniqueWellId: string;
  apiDirSidetrackCode: string;
  apiEventSeqCode: string;
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
export class ZoneDetailService {
  private url = environment.baseUrl + "api/zonedetails";

  constructor(private http: HttpClient) {}

  GetZoneDetail(id: number) {
    return this.http.get<ZoneDetail>(this.url + "/" + id);
  }

  CreateZoneDetail(detail: ZoneDetail): Observable<Validation> {
    return this.http.post<Validation>(this.url, detail, httpOptions);
  }

  UpdateZoneDetail(detail: ZoneDetail): Observable<Validation> {
    return this.http
      .put<Validation>(
        this.url + "/" + detail.prodPointId,
        JSON.stringify(detail),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  GetPadDates(id: number) {
    return this.http.get<string[]>(this.url + "/paddates/" + id);
  }

  GetPadDailyDates(id: number) {
    return this.http.get<string[]>(this.url + "/paddailydates/" + id);
  }

  GetPadRecords(request: ProductionDetailRequest) {
    return this.http.post<MonthlyDetail[]>(
      this.url + "/pad",
      request,
      httpOptions
    );
  }

  GetPadDailyRecords(request: ProductionDetailRequest) {
    return this.http.post<DailyDetail[]>(
      this.url + "/paddaily",
      request,
      httpOptions
    );
  }

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
