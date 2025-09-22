import { userInfo } from "os";
import { Validation } from "./../../Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { User } from "../../Common/Users/users.service";

export interface Welltest {
  id: number;
  prodPointId: number;
  wtStartDate: Date;
  wtEndDate: Date;
  wtHoursUp: number;
  wtPressureBase: number;
  wtWetDryFactor: number;
  wtGasOilRatio: number;
  wtOilWaterRatio: number;
  wtGasVolume: number;
  wtGasRate: number;
  wtSysGasVolume: number;
  wtOilVolume: number;
  wtOilRate: number;
  wtWaterVolume: number;
  wtWaterRate: number;
  wtGliftVolume: number;
  wtGliftRate: number;
  wtSysGliftVolume: number;
  wtTubingPressure: number;
  wtCasingPressure: number;
  wtGasMmbtu: number;
  wtGasLiftMmbtu: number;
  btuFactor: number;
  wtBottomHolePressure: number;
  wtChokeSize: number;
  infoOnly: boolean;
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
@Injectable()
export class WelltestsService {
  private url = environment.baseUrl + "api/welltests";

  constructor(private http: HttpClient) {}

  GetWelltests() {
    return this.http.get<Welltest[]>(this.url);
  }

  GetFilteredPoints(filter: AttributeFilter): Observable<[Welltest[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[Welltest[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetWelltestByPoint(prodPointId: number) {
    return this.http.get<Welltest>(this.url + "/list/" + prodPointId);
  }

  GetWelltest(id: number) {
    return this.http.get<Welltest>(this.url + "/" + id);
  }

  RouteEntry(data: Welltest): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/route",
      JSON.stringify(data),
      httpOptions
    );
  }

  CreateWelltest(data: Welltest): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateWelltest(id: number, data: Welltest): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  Delete(id: number, data: User): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/delete/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }
}
