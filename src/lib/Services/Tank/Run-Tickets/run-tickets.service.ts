import { userInfo } from "os";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Validation } from "../../Common/Validation/validation.service";
import { environment } from "src/environments/environment";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { User } from "../../Common/Users/users.service";

export interface RunTicket {
  id: number;
  prodPointId: number;
  ticketDate: Date;
  entryDate: Date;
  productId: number;
  dispositionId: number;
  volumeSource: string;
  grossVolume: number;
  netVolume: number;
  ticketNumber: string;
  beforeGauge: boolean;
  isHandTicket: boolean;
  topGaugedFeet: number;
  topGaugedInches: number;
  topGaugedFractions: number;
  topGaugeFull: string;
  topGaugedVolume: number;
  bottomGaugedFeet: number;
  bottomGaugedInches: number;
  bottomGaugedFractions: number;
  bottomGaugeFull: string;
  bottomGaugedVolume: number;
  colorCutGaugedFeet: number;
  colorCutGaugedInches: number;
  colorCutGaugedFractions: number;
  colorCutGaugeFull: string;
  colorCutGaugedVolume: number;
  observedGravity: number;
  correctedGravity: number;
  bsw: number;
  transporterId: number;
  sealOn: string;
  sealOff: string;
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
export class RunTicketsService {
  private url = environment.baseUrl + "api/runtickets";

  constructor(private http: HttpClient) {}

  GetRunTickets() {
    return this.http.get<RunTicket[]>(this.url);
  }

  GetFilteredPoints(
    filter: AttributeFilter
  ): Observable<[RunTicket[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[RunTicket[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetRunTicket(id: number) {
    return this.http.get<RunTicket>(this.url + "/" + id);
  }

  GetRunTicketsByPoint(prodPointId: number) {
    return this.http.get<RunTicket[]>(this.url + "/list/" + prodPointId);
  }

  CreateRunTicket(data: RunTicket): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateRunTicket(data: RunTicket): Observable<Validation> {
    console.log(this.url + "/" + data.id);
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
