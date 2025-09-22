import { environment } from "./../../environments/environment";
import { ConfirmationService, MessageService } from "primeng/api";
import { AuthLogin } from "./../models/System/AuthLogin";
import { Router } from "@angular/router";
import { Injectable, EventEmitter, Output, NgZone } from "@angular/core";
import { User } from "../models/System/User";
import { Validation } from "./Common/Validation/validation.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
// import { AuthService } from "@auth0/auth0-angular";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": environment.baseUrl,
  }),
};

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private url = environment.baseUrl + "api/users";
  user = new User();

  private timeoutId: any;
  private warningTimeoutId: any;
  private timeoutDuration = 50 * 60 * 1000;
  private warningDuration = 45 * 60 * 1000;
  public showWarningDialog = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private ngZone: NgZone // public auth: AuthService
  ) {}

  startTimeout() {
    if (this.isLoginPage()) {
      return;
    }

    this.clearTimeouts();

    // Run timeouts outside Angular's zone to prevent unnecessary change detection
    this.ngZone.runOutsideAngular(() => {
      this.warningTimeoutId = setTimeout(() => {
        this.ngZone.run(() => {
          if (!this.isLoginPage()) {
            this.showWarningDialog.next(true);
          }
        });
      }, this.warningDuration);

      this.timeoutId = setTimeout(() => {
        this.ngZone.run(() => {
          if (!this.isLoginPage()) {
            this.Logout();
          }
        });
      }, this.timeoutDuration);
    });
  }

  resetTimeout() {
    if (this.isLoginPage()) {
      return;
    }

    this.startTimeout();
    this.closeWarningDialog();
  }

  clearTimeouts() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.warningTimeoutId) {
      clearTimeout(this.warningTimeoutId);
    }
  }

  closeWarningDialog() {
    this.showWarningDialog.next(false);
  }

  private isLoginPage(): boolean {
    return this.router.url === "/login";
  }

  Authenticate(authLogin: AuthLogin): Observable<any> {
    return this.http.post<any>(
      this.url + "/auth",
      JSON.stringify(authLogin),
      httpOptions
    );
  }

  Update(id: number, data: User): Observable<Validation> {
    return this.http.put<Validation>(
      this.url + "/" + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  Login(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("loginSuccess", "true");
    this.router.navigate(["dashboard"]);
    // this.auth.loginWithRedirect({
    //   appState: { target: "/dashboard" },
    // });

    this.startTimeout();
  }

  Logout() {
    this.clearTimeouts();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loginSuccess");
    this.router.navigate(["/login"]);
    window.location.reload();
    this.closeWarningDialog();
  }

  GetCurrentUser() {
    return localStorage.getItem("currentUser");
  }

  InactivityWarning(id: number) {
    this.confirmationService.confirm({
      message: "Do you want to continue your session?",
      accept: () => {
        this.clearTimeouts();
        this.startTimeout();
      },
      reject: () => {
        this.Logout();
        this.closeWarningDialog();
      },
    });
  }
}
