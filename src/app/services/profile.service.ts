import { Injectable } from '@angular/core';
import 'moment-duration-format';
import { environment } from 'src/environments/environment';
import { Message } from '../core/models/message.model';
import { User } from '../core/models/user/user.model';
import { MessageService } from '../core/services/message.service';
import { RestService } from '../core/services/rest.service';
import { BaseService } from './base.service';
import { RouteService } from './route.service';

@Injectable({
  providedIn: 'root'
})

export class ProfileService extends BaseService {

  constructor(public restService: RestService, private routeService: RouteService, private messageService: MessageService) {
    super(restService);
  }

  profile() {
    const httpOptions = {
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    };

    this.restService.get('/educacion/sipri/procedimiento/datospersonales', httpOptions, true)
      .then((response: string) => {
        if (!this.checkProfile(response)) {
          this.messageService.showWarn(new Message('No se ha podido recuperar el perfil de ' + environment.username));
          this.loaded.emit(null);
        }
      })
      .catch((message: Message) => {
        this.messageService.showError(new Message('Error recuperando el perfil de ' + environment.username));
      });
  }

  private checkProfile(response: string) {
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(response, 'text/html');
    let scripts = parsedHtml.getElementsByTagName("script");
    let script = scripts[scripts.length - 1].innerHTML.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
    if (script.startsWith('cargaValores(')) {
      let user: User = new User(JSON.parse(scripts[scripts.length - 1].innerHTML.replace('cargaValores(', '').replace(');', '')));
      this.routeService.subscribe((result: boolean) => {
        this.loaded.emit(user);
        this.routeService.unsubscribe();
      });
      this.routeService.getAddress(user);
      return true;
    }

    return false;
  }

}
