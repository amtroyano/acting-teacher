import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';
import { throwError, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OpenRoute } from '../core/models/openroute/openroute.model';
import { Address } from '../core/models/user/address.model';
import { User } from '../core/models/user/user.model';
import { Vacant } from '../core/models/vacant/vacant.model';
import { RestService } from '../core/services/rest.service';
import { BaseService } from './base.service';
import { MessageService } from '../core/services/message.service';
import { ProfileService } from './profile.service';
import { Message } from '../core/models/message.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService extends BaseService {

  constructor(public restService: RestService, private profileService: ProfileService, private messageService: MessageService) {
    super(restService);
  }

  login() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'X-Requested-With':  'XMLHttpRequest'
      }),
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    };

    let payload = new URLSearchParams();
    payload.set('usuario', environment.username);
    payload.set('password', environment.password);
    this.restService.post('/educacion/sipri/acceso/idea', payload.toString(), httpOptions, true)
      .then((response: string) => {
        if (this.checkLogin(response)) {
          this.profileService.subscribe((user: User) => {
            this.loaded.emit(user);
            this.profileService.unsubscribe();
          });
          this.profileService.profile();

        } else {
          this.messageService.showWarn(new Message('Usuario ' + environment.username + ' no identificado'));
          this.loaded.emit(null);
        }
    })
    .catch((message: Message) => {
      message.error = 'No se ha podido iniciar sesisón con el usuario ' + environment.username;
      this.messageService.showError(message);
    });
  }

  private checkLogin(response: string) {
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(response, 'text/html');
    if (parsedHtml.forms[0]) {
      return false;
    }

    return true;
  }

}
