import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from 'src/app/core/models/user/user.model';
import { environment } from '../../../environments/environment';
import { Vacant } from 'src/app/core/models/vacant/vacant.model';
import { Address } from 'src/app/core/models/user/address.model';
import { Corp } from 'src/app/core/models/user/corp.model';
import { Position } from 'src/app/core/models/user/position.model';
import { VacantService } from 'src/app/services/vacant.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showSpinner: boolean;
  user: User;
  showDistance: boolean;
  vacants: Array<Vacant>;
  displayedColumns: string[];

  //{"idPlaza":84488,"idClave":1,"centro":"21700423 - I.E.S. San Antonio","provincia":"Huelva","localidad":"Bollullos Par del Condado","puesto":"00590017 - EDUCACION FISICA P.E.S.","fFinAus":"2021-04-09","tipo":"Sustitución","numPla":1,"participacion":"O","observaciones":null,"latitud":"37,33172677045383","longitud":"-6,538753509521484"}

  constructor(private restService: RestService, private vacantService: VacantService, private routeService: RouteService) { 
    this.showDistance = false;
    this.vacants = new Array<Vacant>();
    this.displayedColumns = ['idPlaza'];
  }

  ngOnInit() {
    this.login();
    this.showDistance = false;
  }

  login() {
    this.restService.loadingSubscribe(result => {
      this.showSpinner = result;
    });

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
          console.info('Identificación de usuario correcta con SIPRI.');
          this.profile();
        } else {
          console.log('Error de login: mostrar error');
        }
    });
  }

  profile() {
    this.restService.loadingSubscribe(result => {
      this.showSpinner = result;
    });

    const httpOptions = {
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    };

    this.restService.get('/educacion/sipri/procedimiento/datospersonales', httpOptions, true)
      .then((response: string) => {
        if (this.checkProfile(response)) {
          console.log('Perfil de usuario recuperado correctamente de SIPRI.');
        } else {
          console.log('Error de perfil: mostrar error');
        }
    });
  }

  search() {
    this.restService.loadingSubscribe(result => {
      this.showSpinner = result;
    });
    this.vacantService.subscribe((vacants: Array<Vacant>) => {
      console.log('Respuesta recibida ...');
      vacants.forEach(vacant => {
        this.vacants.push(vacant);
        this.showDistance = true;
      });
      console.log(this.vacants);
      console.log('Comprobar si ha finalizado todas las peticiones para unsubscribirse y mostrar boton... ')
    });
    if (this.user.corps) {
      this.user.corps.forEach(corp => {
        if (corp.positions) {
          corp.positions.forEach(position => {
            console.log('TODO: Buscar vacantes por ' + corp.desc + (position ? ' y ' + position.desc : ''));
            let body = this.vacantService.getSearchParams(this.vacants.length, corp, position);
            console.log('Iniciando peticion de vacantes ...');
            this.vacantService.search(body);

          });

        } else {
          console.log('TODO: Buscar vacantes por ' + corp.desc);
          let body = this.vacantService.getSearchParams(this.vacants.length, corp, null);
          this.vacantService.search(body)
        }
      });
    }
  }

  route() {
    this.restService.loadingSubscribe(result => {
      this.showSpinner = result;
    });

    this.vacants.forEach(vacant => {
      this.user.addresses.forEach(address => {
        console.log(vacant);
        this.routeService.getRoute(vacant, address);
      });
    });
  }

  address() {
    this.restService.loadingSubscribe(result => {
      this.showSpinner = result;
    });

    this.routeService.getAddress(this.user);
  }

  private checkLogin(response: string) {
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(response, 'text/html');
    if (parsedHtml.forms[0]) {
      return false;
    }

    return true;
  }

  private checkProfile(response: string) {
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(response, 'text/html');
    let scripts = parsedHtml.getElementsByTagName("script");
    let script = scripts[scripts.length - 1].innerHTML.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
    if (script.startsWith('cargaValores(')) {
      this.user = new User(JSON.parse(scripts[scripts.length - 1].innerHTML.replace('cargaValores(', '').replace(');', '')));
      this.address();
      return true;
    }

    return false;
  }
}
