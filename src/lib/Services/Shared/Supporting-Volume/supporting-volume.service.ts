import { userInfo } from "os";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AttributeFilter } from "@src/app/models/Filters/PointFilter";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";
import { Validation } from "../../Common/Validation/validation.service";
import { User } from "../../Common/Users/users.service";

export interface SupportingVolume {
  prodPointId: number;
  startDate: Date;
  endDate: Date;
  volume: number;
  value: number;
  mmbtu: number;
  closeTypeId: number;
  contactId: number;
  systemId: number;
  productId: number;
  dispositionId: number;
  btuFactor: number;
  pressureBase: number;
  isCalculated: boolean;
  isRecurring: boolean;
  comments: string;
  createdBy: string;
  created: Date;
  id: number;
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
export class SupportingVolumeService {
  private url = environment.baseUrl + "api/supportingvolumes";

  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get<SupportingVolume[]>(this.url);
  }

  GetFilteredPoints(
    filter: AttributeFilter
  ): Observable<[SupportingVolume[], number]> {
    console.log(this.url + "/search");
    return this.http.post<[SupportingVolume[], number]>(
      this.url + "/search",
      JSON.stringify(filter),
      httpOptions
    );
  }

  GetSupportingVolumeByPoint(prodPointId: number) {
    return this.http.get<SupportingVolume>(this.url + "/list/" + prodPointId);
  }

  Get(id: number) {
    return this.http.get<SupportingVolume>(this.url + "/" + id);
  }

  Create(data: SupportingVolume): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  Update(data: SupportingVolume): Observable<Validation> {
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
