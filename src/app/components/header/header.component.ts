import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/core/models/user/user.model';
import { DataService } from 'src/app/core/services/data.service';
import { RestService } from 'src/app/core/services/rest.service';
import { LoginService } from 'src/app/services/login.service';
import { RouteService } from 'src/app/services/route.service';
import { environment } from 'src/environments/environment';
import { version } from '../../../../package.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;
  selectedOption: string;
  version: string;
  showSpinner: boolean;
  user: User;
  wellcome: string;

  constructor(private router: Router, private loginService: LoginService, private routeService: RouteService, private translateService: TranslateService, private dataService: DataService) {
    this.version = version;
    this.isLogin = false;
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.selectedOption = this.router.url.replace('/', '');
        }
      }
    );
   }

  ngOnInit() {
    this.initWelcome();
    this.login();
  }

  initWelcome() {
    this.wellcome = 'No conectado.';
  }

  changeSelectedOption(option: string) {
    if (option !== 'logout') {
      this.selectedOption = option;
    }
  }

  hoverIn(event: Event) {
    event.preventDefault();
    let container = event.currentTarget as HTMLElement;
    if (this.isLogin || !(["profile", "logout"].indexOf(container.id) != -1)) {
      container.classList.add('hover');
    }
  }
  
  hoverOut(event: Event) {
    event.preventDefault();
    let container = event.currentTarget as HTMLElement;
    if (this.isLogin || !(["profile", "logout"].indexOf(container.id) != -1)) {
      container.classList.remove('hover');
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.isLogin = false;
    this.user = null;
    this.initWelcome();
    this.dataService.data = null;
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/vacants']));
  }

  login() {
    this.loginService.subscribe((user: User) => {
      if (user) {
        this.isLogin = true;
        this.wellcome = 'Bienvenid@ ' + user.firstName + " " + user.lastName + ', ' + user.name;
      }
      this.showSpinner = false;
      this.loginService.unsubscribe();
      this.dataService.data = user;
      this.router.navigateByUrl('/', {skipLocationChange: true})
        .then(() => this.router.navigate(['/vacants']));
    });
    this.showSpinner = true;
    this.loginService.login();
  }
}
