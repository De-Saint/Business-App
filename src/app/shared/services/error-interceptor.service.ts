import { AuthenticationService } from './../../authentication/service/authentication.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();

                //get the link of the current page
                let returnUrl = location.href.split("#")[1];
                this.router.navigate([''], { queryParams: {returnUrl} });
            }
            return throwError(err.error);
        }))
    }
}
