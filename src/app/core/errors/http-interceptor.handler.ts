import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorHandler implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /*let router = this.injector.get(Router);
    console.log('URL: ' + router.url);
    console.log(request);
    console.log(next);

    switch(request.responseType) {
      case 'text':
        console.log('Error para peticiones tipo text');
        break;

      case 'json':
        console.log('Error para peticiones tipo JSON');
        break;

      default:
        break;
    }*/

    return next.handle(request).pipe(
      
        retry(1),
 
        catchError((error: HttpErrorResponse) => {
 
          let errorMessage = '';
 
          if (error.error instanceof ErrorEvent) {
 
            console.log('client-side error');
 
            errorMessage = `Error: ${error.error.message}\nErrorEvent`;
 
          } else {
 
            console.log('server-side error');
 
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nErrorHttp`;
 
          }
 
          window.alert(errorMessage);
          return throwError(errorMessage);
 
        })
 
      )
 
  }


}
