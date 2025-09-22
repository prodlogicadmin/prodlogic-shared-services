import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Validation } from '../Validation/validation.service';
import { Observable } from 'rxjs';

export interface PointType {
  pointTypeId: number;
  pointTypeName: string;
  allocationSystemType: number; 
  systemPointTypeId: number;
  base64ImageString: string;
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
export class PointTypesService {
  
  private url =  environment.baseUrl + 'api/pointtypes';

  constructor(private http: HttpClient) {}

  GetPointTypes() { 
    return this.http.get<PointType[]>(this.url);
  }  

  GetPointTypesToAdd() { 
    return this.http.get<PointType[]>(this.url + '/add');
  }  

  GetPointType(id) { 
    return this.http.get<PointType>(this.url + '/'+ id)
  }

  GetPointTypeCount(id) { 
    return this.http.get<number>(this.url + '/'+ id + '/count')
  }

  
  CreatePointType(data: PointType): Observable<Validation> {     
    return this.http.post<Validation>(this.url, JSON.stringify(data), httpOptions);
  } 
  
  UpdatePointType(data: PointType): Observable<Validation>{
     return this.http.put<Validation>(this.url + '/' + data.pointTypeId, JSON.stringify(data), httpOptions);  
  }

  DeletePointType(id:number) {
    return this.http.delete<Validation>(this.url + '/' + id);
  }
}
