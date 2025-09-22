import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SystemUserRole {
  systemRoleId: number;
  Role: string;
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
export class SystemUserRolesService {

  private url =  environment.baseUrl + 'api/systemuserroles';

  constructor(private http: HttpClient) { }

  GetSystemUserRoles() { 
    return this.http.get<SystemUserRole[]>(this.url);
  }  

  GetSystemUserRole(id: number) { 
    return this.http.get<SystemUserRole>(this.url + '/'+ id);
  }
}
