import { Router } from '@angular/router';
import { LocalStorageService } from './../local-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AUTH_ROUTES, LOCAL_STORAGE_KEYS } from 'src/app/global/constants';
import { ApiService } from '../api.service';
@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    constructor(
        private apiService: ApiService,
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    public authUpdate = new BehaviorSubject(false);

    async login(data) {
        return this.apiService.post(`${AUTH_ROUTES.LOGIN}`, data, false);
    }

    async register(data) {
        return this.apiService.post(`${AUTH_ROUTES.REGISTER}`, data, false);
    }

    async verifyOtp(data) {
        return this.apiService.post(`${AUTH_ROUTES.VERIFY_OTP}`, data, false);
    }

    async requestOtpLogin(data) {
        return this.apiService.post(`${AUTH_ROUTES.REQUEST_OTP_LOGIN}`, data, false);
    }

    async requestOtpRegister(data) {        
        return this.apiService.post(`${AUTH_ROUTES.REQUEST_OTP_REGISTER}`, data, false);
    }

    async isLoggedIn(): Promise<boolean> {
        const isUserLoggedin = await this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
        
        if (isUserLoggedin) {
            return true;
        } else {
            return false;
        }
    }

    logout() {
        this.localStorageService.removeDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
        // this.authUpdate.next(false);
        this.router.navigate(['/home']);
    }
}
