import { Validation } from "src/app/Services/Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ConfigPoint } from "@src/app/models/Type/GatheringSystem/ConfigPoint";

export interface ConfigurationDetail {
  configurationId: number;
  gatheringSystemId: number;
  gatheringSystemCode: string;
  gatheringSystemName: string;
  startDate: Date;
  endDate: Date;
  startDateString: string;
  endDateString: string;
  monthly: boolean;
  daily: boolean;
  createdBy: string;
  modifiedBy: string;
  created: Date;
  modified: Date;
  // oil: boolean;
  // gas: boolean;
  // water: boolean;
  // ngl: boolean;
  products: string;
}

export interface CytoscapeMapping {
  graphElements: any[];
  configPoints: ConfigPoint[];
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
export class ConfigurationService {
  private url = environment.baseUrl + "api/configurations";

  constructor(private http: HttpClient) {}

  GetConfigurationDetails() {
    return this.http.get(this.url);
  }

  GetConfigurationDetail(id: number) {
    return this.http.get<ConfigurationDetail>(this.url + "/" + id);
  }

  GetConfigurationDetailByPoint(prodPointId: number) {
    return this.http.get<ConfigurationDetail[]>(
      this.url + "/list/" + prodPointId
    );
  }

  CreateConfigurationDetail(data: ConfigurationDetail): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateConfigurationDetail(data: ConfigurationDetail): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.configurationId,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteConfigurationDetail(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }

  BuildDiagramDetails(data: ConfigurationDetail) {
    return this.http.get<CytoscapeMapping>(
      this.url +
        "/diagram/" +
        data.gatheringSystemId +
        "/" +
        data.configurationId
    );
  }
}
