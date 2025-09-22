import { Validation } from "./../../Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { User } from "../../Common/Users/users.service";

export interface TransferTicket {
  id: number;
  prodPointId: number;
  targetId: number;
  ticketDate: Date;
  entryDate: Date;
  productId: number;
  dispositionId: number;
  volumeSource: string;
  grossVolume: number;
  ticketNumber: string;
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
export class TransferTicketsService {
  private url = environment.baseUrl + "api/transfertickets";

  constructor(private http: HttpClient) {}

  GetTransferTickets() {
    return this.http.get(this.url);
  }

  GetFilteredPoints(
    filter: AttributeFilter
  ): Observable<[TransferTicket[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[TransferTicket[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetTransferTicket(id: number) {
    return this.http.get<TransferTicket>(this.url + "/" + id);
  }

  GetTransferTicketsByPoint(prodPointId: number) {
    return this.http.get<TransferTicket>(this.url + "/list/" + prodPointId);
  }

  CreateTransferTicket(data: TransferTicket): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateTransferTicket(data: TransferTicket): Observable<Validation> {
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
