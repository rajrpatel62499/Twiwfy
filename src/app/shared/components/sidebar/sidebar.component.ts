import { ManageAccountComponent } from './../../modals/manage-account/manage-account.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../modals/login/login.component';
import { VerifyOtpComponent } from '../../modals/verify-otp/verify-otp.component';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LOCAL_STORAGE_KEYS } from 'src/app/global/constants';
import { ToastrService } from 'ngx-toastr';
// import { LoginComponent } from 'src/app/modals/login/login.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],

})
export class SidebarComponent implements OnInit, OnDestroy {

  sidebar = false;
  subscription: Subscription;
  menuState = 'out';
  isLogin;
  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {
    // this.dataService.groupChange.subscribe((data) => {

    //   if (data != null) {
    //     this.sidebar = data;

    //   }

    // });
  }

  ngOnInit() {
    this.authUpdated();

  }

  authUpdated() {
    this.subscription = this.authService.authUpdate.asObservable().subscribe(async (status) => {
      const isUserLoggedin = await this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
      if (status) {
        this.isLogin = true;
      }
      if (isUserLoggedin) {
        this.isLogin = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  sidebars() {
    this.sidebar = false;

  }


  loginDialog() {
    const dialogRef = this.dialog.open(LoginComponent).addPanelClass('login-main');
    this.sidebar = false;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  manageaccountDialog() {
    const dialogRef = this.dialog.open(ManageAccountComponent).addPanelClass('manage-accounts');
    this.sidebar = false;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    this.localStorageService.removeDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
    this.isLogin = false;
    this.toastrService.success('Logout Successfully');
  }

}
