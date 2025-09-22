import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SystemProduct {
  id: number;
  systemProductCode: string;
  systemProductDesc: string; 
  unitOfMeasure: string;  
  createdBy: string;
  created: Date;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin':  environment.baseUrl 
  })
};

@Injectable({
  providedIn: 'root'
})
export class SystemProductsService {
  private url =  environment.baseUrl + 'api/systemproducts';

  constructor(private http: HttpClient) { }

  GetSystemProducts() { 
    return this.http.get<SystemProduct[]>(this.url);
  }  

  GetSystemProduct(id: number) { 
    return this.http.get<SystemProduct>(this.url + '/'+ id)
  }
}
