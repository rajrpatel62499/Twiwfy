import { AuthGuard } from './services/guards/auth.guard';
import { HomeLayoutComponent } from './shared/Layout/home-layout/home-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { Error404Component } from './shared/components/error404/error404.component';
import { SeeAllComponent } from './shared/components/see-all/see-all.component';
import { ViewExperienceComponent } from './shared/components/view-experience/view-experience.component';
import { ManageExperienceComponent } from './shared/components/manage-experience/manage-experience.component';
import { ConfirmAndPayComponent } from './shared/components/confirm-and-pay/confirm-and-pay.component';
import { WhatWouldLikeChangeComponent } from './shared/components/what-would-like-change/what-would-like-change.component';
import { ChangeDateOrTimeComponent } from './shared/components/change-date-or-time/change-date-or-time.component';
import { SavedComponent } from './shared/components/saved/saved.component';
import { NotificationKind } from 'rxjs';
import { NotificationsComponent } from './shared/components/notifications/notifications.component';
import { AccountComponent } from './shared/components/account/account.component';
import { PersonalInfoComponent } from './shared/components/account/personal-info/personal-info.component';
import { LoginSecurityComponent } from './shared/components/account/login-security/login-security.component';
import { PaymentsAndPayoutsComponent } from './shared/components/account/payments-and-payouts/payments-and-payouts.component';
import { NotificationsSettingsComponent } from './shared/components/account/notifications-settings/notifications-settings.component';
import { PrivacySharingComponent } from './shared/components/account/privacy-sharing/privacy-sharing.component';
import { GlobalPreferencesComponent } from './shared/components/account/global-preferences/global-preferences.component';
import { InviteFriendsComponent } from './shared/components/account/invite-friends/invite-friends.component';
import { ManageExperienceDashboardComponent } from './shared/components/manage-experience-dashboard/manage-experience-dashboard.component';
import { ManageCalendarComponent } from './shared/components/manage-calendar/manage-calendar.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeLayoutComponent,
      children: [
        { path: 'home', component: HomeComponent}, 
        { path: 'notfound', component: Error404Component,data: { title: 'Error' }},
        { path: 'seeall', component: SeeAllComponent,data: { title: 'See All' }},
        { path: 'confirm-and-pay', component:ConfirmAndPayComponent  ,data: { title: 'Confirm And Pay' }},
        { path: 'what-would-you-like-to-change', component:WhatWouldLikeChangeComponent  ,data: { title: 'What would you like to change?' }},
        { path: 'change-date-or-time', component:ChangeDateOrTimeComponent  ,data: { title: 'Change Date Or Time' }},
        { path: 'saved', component:SavedComponent  ,data: { title: 'Saved' }},
        { path: 'notifications', component:NotificationsComponent  ,data: { title: 'Notifications' }},
        
        { path: 'account',
          children:[
            { path: '', component: AccountComponent  ,data: { title: 'Account' }},
            { path: 'personal-info', component: PersonalInfoComponent  ,data: { title: 'Personal Info' }},
            { path: 'login-security', component:LoginSecurityComponent  ,data: { title: 'Login & Security' }},
            { path: 'payments-and-payouts', component:PaymentsAndPayoutsComponent  ,data: { title: 'Payment & Payouts' }},
            { path: 'notification-settings', component:NotificationsSettingsComponent  ,data: { title: 'Notification Settings' }},
            { path: 'privacy-and-sharing', component:PrivacySharingComponent  ,data: { title: 'Privacy & Sharing' }},
            { path: 'global-preferences', component:GlobalPreferencesComponent  ,data: { title: 'Global Preferences' }},
            { path: 'invite-friends', component:InviteFriendsComponent  ,data: { title: 'Invite Friends' }},
          ]
        },
        
        { path: 'manage-experience-dashboard', component:ManageExperienceDashboardComponent  ,data: { title: 'Manage Experience Dashboard' }},
        { path: 'manage-calendar', component:ManageCalendarComponent  ,data: { title: 'Manage Calendar' }},

        { path: 'manage-experience', component:ManageExperienceComponent  ,data: { title: 'Manage Experience' }, canActivate: [AuthGuard]},
        { path: 'viewexperience/:expId', component:ViewExperienceComponent  ,data: { title: 'View Experience' }},

      ]
  },
  { path: 'host', loadChildren: () => import('./internal/hosts/hosts.module').then(m => m.HostsModule) },
  { path: 'user', loadChildren: () => import('./internal/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] }
];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
