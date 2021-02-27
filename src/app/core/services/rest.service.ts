import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UUID } from 'angular2-uuid';

import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestService {

    urlBase: string;
    loading: EventEmitter<any>;

    private requests: Array<any>;
    private loadingSubscription: Subscription;

    constructor(
        private http: HttpClient,
        private toastSerCvice: ToastrService
    ) {
        this.loading = new EventEmitter();
        this.requests = new Array<Request>();
    }

    private _showError(error: HttpErrorResponse) {
        this.toastSerCvice.error('<br>' + error.message, error.status + ' - ' + error.statusText, {
            enableHtml: true
        });
                
    }

    loadingSubscribe(callback: (result) => void) {
        this.loadingSubscription = this.loading.subscribe(result => {
            callback(result);
        });
    }

    private loadingUnsubscribe() {
        if (this.loadingSubscription !== undefined) {
            this.loadingSubscription.unsubscribe();
        }
    }
    
    get<T>(path: string, options?: {},locked?: boolean): Promise<{}> {
        const uuidRequest = this.pushRequest(path, locked);

        return new Promise(resolver => {
            this.loading.emit(true);
            this.http.get<HttpResponse<T>>(path, options)
                .subscribe((response: HttpResponse<T>) => {
                    console.log('Llega');
                    console.log(response);
                    this.removeRequest(uuidRequest);
                    resolver(response.body);
                    },

                    (error: HttpErrorResponse) => {
                        this.removeRequest(uuidRequest);
                        this._showError(error);
                    }
                );
        });
    }

    post<T>(path: string, data: any, options?: {}, locked?: boolean): Promise<{}> {
        const uuidRequest = this.pushRequest(path, locked);
        
        return new Promise(resolver => {
            this.loading.emit(true);
            this.http.post<HttpResponse<T>>(path, data, options)
                .subscribe((response: HttpResponse<T>) => {
                    this.removeRequest(uuidRequest);
                    console.log('Llega');
                    console.log(response.headers);
                    resolver(response.body);
                    },

                    (error: HttpErrorResponse) => {
                        this.removeRequest(uuidRequest);
                        this._showError(error);
                    }
                )
        });
    }

    private pushRequest(path: string, locked: boolean) {
        if (locked === undefined) {
            locked = false;
        }
        
        const uuid = UUID.UUID();
        if (locked) {
            this.requests.push({"id": uuid, "path": path});
        }
        
        return uuid;
    }

    private removeRequest(uuid: string) {
        this.requests.splice(this.requests.findIndex(item => item.uuid === uuid), 1);
        if (this.requests.length == 0) {
            this.loading.emit(false);
            this.loadingUnsubscribe();
        }
    }

}
