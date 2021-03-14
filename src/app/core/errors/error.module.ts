import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandler } from './error.handler';
import { HttpInterceptorHandler } from './http-interceptor.handler';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        /*{
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        },*/
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorHandler,
            multi: true
        }
    ]
})

export class ErrorModule { }