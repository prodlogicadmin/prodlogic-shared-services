import { userInfo } from "os";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@src/environments/environment";
import { Validation } from "../Common/Validation/validation.service";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "@src/app/models/System/User";

export interface FieldNote {
  id: number;
  prodPointId: number;
  eventTypeId: number;
  eventDate: Date;
  eventUserId: number;
  note: string;
  createdBy: string;
  created: Date;
  userInfo: User;
}

export interface EventType {
  id?: number;
  eventTypeCode: string;
  eventTypeName: string;
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
export class FieldnotesService {
  private url = environment.baseUrl + "api/events";
  constructor(private http: HttpClient) {}

  GetEventTypes() {
    return this.http.get<EventType[]>(this.url);
  }

  CreateFieldNote(detail: FieldNote): Observable<Validation> {
    return this.http.post<Validation>(this.url + "/notes", detail, httpOptions);
  }

  UpdateFieldNote(detail: FieldNote): Observable<Validation> {
    return this.http
      .put<Validation>(
        this.url + "/notes/" + detail.id,
        JSON.stringify(detail),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  GetFieldNotesByPoint(prodPointId: number) {
    return this.http.get<FieldNote[]>(this.url + "/notes/point/" + prodPointId);
  }

  GetFieldNotesById(id: number) {
    return this.http.get<FieldNote>(this.url + "/notes/" + id);
  }

  DeleteFieldNote(id: number): Observable<Validation> {
    return this.http
      .delete<Validation>(this.url + "/notes/" + id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred:", error); // for demo purposes only
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
