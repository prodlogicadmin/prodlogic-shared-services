import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { Validation } from '../Validation/validation.service';

export interface UnitOfMeasure {
  id: number;
  uomCode: string; 
  uomDescription: string;
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
export class UnitOfMeasureService {
  private url =  environment.baseUrl + 'api/unitofmeasure';

  constructor(private http: HttpClient) {}

  GetUnitOfMeasures() { 
    return this.http.get<UnitOfMeasure[]>(this.url);
  }  

  GetUnitOfMeasure(id) { 
    return this.http.get<UnitOfMeasure>(this.url + '/'+ id)
  }

  
  CreateUnitOfMeasure(data: UnitOfMeasure): Observable<Validation> {     
    return this.http.post<Validation>(this.url, JSON.stringify(data), httpOptions);
  } 
  
  UpdateUnitOfMeasure(data: UnitOfMeasure): Observable<Validation>{
     return this.http.put<Validation>(this.url + '/' + data.id, JSON.stringify(data), httpOptions);  
  }

  DeleteUnitOfMeasure(id:number) {
    return this.http.delete<Validation>(this.url + '/' + id);
  }
}
