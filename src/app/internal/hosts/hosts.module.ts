import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { HostsComponent } from './hosts.component';
import { SharedModule } from './../../shared/shared.module';

const routes: Routes = [{
  path: 'host', component: HostsComponent,
  children: []
}];

@NgModule({
  declarations: [
    HostsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharedModule,
    HttpClientModule,
  ],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, } }],
})
export class HostsModule { }
