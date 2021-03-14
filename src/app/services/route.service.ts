import { HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';
import { environment } from 'src/environments/environment';
import { OpenRoute } from '../core/models/openroute/openroute.model';
import { Address } from '../core/models/user/address.model';
import { User } from '../core/models/user/user.model';
import { Vacant } from '../core/models/vacant/vacant.model';
import { RestService } from '../core/services/rest.service';

@Injectable({
  providedIn: 'root'
})

export class RouteService {

    private loaded: EventEmitter<any>;

    constructor(private restService: RestService) {
        this.loaded = new EventEmitter();
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
                console.log(openroute);
                if (openroute.features.length > 0) {
                  user.addresses[0].longitude = openroute.features[0].geometry.coordinates[0];
                  user.addresses[0].latitude = openroute.features[0].geometry.coordinates[1];
                  console.log(user);
                } else {
                  console.log('Localización del perfil no hallada.')
                }
              });
          });
    }

    getRoute(vacant: Vacant, address: Address) {
        console.log(vacant);
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
            let distance = openRoute.features[0].properties.summary.distance / 1000;
            let duration = openRoute.features[0].properties.summary.duration;
            vacant.tiempo = moment.duration(duration, "seconds").format("h:mm") + " horas";
            vacant.distancia = distance + " kms";
            console.log(vacant);
        });
    }
}
