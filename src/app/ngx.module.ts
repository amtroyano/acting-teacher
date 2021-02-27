import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
    declarations: [],
    imports: [
        NgxLoadingModule.forRoot({
            backdropBackgroundColour: 'rgba(255,255,255,0.8)',
            backdropBorderRadius: '0',
            primaryColour: '#999',
            secondaryColour: '#999',
            tertiaryColour: '#999'
        })
  ],
    exports: [
        CommonModule,
        NgxLoadingModule,
    ],
    providers: [
    ]
})
export class NgxModule { }
