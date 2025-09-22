import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class AppConfigService {
  constructor(private http: HttpClient) {}

  private config: any;
  dev = "assets/config.dev.json";
  live = "assets/config.json";

  loadAppConfig(): Promise<void> {
    return this.http
      .get(this.dev)
      .toPromise()
      .then((config: any) => {
        environment.baseUrl = config.apiBaseUrl;
        environment.databases = config.databases || [];
        environment.default = config.default || "";
        this.config = config;
        console.log("✅ Config loaded:", this.config);
        console.log(
          "✅ Environment updated:",
          environment.baseUrl,
          environment.default
        );
      })
      .catch((err) => {
        console.warn(
          "⚠️ config.json not found — falling back to localhost:6425"
        );
        if (!environment.production) {
          environment.baseUrl = "http://localhost:6425/";
          // environment.baseUrl = "http://localhost:5000/";
          environment.databases = [
            "AWSDev",
            "Local",
            "UnitTest",
            "AWSDevLocal",
          ];
          environment.default = "Local";
        }
      });
  }
}
