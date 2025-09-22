import { userInfo } from "os";
import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { Validation } from "../Validation/validation.service";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { error } from "console";
import { MessageService } from "primeng/api";
import { User } from "../Users/users.service";

export interface ExcelImport {
  importId: number;
  importName: string;
  importFiles: any;
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
export class ImportService {
  private url = environment.baseUrl + "api/excelimport";

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ImportProdPoints(data: any): Observable<Validation> {
    return this.http.post<Validation>(
      this.url + "/prodpoints",
      JSON.stringify(data),
      httpOptions
    );
  }

  ImportFullService(data: any): Observable<any[]> {
    return this.http
      .post<any[]>(this.url + "/fullservice", JSON.stringify(data), httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleHttpError(error); // Call your error handler here
          return throwError(() => error); // Re-throw the error if needed
        })
      );
  }

  ImportMeterReadings(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/meterreadings",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportTankInventory(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/tankinventory",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportDowntime(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/downtime",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportPressures(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/pressures",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportWelltests(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/welltests",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportRunTickets(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/runtickets",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportTransfers(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/transfers",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportStatements(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/statements",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportZoneDetails(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/zonedetails",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportTankDetails(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/tankdetails",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportMeterDetails(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/meterdetails",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportFuelUsage(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/fuelusage",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportSupportingVolume(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/supportingvolumes",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportContacts(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/contacts",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportReasonCodes(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/reasoncodes",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportUsers(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/users",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportProducts(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/products",
      JSON.stringify(data),
      httpOptions
    );
  }
  ImportDispositions(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/dispositions",
      JSON.stringify(data),
      httpOptions
    );
  }

  ImportRoutes(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/routes",
      JSON.stringify(data),
      httpOptions
    );
  }

  ImportSystemBuilder(data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.url + "/systembuilder",
      JSON.stringify(data),
      httpOptions
    );
  }

  private handleHttpError(error: HttpErrorResponse): void {
    // Your connectionFailed logic or custom error handling
    console.error("HTTP Error:", error);
    // You can also call a separate method here for connection failure handling
    this.connectionFailed();
  }

  private connectionFailed() {
    this.messageService.add({
      severity: "error",
      summary: "Error!",
      detail:
        "An error occurred. Connection to API failed. Server may be offline.",
    });
  }
}
