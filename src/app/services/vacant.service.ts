import { HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { promise } from 'selenium-webdriver';
import { Message } from '../core/models/message.model';
import { Corp } from '../core/models/user/corp.model';
import { Position } from '../core/models/user/position.model';
import { JobOpening } from '../core/models/vacant/jobopening.model';
import { School } from '../core/models/vacant/school.model';
import { Vacant } from '../core/models/vacant/vacant.model';
import { Vacants } from '../core/models/vacant/vacants.model';
import { MessageService } from '../core/services/message.service';
import { RestService } from '../core/services/rest.service';

@Injectable({
  providedIn: 'root'
})

export class VacantService {

    private loaded: EventEmitter<any>;
    private loadedSubscription: Subscription;

    constructor(private restService: RestService, private messageService: MessageService) {
        this.loaded = new EventEmitter();
    }

    getSearchParams(offset: number, corp: Corp, position: Position): URLSearchParams {
        let body = new URLSearchParams();
        body.set('pos', '0');
        body.set('limit', '1000');
        body.set('offset', offset+"");
        if (position) {
            body.set('puesto', position.positionId);
        } else {
            body.set('puesto', '');
        }
        body.set('cuerpo', corp.corpId+"");
        body.set('provincia', '');
        body.set('participacion', '');
        body.set('tipo', '');

        return body;
    }

    subscribe(callback: (result: any) => void) {
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
        
        return this.searchVacants(new Array<Vacant>(), body, httpOptions)
    }

    private searchVacants(vacants: Array<Vacant>, body: URLSearchParams, options: object): Promise<Array<Vacant>> {
        return this.restService.post<Vacants>('/educacion/sipri/plazas/buscar', body.toString(), options, true)
            .then((vacantsResult: Vacants) => {
                vacantsResult.rows.forEach(vacant => {
                    //vacant.index = vacants.length + 1;
                    if (!vacant.fFinAus) {
                        vacant.fFinAus = 'Sin determinar';
                    } else {
                        let fecha = vacant.fFinAus.split('-');
                        vacant.fFinAus = fecha[2] + '-' + fecha[1] + '-' + fecha[0];
                    }
                    vacant.school = new School(vacant.centro);
                    vacant.jobOpening = new JobOpening(vacant.puesto);
                    vacants.push(vacant);
                });
                if (vacantsResult.total > vacants.length) {
                    console.info('TODO: Seguir buscando');
                    body.set('offset', vacants.length + "");
                    console.log('Comenzando recursividad ...');
                    this.searchVacants(vacants, body, options);
                    console.log('Final');

                } else {
                    this.loaded.emit(vacants);
                }

                return vacants;
            });
    }

}
