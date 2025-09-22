import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface ContactCodeMask {
  id: number;
  codeMask: string; 
  contactTypeId: number; 
  contactType: any;
  contactTypeName: string; 
  codeLength: number;
  autoGenerate: boolean;  
  createdBy: string;
  created: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ContactCodeMasksService {

  private url =  environment.baseUrl + 'api/contactcodemasks';

  constructor(private http: HttpClient) { }

  GetCodeMasks() { 
    return this.http.get<ContactCodeMask[]>(this.url);
  }

  GetCodeMask(id: number) {     
    return this.http.get<ContactCodeMask>(this.url + '/'+ id)
  }
}
