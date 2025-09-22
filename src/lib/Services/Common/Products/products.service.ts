import { userInfo } from "os";
import { Validation } from "src/app/Services/Common/Validation/validation.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../Users/users.service";

export interface Product {
  id: number;
  productCode: string;
  label: string;
  productDescription: string;
  systemProductId: number;
  uomId: number;
  roundingType: number;
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
export class ProductsService {
  private url = environment.baseUrl + "api/products";

  constructor(private http: HttpClient) {}

  GetProducts() {
    return this.http.get<Product[]>(this.url);
  }

  GetCommonProducts() {
    return this.http.get<Product[]>(this.url + "/common");
  }

  GetProdProducts() {
    return this.http.get<Product[]>(this.url + "/prod");
  }

  GetProduct(id: number) {
    return this.http.get<Product>(this.url + "/" + id);
  }

  CreateProduct(data: Product): Observable<Validation> {
    return this.http.post<Validation>(
      this.url,
      JSON.stringify(data),
      httpOptions
    );
  }

  UpdateProduct(data: Product): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + data.id,
      JSON.stringify(data),
      httpOptions
    );
  }

  DeleteProduct(id: number) {
    return this.http.delete<Validation>(this.url + "/" + id);
  }
}
