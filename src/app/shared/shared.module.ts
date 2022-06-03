
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { Error404Component } from './components/error404/error404.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './modals/login/login.component';
import { ManageAccountComponent } from './modals/manage-account/manage-account.component';
import { NgxSlickJsModule } from 'ngx-slickjs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';

import { NgOtpInputModule } from 'ng-otp-input';
import { DirectiveModule } from './directives/directive.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeLayoutComponent } from './Layout/home-layout/home-layout.component';
import { SeeAllComponent } from './components/see-all/see-all.component';
import { LanguageModalComponent } from './modals/language-modal/language-modal.component';
import { VerifyOtpComponent } from './modals/verify-otp/verify-otp.component';
import { ViewExperienceComponent } from './components/view-experience/view-experience.component';
import { ManageExperienceComponent } from './components/manage-experience/manage-experience.component';
import { ShowMoreDatesComponent } from './modals/show-more-dates/show-more-dates.component';
import { ConfirmAndPayComponent } from './components/confirm-and-pay/confirm-and-pay.component';
import { WhatWouldLikeChangeComponent } from './components/what-would-like-change/what-would-like-change.component';
import { ChangeDateOrTimeComponent } from './components/change-date-or-time/change-date-or-time.component';
import { SavedComponent } from './components/saved/saved.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AccountComponent } from './components/account/account.component';
import { PersonalInfoComponent } from './components/account/personal-info/personal-info.component';
import { LoginSecurityComponent } from './components/account/login-security/login-security.component';
import { PaymentsAndPayoutsComponent } from './components/account/payments-and-payouts/payments-and-payouts.component';
import { NotificationsSettingsComponent } from './components/account/notifications-settings/notifications-settings.component';
import { PrivacySharingComponent } from './components/account/privacy-sharing/privacy-sharing.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { GlobalPreferencesComponent } from './components/account/global-preferences/global-preferences.component';
import { InviteFriendsComponent } from './components/account/invite-friends/invite-friends.component';
import { ManageExperienceDashboardComponent } from './components/manage-experience-dashboard/manage-experience-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ManageCalendarComponent } from './components/manage-calendar/manage-calendar.component';
import { AvatarModule } from 'ngx-avatar';



const importExportComponentList = [
    ValidationMessageComponent,
    Error404Component,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SeeAllComponent
]
const modalsEntryList = [
    LoginComponent,
    ManageAccountComponent,
    VerifyOtpComponent,
    LanguageModalComponent,
    ShowMoreDatesComponent
];
const LayoutList = [
    HomeLayoutComponent
]

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}
  

@NgModule({
    declarations: [
        ...importExportComponentList,
        ...modalsEntryList,
        ...LayoutList,
        ViewExperienceComponent,
        ManageExperienceComponent,
        ConfirmAndPayComponent,
        WhatWouldLikeChangeComponent,
        ChangeDateOrTimeComponent,
        SavedComponent,
        NotificationsComponent,
        AccountComponent,
        PersonalInfoComponent,
        LoginSecurityComponent,
        PaymentsAndPayoutsComponent,
        NotificationsSettingsComponent,
        PrivacySharingComponent,
        GlobalPreferencesComponent,
        InviteFriendsComponent,
        ManageExperienceDashboardComponent,
        ManageCalendarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        DirectiveModule,
        NgOtpInputModule,
        ChartsModule,
        NgxSkeletonLoaderModule.forRoot(),
        NgxSlickJsModule.forRoot({
            links: {
              jquery: 'https://code.jquery.com/jquery-3.4.0.min.js',
              slickJs: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
              slickCss: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
              slickThemeCss: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css'
            },
          }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        AvatarModule

],
    exports: [
        MaterialModule,
        NgxSlickJsModule,
        NgxSkeletonLoaderModule,
        BsDropdownModule,
        BsDatepickerModule,
        ChartsModule,
        DirectiveModule,
        AvatarModule,
        ...importExportComponentList,
        ...modalsEntryList,
        ...LayoutList,

    ],
    
})
export class SharedModule { }
