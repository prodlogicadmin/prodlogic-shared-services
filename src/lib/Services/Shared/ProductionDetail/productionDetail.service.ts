import { userInfo } from "os";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";
import { Validation } from "../../Common/Validation/validation.service";
import { User } from "../../Common/Users/users.service";

export interface MonthlyDetail {
  id?: number;
  prodPointId: number;
  prodPointTypeName?: string;
  prodPointName?: string;
  systemProductId: number;
  systemDispositionId: number;
  productId: number;
  dispositionId: number;
  systemProduct: string;
  product: string;
  systemDisposition: string;
  disposition: string;
  date: Date;
  volume: number;
  volumeMmbtu: number;
  daysUp: number;
  srcProdPointId: number;
  srcProdPointTypeName: string;
  srcProdPointName: string;
  gSystemProdPointId?: number;
  gSystemProdPointTypeName?: string;
  gSystemProdPointName?: string;
  sysDispSrcId: number;
  sysDispSrcName: string;
  createdBy: string;
  created: Date;
}

export interface DailyDetail {
  id?: number;
  prodPointId: number;
  prodPointTypeName?: string;
  prodPointName?: string;
  systemProduct: string;
  product: string;
  systemDisposition: string;
  disposition: string;
  date: Date;
  volume: number;
  volumeMmbtu: number;
  hoursUp: number;
  srcProdPointId: number;
  srcProdPointTypeName: string;
  srcProdPointName: string;
  gSystemProdPointId?: number;
  gSystemProdPointTypeName?: string;
  gSystemProdPointName?: string;
  sysDispSrcId: number;
  sysDispSrcName: string;
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
export class ProductionDetailService {
  private url = environment.baseUrl + "api/productiondetail";

  constructor(private http: HttpClient) {}

  GetDetails() {
    return this.http.get<MonthlyDetail[]>(this.url);
  }

  GetFilteredPoints(
    filter: AttributeFilter
  ): Observable<[MonthlyDetail[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[MonthlyDetail[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetDetailByPoint(prodPointId: number) {
    return this.http.get<MonthlyDetail>(this.url + "/list/" + prodPointId);
  }

  GetDetail(id: number) {
    return this.http.get<MonthlyDetail>(this.url + "/" + id);
  }

  CreateDetail(data: MonthlyDetail): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateDetail(id: number, data: MonthlyDetail): Observable<Validation> {
    console.log(this.url + "/" + data.id);
    return this.http.put<Validation>(
      this.url + "/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteDetail(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }

  GetByConfiguration(configId: number) {
    return this.http.get<MonthlyDetail[]>(
      this.url + "/configuration/" + configId
    );
  }
}
