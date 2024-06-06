import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorRequestService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwt = localStorage.getItem('XgTokenAuth')
     
    const defaultHeaders = req.headers
      .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
      .set('Content-Type', 'application/json')
      .set('x-api-key', enviroment.apiKey)
      .set('Authorization', 'Bearer ' + jwt)

    const reqWithHeaders = req.clone({​​​​headers: defaultHeaders, withCredentials: true});

    return next.handle(reqWithHeaders).pipe(
      catchError((err: HttpErrorResponse) => {
      if(err.status === 401) {
        document.write(err.error)
      }
      return throwError(err);
    }));            
}
}
