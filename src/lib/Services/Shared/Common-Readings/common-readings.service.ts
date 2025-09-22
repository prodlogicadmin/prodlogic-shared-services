import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";
import { Validation } from "../../Common/Validation/validation.service";

export interface CommonReading {
  id: number;
  prodPointId: number;
  startDate: Date;
  systemProductId: number;
  systemDispId: number;
  productId: number;
  dispositionId: number;
  allocatedAmount: number;
  measuredAmount: number;
  fulfillmentAmount: number;
  referenceNumber: string;
  contactId: number;
  comments: string;
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
export class CommonReadingsService {
  private url = environment.baseUrl + "api/commonreadings";

  constructor(private http: HttpClient) {}

  GetCommonReadings() {
    return this.http.get(this.url);
  }

  GetFilteredPoints(
    filter: AttributeFilter
  ): Observable<[CommonReading[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[CommonReading[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetCommonReading(id: number) {
    return this.http.get<CommonReading>(this.url + "/" + id);
  }

  GetCommonReadingByPoint(prodPointId: number) {
    return this.http.get<CommonReading>(this.url + "/list/" + prodPointId);
  }

  GetGroupedCommonReadingByPoint(prodPointId: number) {
    return this.http.get<CommonReading>(this.url + "/grouped/" + prodPointId);
  }

  CreateCommonReading(data: CommonReading): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateCommonReading(data: CommonReading): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.id,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteCommonReading(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }
}
