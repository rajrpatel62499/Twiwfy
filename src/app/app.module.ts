import { AuthGuard } from './services/guards/auth.guard';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { HostsModule } from './internal/hosts/hosts.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { TitleCasePipe } from '@angular/common';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'yellow',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 50,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.foldingCube, // foreground spinner type
  fgsColor: '#001534',
  pbColor: '#001534',
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 6, // progress bar thickness
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HostsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCh-XrnSzsvWbMGIU4yrurvxKjRjad8fBA',
      libraries: ['places']
    }),
    ModalModule.forRoot(),
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({
      preventDuplicates:true
    }),
    AppRoutingModule,
  ],
  providers: [
    TitleCasePipe,
    AuthGuard,
    { provide: BsDropdownConfig, useValue: { isAnimated: true, } }],
  bootstrap: [AppComponent],
})
export class AppModule { }
