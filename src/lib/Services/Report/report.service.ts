import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Report } from "@src/app/models/Report/Report";
import { environment } from "@src/environments/environment";
import { Validation } from "../Common/Validation/validation.service";
import { ReportType } from "@src/app/models/Report/ReportType";
import { CommodityPrices } from "@src/app/Interfaces/commodity";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": environment.baseUrl,
  }),
};

@Injectable({
  providedIn: "root",
})
export class ReportService {
  private url = environment.baseUrl + "api/reports";

  constructor(private http: HttpClient) {}

  GetReportTypes() {
    return this.http.get<ReportType[]>(`${this.url}/reporttypes`);
  }

  GetAllReports(
    filter,
    rows,
    take,
    userId,
    favoritesFiltered
  ): Observable<any> {
    const params = new HttpParams()
      .set("filter", filter)
      .set("rows", rows)
      .set("take", take)
      .set("userId", userId)
      .set("favoritesFiltered", favoritesFiltered);
    return this.http.get<any>(`${this.url}`, { params });
  }

  GetAllDashboards(): Observable<Report[]> {
    console.log(`${this.url}/dashboards`);
    return this.http.get<Report[]>(`${this.url}/dashboards`);
  }

  GetFavoriteDashboards(userId: number): Observable<Report[]> {
    console.log(`${this.url}/dashboards/${userId}`);
    return this.http.get<Report[]>(`${this.url}/dashboards/${userId}`);
  }

  UpdateFavoriteDashboards(
    userId: number,
    reportIds: number[]
  ): Observable<Validation> {
    return this.http.put<Validation>(
      `${this.url}/dashboards/${userId}`,
      JSON.stringify(reportIds),
      httpOptions
    );
  }

  getReportById(reportId: number): Observable<Report> {
    return this.http.get<Report>(`${this.url}/${reportId}`);
  }

  runReport(reportId: number, parameters: any): Observable<Report> {
    return this.http.post<Report>(
      `${this.url}/${reportId}/run`,
      JSON.stringify(parameters),
      httpOptions
    );
  }

  GetAvailableFields() {
    return this.http.get<any>(`${this.url}/metadata/fields`);
  }

  GetDistinctValues(table: string, column: string) {
    return this.http.get<any>(`${this.url}/distinct/${table}/${column}`);
  }

  runDashboard(reportId: number, parameters: any): Observable<Report> {
    return this.http.post<Report>(
      `${this.url}/${reportId}/dashboard`,
      JSON.stringify(parameters),
      httpOptions
    );
  }

  runSingleWellLeaseProduction(
    prodPointId: number,
    date: string,
    parameters: any
  ): Observable<Report> {
    return this.http.post<Report>(
      `${this.url}/${prodPointId}/${date}/swlprod`,
      JSON.stringify(parameters),
      httpOptions
    );
  }

  runRouteProduction(
    routeId: number,
    stopId: number,
    parameters: any
  ): Observable<Report> {
    return this.http.post<Report>(
      `${this.url}/${routeId}/${stopId}/routeprod`,
      JSON.stringify(parameters),
      httpOptions
    );
  }

  runRoutePressures(
    routeId: number,
    stopId: number,
    parameters: any
  ): Observable<Report> {
    return this.http.post<Report>(
      `${this.url}/${routeId}/${stopId}/routepress`,
      JSON.stringify(parameters),
      httpOptions
    );
  }

  CreateCustomReport(report: Report): Observable<Validation> {
    return this.http.put<Validation>(
      `${this.url}/customreport`,
      JSON.stringify(report),
      httpOptions
    );
  }

  UpdateCustomReport(report: Report): Observable<Validation> {
    return this.http.put<Validation>(
      `${this.url}/customreport/${report.reportId}`,
      JSON.stringify(report),
      httpOptions
    );
  }

  DeleteCustomReport(reportId: number): Observable<Validation> {
    return this.http.delete<Validation>(
      `${this.url}/customreport/${reportId}`,
      httpOptions
    );
  }

  AddReportFavorite(userId: number, reportId: number): Observable<Validation> {
    return this.http.put<Validation>(
      `${this.url}/favorite/${userId}/${reportId}`,
      null,
      httpOptions
    );
  }

  RemoveReportFavorite(
    userId: number,
    reportId: number
  ): Observable<Validation> {
    return this.http.delete<Validation>(
      `${this.url}/favorite/${userId}/${reportId}`,
      httpOptions
    );
  }

  validateDecimalQuery(sqlQuery: string): Observable<{ value: number }> {
    return this.http.post<{ value: number }>(
      `${this.url}/validate-decimal`,
      sqlQuery,
      { headers: { "Content-Type": "application/json" } }
    );
  }

  getAllPrices(): Observable<CommodityPrices> {
    return this.http.get<CommodityPrices>(`${this.url}/commodities`);
  }

  GetHighMarginWells(productId: number): Observable<Report> {
    return this.http.get<Report>(`${this.url}/highmargin/${productId}`);
  }

  GetLowMarginWells(productId: number): Observable<Report> {
    return this.http.get<Report>(`${this.url}/lowmargin/${productId}`);
  }

  GetWellMargins(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.url}/margins`);
  }
}
