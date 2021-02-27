import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Vacants } from 'src/app/core/models/vacant/vacants.model';
import { User } from 'src/app/core/models/user/user.model';
import { OpenRoute } from 'src/app/core/models/openroute/openroute.model';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import 'moment-duration-format';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showSpinner: boolean;
  user: User;

  constructor(private restService: RestService, private http: HttpClient) { 
  }

  ngOnInit() {
    this.login();
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
        console.log('La respuesta siempre es un 200, habría que averiguar como detectar error.');
        let parser = new DOMParser();
        let parsedHtml = parser.parseFromString(response, 'text/html');
        console.log(parsedHtml);
        console.log('llega');
        this.profile();
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
        console.log('La respuesta siempre es un 200, habría que averiguar como parsear el contenido.');
        let parser = new DOMParser();
        let parsedHtml = parser.parseFromString(response, 'text/html');
        let scripts = parsedHtml.getElementsByTagName("script");
        console.log(JSON.parse(scripts[scripts.length - 1].innerHTML.replace('cargaValores(', '').replace(');', '')));
        this.user = new User(JSON.parse(scripts[scripts.length - 1].innerHTML.replace('cargaValores(', '').replace(');', '')));
        console.log(this.user);
        this.address();
    });
        
  }

  search() {
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
      responseType: 'json'
    };
    let body = new URLSearchParams();
    body.set('pos', '0');
    body.set('limit', '10');
    body.set('offset', '0');
    body.set('puesto', '');
    body.set('cuerpo', '');
    body.set('provincia', '');
    body.set('participacion', '');
    body.set('tipo', '');

    this.restService.post<Vacants>('/educacion/sipri/plazas/buscar', body.toString(), httpOptions, true)
      .then((vacants: Vacants) => {
        console.log(vacants.rows);
        console.log(vacants.rows[0]);
      });

  }

  route() {
    this.restService.loadingSubscribe(result => {
      this.showSpinner = result;
    });

    this.user.addresses.forEach(address => {
      let parameters = new HttpParams()
          .append('api_key', environment.apiKey)
          .append('start', address.longitude.toString() + "," + address.latitude.toString())
          .append('end', "-6.077758766" + "," + "37.387447518");
      
      const httpOptions = {
        observe: 'response',
        responseType: 'json',
        params: parameters
      };
      this.restService.get('/v2/directions/driving-car', httpOptions, true)
        .then((openRoute: OpenRoute) => {
          let distance = openRoute.features[0].properties.summary.distance / 1000;
          let duration = openRoute.features[0].properties.summary.duration;
          console.log(moment.duration(duration, "seconds").format("h:mm") + " horas");
          console.log(distance + " kms");
          console.log(duration + " horas");
        });
    });
  }

  address() {
    this.restService.loadingSubscribe(result => {
      this.showSpinner = result;
    });

    this.user.addresses.forEach(address => {
      let parameters = new HttpParams()
        .append('api_key', environment.apiKey)
        .append('address', address.address)
        .append('postalcode', address.postalCode)
        .append('locality', 'Bailen');

      const httpOptions = {
        observe: 'response',
        responseType: 'json',
        params: parameters
      };
    
      this.restService.get('/geocode/search/structured', httpOptions, true)
        .then((openroute: OpenRoute) => {
          console.log(openroute);
          console.log(openroute.features[0].geometry.coordinates);
          this.user.addresses[0].longitude = openroute.features[0].geometry.coordinates[0];
          this.user.addresses[0].latitude = openroute.features[0].geometry.coordinates[1];
          console.log(this.user);
        });
    });
  }

}
