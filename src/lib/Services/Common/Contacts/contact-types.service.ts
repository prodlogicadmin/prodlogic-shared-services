import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface ContactType {
  contactTypeId: number;
  contactTypeName: string;
  
}


@Injectable({
  providedIn: 'root'
})
export class ContactTypesService {

    
  private url =  environment.baseUrl + 'api/contacttypes';

  constructor(private http: HttpClient) {}

  GetContactTypes() { 
    return this.http.get<ContactType[]>(this.url);
  }  

  GetContactType(id) { 
    return this.http.get<ContactType>(this.url + '/'+ id)
  }
}
