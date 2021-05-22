import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';
import { environment } from 'src/environments/environment';
import { Message } from '../core/models/message.model';
import { OpenRoute } from '../core/models/openroute/openroute.model';
import { Address } from '../core/models/user/address.model';
import { User } from '../core/models/user/user.model';
import { Vacant } from '../core/models/vacant/vacant.model';
import { MessageService } from '../core/services/message.service';
import { RestService } from '../core/services/rest.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class RouteService extends BaseService {

  constructor(restService: RestService, private messageService: MessageService) {
    super(restService);
  }

  getAddress(user: User) {
      user.addresses.forEach(address => {
          let parameters = new HttpParams()
            .append('api_key', environment.apiKey)
            .append('address', address.address)
            .append('postalcode', address.postalCode)
            .append('locality', address.city);
    
          const httpOptions = {
            observe: 'response',
            responseType: 'json',
            params: parameters
          };
        
          this.restService.get('/geocode/search/structured', httpOptions, true)
            .then((openroute: OpenRoute) => {
              if (openroute.features.length > 0) {
                user.addresses[0].longitude = openroute.features[0].geometry.coordinates[0];
                user.addresses[0].latitude = openroute.features[0].geometry.coordinates[1];
                this.loaded.emit(true);
              } else {
                this.messageService.showWarn(new Message('TODO: Localización del perfil no hallada.'));
                this.loaded.emit(false);
              }
            })
            .catch((message: Message) => {
              message.error = 'No se ha podido recuperar la localización del usuario ' + environment.username;
              this.messageService.showError(message);
            });
        });
  }

  getRoute(vacant: Vacant, address: Address) {
      let parameters = new HttpParams()
            .append('api_key', environment.apiKey)
            .append('start', address.longitude.toString() + "," + address.latitude.toString())
            .append('end', vacant.longitud.toString().replace(',', '.') + "," + vacant.latitud.toString().replace(',', '.'));
          
      const httpOptions = {
        observe: 'response',
        responseType: 'json',
        params: parameters
      };
      
      this.restService.get('/v2/directions/driving-car', httpOptions, true)
          .then((openRoute: OpenRoute) => {
          if (openRoute.features.length > 0) {
            vacant.school.address = openRoute.features[0].properties.segments[0].steps[openRoute.features[0].properties.segments[0].steps.length - 2].name;
            vacant.distancia = (openRoute.features[0].properties.summary.distance / 1000).toFixed(2) + ' kms';
            if (openRoute.features[0].properties.summary.duration > 3600) {
              vacant.tiempo = moment.duration(openRoute.features[0].properties.summary.duration, "seconds").format("h:mm") + " horas";

            } else {
              vacant.tiempo = moment.duration(openRoute.features[0].properties.summary.duration, "seconds").format("mm") + " minutos";
            }
            this.loaded.emit(true);
            
          } else {
            this.loaded.emit(false);
          }
      });
  }
}
