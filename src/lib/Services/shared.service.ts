import { Injectable } from "@angular/core";
import { User } from "../models/System/User";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor() {}

  GetCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  GetCreatedByUser() {
    let user: User = this.GetCurrentUser();
    if (user) {
      return user.username;
    } else {
      return "Initial Register";
    }
  }

  GetUserInfo() {
    let user: User = this.GetCurrentUser();
    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
