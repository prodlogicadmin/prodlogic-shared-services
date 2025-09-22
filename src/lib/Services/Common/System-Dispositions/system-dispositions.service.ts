import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SystemDisposition {
  id: number;
  sysDispCode: string;
  sysDispDescription: string; 
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
export class SystemDispositionsService {
  private url =  environment.baseUrl + 'api/systemdispositions';

  constructor(private http: HttpClient) { }
  
  GetSystemDispositions() { 
    return this.http.get<SystemDisposition[]>(this.url);
  }  

  GetSystemDisposition(id: number) { 
    return this.http.get<SystemDisposition>(this.url + '/'+ id)
  }
}
