import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SystemReasonCode {
  id: number;
  sysReasonCode: string;
  sysReasonDesc: string; 
  createdBy: string;
  created: Date;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin':   environment.baseUrl
  })
};

@Injectable({
  providedIn: 'root'
})
export class SystemReasonCodesService {
  private url =  environment.baseUrl + 'api/systemreasoncodes';

  constructor(private http: HttpClient) { }

  GetSystemReasonCodes() { 
    return this.http.get<SystemReasonCode[]>(this.url);
  }  

  GetSystemReasonCode(id: number) { 
    return this.http.get<SystemReasonCode>(this.url + '/'+ id);
  }
}
