import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Validation } from "../Validation/validation.service";
import { UserRole } from "../UserRoles/user-roles.service";
import { UserRoleAssignment } from "@src/app/models/System/UserRole";

export interface User {
  id: number;
  username: string;
  userRoles: UserRoleAssignment[];
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  primaryPhone: string;
  secondaryPhone: string;
  token: string;
  archived: boolean;
  createdBy: string;
  created: Date;
  routeStops?: any[];
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
export class UsersService {
  private url = environment.baseUrl + "api/users";
  constructor(private http: HttpClient) {}

  GetUsers() {
    console.log("Fetching users from:", this.url);
    return this.http.get<User[]>(this.url);
  }

  GetUser(id: number) {
    return this.http.get<User>(this.url + "/" + id);
  }

  CreateUser(data: User): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateUser(data: User): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.id,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteUser(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }

  ResetPassword(data: User): Observable<Validation> {
    return this.http.post<Validation>(
      this.url + "/resetpassword",
      JSON.stringify(data),
      httpOptions
    );
  }
}
