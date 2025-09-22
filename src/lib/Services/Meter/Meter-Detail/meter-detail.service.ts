import { userInfo } from "os";
import { Validation } from "src/app/Services/Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../../Common/Users/users.service";

export interface MeterDetail {
  id: number;
  prodPointId: number;
  meterNumber: string;
  meterStartDate: Date;
  productId: number;
  dispositionId: number;
  dailyDispositionId: number;
  rollover: number;
  lastBtuFactor: number;
  stateId: number;
  closeStatements: boolean;
  isShared: boolean;
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
export class MeterDetailService {
  private url = environment.baseUrl + "api/meterdetails";

  constructor(private http: HttpClient) {}

  GetMeterDetails() {
    return this.http.get(this.url);
  }

  GetMeterDetail(id: number) {
    return this.http.get<MeterDetail>(this.url + "/" + id);
  }

  CreateMeterDetail(data: MeterDetail): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateMeterDetail(data: MeterDetail): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.prodPointId,
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
