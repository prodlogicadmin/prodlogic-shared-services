import { userInfo } from "os";
import { BatterySnapshotComponent } from "./../../Components/Type-Components/Battery/battery-snapshot/battery-snapshot.component";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Validation } from "../Common/Validation/validation.service";
import { Observable } from "rxjs";
import { BatterySnapshot } from "src/app/models/Type/Battery/BatterySnapshot";
import { environment } from "src/environments/environment";
import { User } from "../Common/Users/users.service";

export interface BatteryDetail {
  id: number;
  prodPointId: number;
  prodPointCode: string;
  prodPointName: string;
  batteryStartEffectiveDate: Date;
  dateString: string;
  tankProdPointId: number;
  tankProdPointCode: string;
  tankProdPointName: string;
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
export class BatteryDetailService {
  private url = environment.baseUrl + "api/batterydetails";

  constructor(private http: HttpClient) {}

  GetBatteryDetails() {
    return this.http.get(this.url);
  }

  GetBatteryDetailsByPoint(prodPointId: number): Observable<BatteryDetail[]> {
    return this.http.get<BatteryDetail[]>(this.url + "/list/" + prodPointId);
  }

  GetBatteryDetailsTanksByPoint(
    prodPointId: number,
    date: string
  ): Observable<BatteryDetail[]> {
    var line = this.url + "/tanks/" + date + "/" + prodPointId;
    //format datestring from 3/2022 to 03-2022
    var string = date.replace("/", "-");

    return this.http.get<BatteryDetail[]>(
      this.url + "/tanks/" + string + "/" + prodPointId
    );
  }

  GetBatteryDetail(id: number) {
    return this.http.get<BatteryDetail>(this.url + "/" + id);
  }

  CreateBatteryDetail(data: BatteryDetail[]): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateBatteryDetail(data: BatteryDetail): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.prodPointId,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteBatteryDetails(data: BatteryDetail): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.prodPointId,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteBatteryDetail(id: number, data: BatteryDetail) {
    return this.http.put<Validation>(
      this.url + "/delete/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  AddTanks(data: BatteryDetail[]) {
    return this.http.post<Validation>(
      this.url + "/add",
      JSON.stringify(data),
      httpOptions
    );
  }

  RemoveTank(id: number) {
    return this.http.delete<Validation>(this.url + "/remove/" + id);
  }

  GetSnapshot(data: BatteryDetail): Observable<BatterySnapshot> {
    return this.http.put<BatterySnapshot>(
      this.url + "/snapshot",
      JSON.stringify(data),
      httpOptions
    );
  }
}
