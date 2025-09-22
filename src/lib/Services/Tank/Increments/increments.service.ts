import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Increment {
  id: number;
  inch: string;
  value: number; 
  description: string;  
  createdBy: string;
  created: Date;
}

@Injectable({
  providedIn: 'root'
})
export class IncrementsService {

  private url =  environment.baseUrl + 'api/increments';

  constructor(private http: HttpClient) { }

  GetIncrements() { 
    return this.http.get<Increment[]>(this.url);
  }

  GetIncrement(id: number) { 
    return this.http.get<Increment>(this.url + '/'+ id)
  }
}
