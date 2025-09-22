import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Validation } from "../Validation/validation.service";
import { Observable } from "rxjs";

export interface SystemSettings {
  id: number;
  systemPressureBase: number;
  gasUomId: number;
  oilUomId: number;
  waterUomId: number;
  nglUomId: number;
  allocationSystemType: number;
  dateLockValue: number;
  createdBy: string;
  created: Date;
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
export class SystemSettingsService {
  private url = environment.baseUrl + "api/systemsettings";

  constructor(private http: HttpClient) {}

  GetSystemSettings(id: number) {
    return this.http.get<SystemSettings>(this.url + "/" + id);
  }

  UpdateSystemSettings(data: SystemSettings): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.id,
      JSON.stringify(data),
      httpOptions
    );
  }
}
