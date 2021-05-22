import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from "rxjs/operators";
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorHandler implements HttpInterceptor {

  constructor(private injector: Injector, private toastSerCvice: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          let message = null;
          if (error.error instanceof ErrorEvent) {
            message = new Message(error.error.message, null, error.error.lineno, error.error.error);

          } else if (error.status !== 200) {
            message = new Message(error.message, error.statusText, error.status, error.error.error);

          } else {
            message = new Message(error.message, null, error.status);
          }

          return throwError(message);
        })
      );
  }
}
