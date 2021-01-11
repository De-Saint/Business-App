import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private router: Router,) { }

  app_url = environment.app_url;
  user;

  executeAPIAuth(username_email, password) {

    const httpOptions = { params: { "username_email": username_email, "password": password } };

    return this.http.post<any>(`${this.app_url}/auth/login`, "", httpOptions).pipe(map(
      response => {
        if (response.statusCode == 200) {
          localStorage.setItem("AUTHENTICATION_TOKEN", `Bearer ${response.data.token}`);
        }
        return response;
      }
    )
    )
  }


  isUserLoggedIn() {
    this.user = localStorage.getItem("AUTHENTICATION_TOKEN");
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  getAuthenticatedToken() {
    if (this.isUserLoggedIn())
      return localStorage.getItem("AUTHENTICATION_TOKEN");
  }

  logout() {
    localStorage.removeItem("AUTHENTICATION_TOKEN");
  }
}
