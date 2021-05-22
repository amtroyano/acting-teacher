import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreModule } from './core/core.module';

import { HeaderComponent } from './components/header/header.component';
import { PagesModule } from './pages/pages.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VacantsComponent } from './pages/vacants/vacants.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'vacants',
        component: VacantsComponent
    },
    {
        path: 'requests',
        component: RequestsComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
  ];
  
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        HttpClientModule,
        PagesModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
        
    ],
    exports: [
        CoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
