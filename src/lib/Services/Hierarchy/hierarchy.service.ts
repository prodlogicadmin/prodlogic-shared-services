import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@src/environments/environment";
import { catchError, Observable, throwError } from "rxjs";
import { Validation } from "../Common/Validation/validation.service";
import { WellDetail } from "@src/app/models/Type/Well/WellDetail";

export interface WellSelection {
  id: number;
  leaseNumber: string;
  leaseName: string;
  fieldId: number;
  fieldNumber: string;
  fieldName: string;
  areaName: string;
  stateCode: string;
}

export interface Lease {
  id?: number;
  leaseNumber: string;
  leaseName: string;
  fieldId: number;
  stateId: number;
  wells: WellDetail[];
  // created: Date;
  label?: string; // For PrimeNG dropdown
}

export interface Field {
  id?: number;
  fieldNumber: string;
  fieldName: string;
  areaId: number;
  leases: Lease[];
  // createdBy: string;
  // created: Date;
  label?: string; // For PrimeNG dropdown
}

export interface Area {
  id?: number;
  areaName: string;
  fields: Field[];
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
export class HierarchyService {
  private url = environment.baseUrl + "api/hierarchy";
  constructor(private http: HttpClient) {}

  GetAreasByState(stateId: number): Observable<Area[]> {
    return this.http.get<Area[]>(this.url + "/areas/" + stateId);
  }

  GetFieldsByArea(areaId: number): Observable<Field[]> {
    return this.http.get<Field[]>(this.url + "/fields/" + areaId);
  }

  GetLeasesByField(fieldId: number): Observable<Lease[]> {
    return this.http.get<Lease[]>(this.url + "/leases/" + fieldId);
  }

  GetLeasesByState(stateId: number): Observable<Lease[]> {
    return this.http.get<Lease[]>(this.url + "/stateleases/" + stateId);
  }

  GetWellsByLease(leaseId: number): Observable<WellDetail[]> {
    return this.http.get<WellDetail[]>(this.url + "/wells/" + leaseId);
  }
  GetWellSelection(leaseId: number): Observable<WellSelection> {
    return this.http.get<WellSelection>(this.url + "/wellselection/" + leaseId);
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred:", error); // for demo purposes only
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
