import { userInfo } from "os";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Validation } from "../../Common/Validation/validation.service";
import { environment } from "src/environments/environment";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { User } from "@src/app/models/System/User";

export interface MeterReading {
  id: number;
  prodPointId: number;
  startDate: Date;
  entryDate: Date;
  productId: number;
  dispositionId: number;
  volumeSource: string;
  grossVolume: number;
  systemVolume: number;
  mmbtuVolume: number;
  netVolume: number;
  btuFactor: number;
  ticketNumber: string;
  isIntegrated: boolean;
  isWet: boolean;
  isHandTicket: boolean;
  meterReadingBegin: number;
  meterReadingEnd: number;
  observedGravity: number;
  correctedGravity: number;
  bsw: number;
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
export class MeterReadingsService {
  private url = environment.baseUrl + "api/meterreadings";

  constructor(private http: HttpClient) {}

  GetMeterReadings() {
    return this.http.get(this.url);
  }

  GetFilteredPoints(
    filter: AttributeFilter
  ): Observable<[MeterReading[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[MeterReading[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetMeterReading(id: number) {
    return this.http.get<MeterReading>(this.url + "/" + id);
  }

  GetMeterReadingByPoint(prodPointId: number) {
    return this.http.get<MeterReading[]>(this.url + "/list/" + prodPointId);
  }

  CreateMeterReading(data: MeterReading): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  RouteEntry(data: MeterReading): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/route",
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateMeterReading(id: number, data: MeterReading): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + id,
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
