import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  cookiesAccepted: boolean;

  constructor(private translate: TranslateService) {
    this.cookiesAccepted = false;

    translate.setDefaultLang('es');
    
    const browserLang = translate.getBrowserLang();

    translate.use(browserLang)
  }

  ngOnInit() {
  }
}
