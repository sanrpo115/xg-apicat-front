import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';
import { Router } from '@angular/router';

export const interceptorRequest: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const router: Router = inject(Router);
  const token = sessionStorage.getItem('access_token')

  const defaultHeaders = req.headers
    .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
    .set('Content-Type', 'application/json')
    .set('x-api-key', enviroment.apiKey)
    .set('Authorization', `Bearer ${token}`)

    const reqWithHeaders = req.clone({​​​​headers: defaultHeaders});

    return next(reqWithHeaders).pipe(
      catchError((err: HttpErrorResponse) => {
          const codes = [401, 403];
        if(codes.includes(err.status)) {
          document.write(err.error)
          sessionStorage.removeItem('access_token');
          router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );            
    
}
