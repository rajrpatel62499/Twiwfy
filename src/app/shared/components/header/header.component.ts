import { AppRoutes } from './../../../global/constants';
import { AuthGuard } from './../../../services/guards/auth.guard';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth/auth.service';
// import { LanguageModalComponent } from 'src/app/modals/language-modal/language-modal.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LOCAL_STORAGE_KEYS } from '../../../global/constants';
import { LanguageModalComponent } from '../../modals/language-modal/language-modal.component';
import { LoginComponent } from '../../modals/login/login.component';

declare var $: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sidebar = false;
  isLogin: boolean = false;
  subscription: Subscription;

  AppRoutes = AppRoutes;
  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private authGuard: AuthGuard

  ) { }

  ngOnInit(): void {

    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $('.header-main').addClass('newClass');
      } else {
        $('.header-main').removeClass('newClass');
      }
    });
    this.subscription = this.authService.authUpdate.asObservable().subscribe(async (status) => {
      console.log(status);
      if (status) {
        this.isLogin = true;
      }
    });
    this.authUpdated();
  }


  async authUpdated() {    
    const isUserLoggedin = await this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
    if (isUserLoggedin) {
      this.isLogin = true;
    }
  }

  // --------language-dialog-------------//
  openDialog() {
    const dialogRef = this.dialog.open(LanguageModalComponent).addPanelClass('language-main');

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // openSidemenu(){
  //   this.sidebar = !this.sidebar;
  //   this.dataService.groupUpdateData(this.sidebar);
  // }

  onBecomeHost() {
    if (this.isLogin) {
      console.log("BECOME A HOST CLICK");
    } else {
      this.loginDialog('Signup', AppRoutes.CREATE_EXPERIENCE );
    }
  }


  loginDialog(type, redirectTo = AppRoutes.PERSONAL_INFO) {    
    const dialogRef = this.dialog.open(LoginComponent, { data: { type, redirectTo} }).addPanelClass('login-main');
    this.sidebar = false;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.authUpdated();
    });    
  }


  async logout() {
    await this.localStorageService.removeDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
    this.isLogin = false;
    this.authGuard.canActivate();
  }

  closeDropDown(){
    let elem = document.getElementById('button-basic');
    elem.click();
  }



}
