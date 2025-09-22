import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface State {
  id: number;
  stateCode: string;
  stateName: string; 
  statePressureBase: number;  
  country: string;
  apiStateCode: string;

}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class StatesService {

  private url =  environment.baseUrl + 'api/states';

  constructor(private http: HttpClient) { }

  GetStates() { 
    return this.http.get<State[]>(this.url);
  }

  GetState(id: number) { 
    return this.http.get<State>(this.url + '/'+ id)
  }
}
