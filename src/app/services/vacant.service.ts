import { HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Corp } from '../core/models/user/corp.model';
import { Position } from '../core/models/user/position.model';
import { Vacant } from '../core/models/vacant/vacant.model';
import { Vacants } from '../core/models/vacant/vacants.model';
import { RestService } from '../core/services/rest.service';

@Injectable({
  providedIn: 'root'
})

export class VacantService {

    private loaded: EventEmitter<any>;
    private loadedSubscription: Subscription;

    constructor(private restService: RestService) {
        this.loaded = new EventEmitter();
    }

    getSearchParams(offset: number, corp: Corp, position: Position): URLSearchParams {
        let body = new URLSearchParams();
        body.set('pos', '0');
        body.set('limit', '1000');
        body.set('offset', offset+"");
        body.set('puesto', position.positionId);
        body.set('cuerpo', corp.corpId+"");
        body.set('provincia', '');
        body.set('participacion', '');
        body.set('tipo', '');
        console.log('Parametros de búsqueda: ' + body.toString());

        return body;
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

    search(body: URLSearchParams) {
        const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/x-www-form-urlencoded',
            'X-Requested-With':  'XMLHttpRequest'
        }),
        withCredentials: true,
        observe: 'response',
        responseType: 'json'
        };
        
        console.log('Iniciando petición ...');
        this.searchVacants(new Array<Vacant>(), body, httpOptions);

    }

    private searchVacants(vacants: Array<Vacant>, body: URLSearchParams, options: object): Array<Vacant>  {
        console.log('searchVacants');
        this.restService.post<Vacants>('/educacion/sipri/plazas/buscar', body.toString(), options, true)
            .then((vacantsResult: Vacants) => {
                console.log('TODO: Controlar si mostrar el botón de distancia');
                vacantsResult.rows.forEach(vacant => {
                    vacants.push(vacant);
                });
                console.log('Longitud de la respuesta: ' + vacants.length);
              if (vacantsResult.total > vacants.length) {
                console.info('TODO: Seguir buscando');
                body.set('offset', vacants.length+"");
                console.log('Comenzando recursividad ...');
                this.searchVacants(vacants, body, options);
                console.log('Final');

              } else {
                console.log('TODO: Setear las vacantes en un service data para que esté disponible en la sesión: showDistance no lo conoce');
                console.log('TODO: Subscribirse a este servicio y así tener los datos cuando finalicen');
                this.loaded.emit(vacants);
              }
            });

            return new Array<Vacant>();
    }

}
