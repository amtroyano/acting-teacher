import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user/user.model';
import { RouteService } from 'src/app/services/route.service';
import { LoginService } from 'src/app/services/login.service';
import { ColumnMode, DatatableComponent, SortType } from '@swimlane/ngx-datatable';
import { Vacant } from 'src/app/core/models/vacant/vacant.model';
import { VacantService } from 'src/app/services/vacant.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Column } from './models/column.model';
import { Position } from 'src/app/core/models/user/position.model';
import { classicNameResolver } from 'typescript';
import { State } from 'src/app/core/models/user/state.model';
import { JobOpening } from 'src/app/core/models/vacant/jobopening.model';
import { School } from 'src/app/core/models/vacant/school.model';
import { Message } from 'src/app/core/models/message.model';
import { exit } from 'process';
import { MessageService } from 'src/app/core/services/message.service';
import { BaseService } from 'src/app/services/base.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-vacants',
  templateUrl: './vacants.component.html',
  styleUrls: ['./vacants.component.scss']
})
export class VacantsComponent implements OnInit, AfterViewInit {

  @ViewChild('vacantsTable') vacantsTable: DatatableComponent;
  showMessage: boolean = false;
  clicked = false;

  showSpinner: boolean;
  isLoading: boolean;
  user: User;
  showDistance: boolean;
  showSave: boolean;
  ColumnMode = ColumnMode;
  SortType = SortType;
  columns: Array<Column>;
  states: Array<State>;
  filters: Array<any>;
  
  vacants = {
    rows: new Array<Vacant>(),
    original: new Array<Vacant>(),
    filtered: new Array<Vacant>(),
  };

  sorts: Array<Column>;

  constructor(private loginService: LoginService, private vacantService: VacantService, private routeService: RouteService, private http: HttpClient, private messageService: MessageService, private dataService: DataService) { 
    this.showDistance = false;
    this.showSave = false;
    this.showSpinner = false;
    this.isLoading = false;
    this.user = null;
    this.columns = new Array<Column>(
      new Column({"key": "school.name", "value": "Centro"}),
      new Column({"key": "provincia", "value": "Provincia"}),
      new Column({"key": "localidad", "value": "Localidad"}),
      new Column({"key": "jobOpening.desc", "value": "Puesto"}),
      new Column({"key": "participacion", "value": "Participación"}),
      new Column({"key": "fFinAus", "value": "Fecha Hasta"}),
      new Column({"key": "distancia", "value": "Distancia"}),
      new Column({"key": "tiempo", "value": "Duración"})
    );
    this.states = new Array<State>(
      new State(1, 'Almería'),
      new State(2, "Cádiz"),
      new State(3, "Córdoba"),
      new State(4, "Granada"),
      new State(5, "Huelva"),
      new State(6, "Jaén"),
      new State(7, "Málaga"),
      new State(8, "Sevilla"),
    );
    this.sorts = new Array<Column>();
    this.filters = new Array<any>();
    
    //this.onLogin();
    
/*
    let vacant = JSON.parse('{"idPlaza":84488,"idClave":1,"centro":"21700423 - I.E.S. San Antonio","provincia":"Huelva","localidad":"Bollullos Par del Condado","puesto":"00597038 - EDUCACION PRIMARIA.","fFinAus":"2021-04-09","tipo":"Sustitución","numPla":1,"participacion":"O","observaciones":null,"latitud":"37,33172677045383","longitud":"-6,538753509521484"}');
    let vacant2 = JSON.parse('{"idPlaza":84487,"idClave":2,"centro":"21700423 - I.E.S. San Antonio P","provincia":"Sevilla","localidad":"EBollullos Par del Condado","puesto":"100590017 - EDUCACION FISICA P.E.S.","fFinAus":"2021-04-19","tipo":"WSustitución","numPla":2,"participacion":"D","observaciones":null,"latitud":"37,34172677045383","longitud":"-6,638753509521484"}');
    let vacant3 = JSON.parse('{"idPlaza":84486,"idClave":2,"centro":"21700423 - I.E.S. San Antonio P","provincia":"Jaen","localidad":"EBollullos Par del Condado","puesto":"100590017 - EDUCACION FISICA P.E.S.","fFinAus":"2021-04-20","tipo":"WSustitución","numPla":2,"participacion":"D","observaciones":null,"latitud":"37,34172677045383","longitud":"-6,638753509521484"}');
    let vacant4 = JSON.parse('{"idPlaza":84485,"idClave":2,"centro":"21700423 - I.E.S. San Antonio P","provincia":"Cádiz","localidad":"EBollullos Par del Condado","puesto":"100590017 - EDUCACION FISICA P.E.S.","fFinAus":"2021-04-22","tipo":"WSustitución","numPla":2,"participacion":"D","observaciones":null,"latitud":"37,34172677045383","longitud":"-6,638753509521484"}');
    let vacant5 = JSON.parse('{"idPlaza":84484,"idClave":2,"centro":"21700423 - I.E.S. San Antonio P","provincia":"Malaga","localidad":"EBollullos Par del Condado","puesto":"100590017 - EDUCACION FISICA P.E.S.","fFinAus":"2021-04-22","tipo":"WSustitución","numPla":2,"participacion":"D","observaciones":null,"latitud":"37,34172677045383","longitud":"-6,638753509521484"}');
    vacant.jobOpening = new JobOpening("00597038 - EDUCACION PRIMARIA.");
    vacant.school = new School("21700423 - I.E.S. San Antonio");
    vacant2.jobOpening = new JobOpening("00590017 - EDUCACION FISICA P.E.S.");
    vacant2.school = new School("21700423 - I.E.S. San Antonio");
    vacant3.jobOpening = new JobOpening("00590017 - EDUCACION FISICA P.E.S.");
    vacant3.school = new School("21700423 - I.E.S. San Antonio");
    vacant4.jobOpening = new JobOpening("00590017 - EDUCACION FISICA P.E.S.");
    vacant4.school = new School("21700423 - I.E.S. San Antonio");
    vacant5.jobOpening = new JobOpening("00590017 - EDUCACION FISICA P.E.S.");
    vacant5.school = new School("21700423 - I.E.S. San Antonio");
    this.vacants.rows.push(vacant);
    this.vacants.rows.push(vacant2);
    this.vacants.rows.push(vacant3);
    this.vacants.rows.push(vacant4);
    this.vacants.rows.push(vacant5);
    this.vacants.filtered = [...this.vacants.rows];
    this.vacants.original = [...this.vacants.rows];*/
  }

  ngOnInit() {
    this.onLogin();
  }

  ngAfterViewInit(): void {
    this.vacantsTable.columnMode = ColumnMode.force;
  }

  search() {
    console.log(this.user.corps);
    if (this.user) {
      if (this.user.corps) {
        this.user.corps.forEach(corp => {
          this.isLoading = true;
          if (corp.positions && corp.positions.length > 0) {
            corp.positions.forEach(position => {
              let body = this.vacantService.getSearchParams(this.vacants.rows.length, corp, position);
              this.vacantService.search(body)
                .then((vacants: Array<Vacant>) => {
                  this.showVacants(vacants);                  
                })
                .catch((message: Message) => {
                  message.text = 'No hay vacantes para ' + position.desc;
                  this.messageService.showWarn(message);
                  this.isLoading = false;
                });
            });

          } else {
            let body = this.vacantService.getSearchParams(this.vacants.rows.length, corp, null);
            this.vacantService.search(body)
              .then((vacants: Array<Vacant>) => {
                this.showVacants(vacants);                  
              })
              .catch((message: Message) => {
                message.text = 'No hay vacantes para ' + corp.desc;
                this.messageService.showWarn(message);
                this.isLoading = false;
              });
          }
        });
      }
    }
  }

  private showVacants(vacants: Array<Vacant>) {
    vacants.forEach(vacant => {
      this.showDistance = true;
      this.showSave = true;
      this.isLoading = false;
      vacant.index = this.vacants.rows.length + 1;
      this.vacants.rows.push(vacant);
      this.vacants.original = [...this.vacants.rows];
      this.vacants.filtered = [...this.vacants.rows];
    });
  }

  route() {
    let iterations = 0;
    this.isLoading = true;
    this.routeService.unsubscribe();
    this.routeService.subscribe(result => {
      iterations++;
      this.vacants.rows = [...this.vacants.rows];
      if (iterations == (this.user.addresses.length * this.vacants.rows.length)) {
        this.isLoading = false;
      }
    });
    for (let j = 0; j < this.user.addresses.length; j++) {
      setTimeout(() => {
        for (let i = 0; i < this.vacants.rows.length; i++) {
          setTimeout(()=>{ 
            this.routeService.getRoute(this.vacants.rows[i], this.user.addresses[j]);
          }, i * environment.delay);
        }
      }, this.vacants.rows.length * j * environment.delay);
    }
  }

  private onLogin() {
    this.user = this.dataService.data;
    this.search();
  }

  onSort(event: any) {
    console.log(this.vacants);
    this.sorts = new Array<any>();
    if (event.sorts.length > 0) {
      event.sorts.forEach(sort => {
        let column = this.columns.find((column: Column) => {
          return column.key === sort['prop'];
        });
        this.sorts.push(column);
      });
      this.isLoading = true;
      this.vacants.rows.sort((a: any, b: any) => {
        return this.sort(a, b, event.sorts);
      });

    } else {
      this.vacants.rows = [...this.vacants.original];
    }
    this.isLoading = false;
    this.vacants.filtered = [...this.vacants.rows];
  }

  toggleExpandRow(row) {
    this.vacantsTable.rowDetail.toggleExpandRow(row);
  }

  onFilter(obj: any) {
    if (!obj.checked) {
      this.filters.push(obj);

    } else {
      this.filters = this.filters.filter(item => item != obj);
    }
    
    this.vacants.rows = this.vacants.filtered.filter(vacant => {
      let result = true;
      this.filters.forEach(obj => {
        if (result) {
          result = this.filter(vacant, obj);
        }
      });
      return result;
    });

    if (this.filters.length == 0) {
      this.vacants.rows = [...this.vacants.original];
    }
  }

  save() {
    console.log('save');
    /*const jsonRows = JSON.stringify(this.vacantsTable.rows);
    const nullValues = (key, value) => value === null ? '' : value;
    const header = Object.keys(this.vacantsTable.rows[0]);
    console.log(header);
    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(jsonRows));
    a.setAttribute('download', 'prueba.json');
    a.click();*/

    /*let items = new Array<any>();
    this.http.get("file://assets/prueba.json")
      .subscribe((data: string) => {
        console.log(data);
      });*/
  }

  private filter(vacant: Vacant, obj: any): boolean {
    if (obj instanceof State) {
      return vacant.provincia.localeCompare(obj.desc, undefined, {sensitivity: 'base'}) === 0 ? false : true;

    } else if (obj instanceof Position) {
      console.log(vacant.jobOpening.positionId);
      console.log(obj.positionId);
      return vacant.jobOpening.positionId !== obj.positionId;
    }
    
    return true;
  }

  private sort(a: any, b: any, sorts: []) {
    let ordered = [];
    sorts.forEach((sort: {}) => {
      if (!a[sort['prop']]) {
        a[sort['prop']] = '';
      }
      if (!b[sort['prop']]) {
        b[sort['prop']] = '';
      }
      switch (sort['prop']) {
        case this.columns[6].key:
          ordered.push(this.sortByDistancia(a, b, sort));
          break;
        case this.columns[7].key:
          ordered.push(this.sortByTiempo(a, b, sort));
          break;
        case this.columns[5].key:
          ordered.push(this.sortByFecha(a, b, sort));
          break;
        case this.columns[0].key:
          ordered.push(this.sortByNestedObject(a, b, sort));
          break;
        case this.columns[3].key:
          ordered.push(this.sortByNestedObject(a, b, sort));
          break;
        default:
          ordered.push((a[sort['prop']].localeCompare(b[sort['prop']])) * (sort['dir'] === 'asc' ? 1 : -1));
          break;
      }
    });

    return ordered.reduce((a, b) => a || b);
  }

  onDetailToggle(event, row) {
    console.log(event);
    console.log(row);
  }

  onColumnResize(event) {
    console.log(event);
  }

  private sortByDistancia(a: any, b: any, sort: object): Number {
    a = parseFloat(a[sort['prop']].replace(' kms', ''));
    b = parseFloat(b[sort['prop']].replace(' kms', ''));

    return (a > b ? 1 : a === b ? 0 : -1) * (sort['dir'] === 'asc' ? 1 : -1);
  }

  private sortByTiempo(a: any, b: any, sort: object): Number {
    a = a[sort['prop']].replace(' horas', '').replace(' minutos', '').split(':');
    b = b[sort['prop']].replace(' horas', '').replace(' minutos', '').split(':');
    a = a.length > 1 ? parseInt(a[0]) * 60 + parseInt(a[1]) : parseInt(a[0]);
    b = b.length > 1 ? parseInt(b[0]) * 60 + parseInt(b[1]) : parseInt(b[0]);

    return (a > b ? 1 : a === b ? 0 : -1) * (sort['dir'] === 'asc' ? 1 : -1);
  }

  private sortByFecha(a: any, b: any, sort: object): Number {
    a = a[sort['prop']].replace('Sin determinar', '').split('-');
    b = b[sort['prop']].replace('Sin determinar', '').split('-');
    if (a != '') {
      a = new Date(a[2], a[1], a[0]).getTime();
    } else {
      a = 0;
    }
    if (b != '') {
      b = new Date(b[2], b[1], b[0]).getTime();
    } else {
      b = 0;
    }
    return (a < b ? 1 : a === b ? 0 : -1) * (sort['dir'] === 'asc' ? 1 : -1);
  }

  private sortByNestedObject(a: any, b: any, sort: {}): Number {
    const properties = sort['prop'].split('.');
    a = a[properties[0]][properties[1]];
    b = b[properties[0]][properties[1]];

    return a.localeCompare(b) * (sort['dir'] === 'asc' ? 1 : -1);
  }
}
