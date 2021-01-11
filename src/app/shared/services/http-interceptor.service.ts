import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/service/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let jwtAuthHeaderString = this.authService.getAuthenticatedToken();

    if (jwtAuthHeaderString) {
      request = request.clone({
        setHeaders: {
          "Authorization": jwtAuthHeaderString,
          'Content-Type': 'application/json'
        }
      })
    }
    return next.handle(request);
  }

}
