import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Validation } from '../Validation/validation.service';

export interface UserRole {
  id: number;
  role: string;
  systemRoleId: number;  
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
export class UserRolesService {
  private url =  environment.baseUrl + 'api/userroles';
  constructor(private http: HttpClient) { }
  GetUserRoles() { 
    return this.http.get<UserRole[]>(this.url);
  }  

  GetUserRole(id: number) { 
    return this.http.get<UserRole>(this.url + '/'+ id)
  }

  CreateUserRole(data: UserRole): Observable<Validation> {     
    return this.http.post<Validation>(this.url, JSON.stringify(data), httpOptions);
  } 
  
  UpdateUserRole(data: UserRole): Observable<Validation>{
     return this.http.put<Validation>(this.url + '/' + data.id, JSON.stringify(data), httpOptions);  
  }

  DeleteUserRole(id:number) {
    return this.http.delete<Validation>(this.url + '/' + id);
  }
}
