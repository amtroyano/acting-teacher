import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatDialogModule,
    MatIconModule,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatToolbarModule,
    MatBadgeModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatTooltipModule,
    MAT_DATE_FORMATS,
    DateAdapter,
    MAT_DATE_LOCALE,
    MatPaginatorModule,
    MatDividerModule,
    MatRadioModule,
    MatPaginatorIntl
    
} from '@angular/material';

import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { TranslateService } from '@ngx-translate/core';
import { PaginatorI18n } from './core/paginatorI18n/paginatorI18n';

@NgModule({
    declarations: [],
    exports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
        MatSelectModule,
        MatGridListModule,
        MatCardModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatToolbarModule,
        MatBadgeModule,
        MatListModule,
        MatTabsModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatDividerModule,
        MatRadioModule
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DATE_LOCALE, useValue: navigator.language},
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true} },
        { provide: MatPaginatorIntl, deps: [TranslateService],
            useFactory: (translateService: TranslateService) => new PaginatorI18n(translateService).getTranslations() }
    ]
})
export class MaterialModule { }
