import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Validation } from '../Validation/validation.service';
import { Observable } from 'rxjs';

export interface ProdCodeMask {
  id: number;
  codeMask: string; 
  pointTypeId: number; 
  systemPointTypeId: number;
  pointType: any;
  prodPointTypeName: string; 
  codeLength: number;
  autoGenerate: boolean;  
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
export class ProdCodeMasksService {
  private url =  environment.baseUrl + 'api/prodcodemasks';

  constructor(private http: HttpClient) { }

  GetCodeMasks() { 
    return this.http.get<ProdCodeMask[]>(this.url);
  }

  GetCodeMask(id: number) {     
    return this.http.get<ProdCodeMask>(this.url + '/'+ id)
  }  

  UpdateCodeMask(data: ProdCodeMask): Observable<Validation>{
    return this.http.put<Validation>(this.url + '/' + data.id, JSON.stringify(data), httpOptions);  
 }

}
