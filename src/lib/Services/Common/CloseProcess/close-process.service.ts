import { userInfo } from "os";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CloseRequest } from "@src/app/models/Request/CloseRequest";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";
import { Validation } from "../Validation/validation.service";
import { User } from "@src/app/models/System/User";

export interface ProcessDTO {
  id: number;
  processName: string;
  closeType: number;
  startDate: Date;
  endDate: Date;
  products: string;
  systems: string;
  createdBy: string;
  systemsCount: number;
  errorCount: number;
  created: Date;
  started: Date;
  startedBy: string;
  includeSingleWellLeases: boolean;
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
export class CloseProcessService {
  private url = environment.baseUrl + "api/closeprocess";

  constructor(private http: HttpClient) {}

  GetProcesses() {
    return this.http.get<ProcessDTO[]>(this.url);
  }

  CreateProcess(data: ProcessDTO): Observable<ProcessDTO> {
    return this.http.post<ProcessDTO>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateProcess(data: ProcessDTO): Observable<Validation> {
    return this.http.put<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteProcess(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }

  RunProcess(request: CloseRequest) {
    return this.http.post<Validation[]>(
      this.url + "/run",
      JSON.stringify(request),
      httpOptions
    );
  }

  CancelProcess(id: number) {
    return this.http.post<Validation>(this.url + "/cancel/" + id, httpOptions);
  }
}
