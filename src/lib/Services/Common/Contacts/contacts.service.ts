import { userInfo } from "os";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Validation } from "../Validation/validation.service";
import { User } from "@src/app/models/System/User";

export interface Contact {
  contactId: number;
  contactCode: string;
  contactName: string;
  contactTypeId: number;
  contactTypeName: string;
  contractor: boolean;
  transporter: boolean;
  purchaser: boolean;
  marketer: boolean;
  operator: boolean;
  archived: boolean;
  createdBy: string;
  created: Date;
  userInfo: User;
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
export class ContactsService {
  private url = environment.baseUrl + "api/contacts";
  constructor(private http: HttpClient) {}

  GetContacts() {
    return this.http.get<Contact[]>(this.url);
  }

  GetContractors() {
    return this.http.get<Contact[]>(this.url + "/contractors");
  }

  GetPumpers() {
    return this.http.get<Contact[]>(this.url + "/pumpers");
  }

  GetTransporters() {
    return this.http.get<Contact[]>(this.url + "/transporters");
  }

  GetPurchasers() {
    return this.http.get<Contact[]>(this.url + "/purchasers");
  }

  GetMarketers() {
    return this.http.get<Contact[]>(this.url + "/marketers");
  }

  GetOperators() {
    return this.http.get<Contact[]>(this.url + "/operators");
  }

  GetContact(id: number) {
    return this.http.get<Contact>(this.url + "/" + id);
  }

  CreateContact(data: Contact): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateContact(data: Contact): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.contactId,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteContact(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }
}
