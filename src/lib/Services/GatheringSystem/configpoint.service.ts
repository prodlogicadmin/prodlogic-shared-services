import { ConfigurationDetail } from "src/app/models/Type/GatheringSystem/ConfigurationDetail";
import { Validation } from "src/app/Services/Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EdgeData } from "@src/app/models/Engine/EdgeData";

export interface ConfigPoint {
  id: number;
  configurationId: number;
  gatheringSystemId: number;
  prodPointId: number;
  prodPointCode: string;
  prodPointName: string;
  prodPointTypeName: string;
  positionX;
  positionY;
  edgeId;
  edgeSource;
  edgeTarget;
  addedBy: string;
  added: Date;
}

// export interface ConfigPointDetail {
//   id: number;
//   configPointId: number;
//   configurationId: number;
//   gatheringSystemId: number;
//   prodPointId: number;
//   productId: number;
//   product: string;
//   productBasisId: number;
//   productBasis: string;
//   flowId: number;
//   flow: string;
//   isNet: boolean;
//   // edgeSource;
//   // edgeTarget;
//   createdBy: string;
//   created: Date;
// }

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": environment.baseUrl,
  }),
};

@Injectable({
  providedIn: "root",
})
export class ConfigpointService {
  private url = environment.baseUrl + "api/configpoints";

  constructor(private http: HttpClient) {}

  // GetConfigPointDetails() {
  //   return this.http.get(this.url);
  // }

  GetConfigPointDetailsByPoint(
    data: ConfigurationDetail
  ): Observable<ConfigPoint[]> {
    return this.http.get<ConfigPoint[]>(
      this.url + "/list/" + data.gatheringSystemId + "/" + data.configurationId
    );
  }

  // GetConfigPointDetail(id: number) {
  //   return this.http.get<ConfigPoint>(this.url + "/" + id);
  // }

  CreateConfigPointDetail(data: ConfigPoint): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  CreateAllConfigPointDetails(data: ConfigPoint[]): Observable<Validation> {
    return this.http.post<Validation>(this.url + "/list", data, httpOptions);
  }

  UpdateConfigPointDetail(data: ConfigPoint): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.id,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateConfigPointDiagram(data): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.configPointId,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteConfigPointDetail(id: number) {
    return this.http.delete<ConfigPoint>(this.url + "/" + id);
  }

  DeleteConfigPointList(data: number[]) {
    return this.http.post<Validation>(
      this.url + "/nav/pointlist",
      JSON.stringify(data),
      httpOptions
    );
  }

  //edges
  GetEdgesByConfigId(configId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + "/edges/" + configId);
  }

  // CreateEdgeQuickConnect(data): Observable<any[]> {
  //   return this.http.post<any[]>(
  //     this.url + "/quickconnect/",
  //     JSON.stringify(data),
  //     httpOptions
  //   );
  // }

  CreateEdgeQuickConnect(data): Observable<any> {
    return this.http.post<any>(
      this.url + "/quickconnect/",
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateEdge(data): Observable<any> {
    return this.http.put(this.url + "/edge", JSON.stringify(data), httpOptions);
  }

  DeleteEdge(data, activeProducts): Observable<any> {
    return this.http.put(
      this.url + "/edge/" + data.configurationId + "/" + data.edgeId,
      JSON.stringify(activeProducts),
      httpOptions
    );
  }

  // DeleteAllEdges(data): Observable<any> {
  //   return this.http.put(
  //     this.url + "/alledges/" + data.configurationId,
  //     JSON.stringify(data),
  //     httpOptions
  //   );
  // }

  UpdateProductFlow(data): Observable<any> {
    return this.http.put(this.url + "/flow", JSON.stringify(data), httpOptions);
  }

  UpdateProductBasis(data): Observable<any> {
    return this.http.put(
      this.url + "/basis",
      JSON.stringify(data),
      httpOptions
    );
  }

  // GetConfigPointFlowDetails(configurationId): Observable<ConfigPointDetail[]> {
  //   return this.http.get<ConfigPointDetail[]>(
  //     this.url + "/details/" + configurationId
  //   );
  // }

  AutoFormat(configurationId): Observable<any> {
    return this.http.post<any>(
      this.url + "/autoformat/" + configurationId,
      httpOptions
    );
  }
}
