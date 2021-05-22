import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacantsComponent } from './vacants/vacants.component';
import { RequestsComponent } from './requests/requests.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    VacantsComponent,
    RequestsComponent,
    ProfileComponent
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  exports: [
  ],
  providers: [
  ]
})
export class PagesModule { }
