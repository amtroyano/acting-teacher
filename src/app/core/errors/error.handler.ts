import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalErrorHandler implements ErrorHandler {

    handleError(error: any): void {
        //throw new Error('Method not implemented.');
        console.log(error);
    }

}
