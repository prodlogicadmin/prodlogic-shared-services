import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


export interface County {
  id: number;
  stateCode: string;
  countyCode: string; 
  countyName: string;  
  createdBy: string;
  created: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CountyService {

  private url =  environment.baseUrl + 'api/counties';

  constructor(private http: HttpClient) {}

  GetCounties() { 
    return this.http.get<County[]>(this.url);
  }  

  GetCounty(id: number) { 
    return this.http.get<County>(this.url + '/'+ id)
  }
}
