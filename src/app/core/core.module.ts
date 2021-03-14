import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material.module';
import { NgxModule } from '../ngx.module';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorModule } from './errors/error.module';

@NgModule({
    declarations: [
        SpinnerComponent
    ],
    entryComponents: [
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        NgxModule,
        TranslateModule,
        ErrorModule
    ],
    exports: [
        SpinnerComponent,
        TranslateModule
    ],
    providers: [
    ]
})

export class CoreModule { }