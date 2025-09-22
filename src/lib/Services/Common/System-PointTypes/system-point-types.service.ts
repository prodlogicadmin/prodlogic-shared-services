import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';

export interface SystemPointType {
  systemPointTypeId: number;
  systemPointTypeName: string;
  allocationSystemType: number; 
  
}

@Injectable({
  providedIn: 'root'
})
export class SystemPointTypesService {

  private url =  environment.baseUrl + 'api/systempointtypes';

  constructor(private http: HttpClient) {}

  GetSystemPointTypes() { 
    return this.http.get<SystemPointType[]>(this.url);
  }  

  GetSystemPointType(id) { 
    return this.http.get<SystemPointType>(this.url + '/'+ id)
  }
}
