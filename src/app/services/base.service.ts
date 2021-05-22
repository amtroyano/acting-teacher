import { HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OpenRoute } from '../core/models/openroute/openroute.model';
import { Address } from '../core/models/user/address.model';
import { User } from '../core/models/user/user.model';
import { Vacant } from '../core/models/vacant/vacant.model';
import { RestService } from '../core/services/rest.service';

@Injectable({
  providedIn: 'root'
})

export class BaseService {

  private loadedSubscription: Subscription;

  loaded: EventEmitter<any>;

  constructor(public restService: RestService) {
      this.loaded = new EventEmitter();
  }

  subscribe(callback: (result) => void) {
    this.loadedSubscription = this.loaded.subscribe(result => {
        callback(result);
    });
  }

  unsubscribe() {
      if (this.loadedSubscription !== undefined) {
          this.loadedSubscription.unsubscribe();
      }
  }

    
}
